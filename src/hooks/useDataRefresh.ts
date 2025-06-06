
import { useEffect, useRef, useCallback } from "react";
import { DataSyncService } from "@/services/DataSyncService";
import { useDataContext } from "@/contexts/DataContext";

export const useDataRefresh = (
  refreshFunction: () => void | Promise<void>,
  intervalMs: number = 5 * 60 * 1000,
  dependencies: any[] = [],
  tableName?: string,
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(true);
  const lastRefreshRef = useRef<Date | null>(null);
  const refreshFunctionRef = useRef(refreshFunction);
  const { connectionHealth, forceSync } = useDataContext();

  useEffect(() => {
    refreshFunctionRef.current = refreshFunction;
  }, [refreshFunction]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const enhancedRefreshFunction = async () => {
      if (!isActiveRef.current) return;

      const maxRetries = 3;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          await refreshFunctionRef.current();
          lastRefreshRef.current = new Date();
          console.log(
            `Data refresh successful for ${tableName || "component"}`,
          );
          break;
        } catch (error) {
          retryCount++;
          console.error(
            `Error during data refresh (attempt ${retryCount}/${maxRetries}):`,
            error,
          );

          if (retryCount < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, retryCount - 1)),
            );
          } else {
            console.error(
              `Max retry attempts reached for ${tableName || "component"} refresh`,
            );
          }
        }
      }
    };

    intervalRef.current = setInterval(async () => {
      if (isActiveRef.current && connectionHealth) {
        await enhancedRefreshFunction();
      } else if (!connectionHealth) {
        console.warn("Skipping refresh due to connection health issues");
      }
    }, intervalMs);

    const handleDataChange = () => {
      console.log(
        `Real-time data change detected for ${tableName || "component"}`,
      );
      enhancedRefreshFunction();
    };

    const handleForceRefresh = () => {
      console.log(`Force refresh triggered for ${tableName || "component"}`);
      enhancedRefreshFunction();
    };

    const handleAdminAction = () => {
      console.log(
        `Admin action detected, refreshing ${tableName || "component"}`,
      );
      enhancedRefreshFunction();
    };

    if (tableName) {
      DataSyncService.subscribe(`${tableName}Changed`, handleDataChange);
      window.addEventListener(`${tableName}Changed`, handleDataChange);
    }

    DataSyncService.subscribe("dataChanged", handleDataChange);
    DataSyncService.subscribe("forceRefresh", handleForceRefresh);
    DataSyncService.subscribe("adminActionCompleted", handleAdminAction);

    window.addEventListener("dataChanged", handleDataChange);
    window.addEventListener("forceRefresh", handleForceRefresh);
    window.addEventListener("adminActionCompleted", handleAdminAction);
    window.addEventListener("dataRefresh", handleDataChange);

    enhancedRefreshFunction();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (tableName) {
        DataSyncService.unsubscribe(`${tableName}Changed`, handleDataChange);
        window.removeEventListener(`${tableName}Changed`, handleDataChange);
      }

      DataSyncService.unsubscribe("dataChanged", handleDataChange);
      DataSyncService.unsubscribe("forceRefresh", handleForceRefresh);
      DataSyncService.unsubscribe("adminActionCompleted", handleAdminAction);

      window.removeEventListener("dataChanged", handleDataChange);
      window.removeEventListener("forceRefresh", handleForceRefresh);
      window.removeEventListener("adminActionCompleted", handleAdminAction);
      window.removeEventListener("dataRefresh", handleDataChange);
    };
  }, [tableName, connectionHealth, intervalMs]);

  const pauseRefresh = useCallback(() => {
    isActiveRef.current = false;
    console.log(`Paused refresh for ${tableName || "component"}`);
  }, [tableName]);

  const resumeRefresh = useCallback(() => {
    isActiveRef.current = true;
    console.log(`Resumed refresh for ${tableName || "component"}`);
  }, [tableName]);

  const manualRefresh = useCallback(async () => {
    console.log(`Manual refresh triggered for ${tableName || "component"}`);
    if (refreshFunctionRef.current) {
      await refreshFunctionRef.current();
    }
  }, [tableName]);

  const forceSyncData = useCallback(async () => {
    console.log(`Force sync triggered for ${tableName || "component"}`);
    if (forceSync) {
      await forceSync();
    }
    if (refreshFunctionRef.current) {
      await refreshFunctionRef.current();
    }
  }, [forceSync, tableName]);

  return {
    pauseRefresh,
    resumeRefresh,
    manualRefresh,
    forceSyncData,
    lastRefresh: lastRefreshRef.current,
    isActive: isActiveRef.current,
  };
};
