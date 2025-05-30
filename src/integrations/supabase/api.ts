import { supabase } from "./client";

export const api = {
  sermons: {
    getSermons: async () => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("sermon_date", { ascending: false });

      if (error) throw error;
      return data;
    },
    getFeaturedSermons: async (limit = 3) => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .eq("is_featured", true)
        .order("sermon_date", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    getSermonById: async (id: string) => {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createSermon: async (sermon: any) => {
      const { data, error } = await supabase
        .from("sermons")
        .insert([sermon])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateSermon: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("sermons")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteSermon: async (id: string) => {
      const { error } = await supabase.from("sermons").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  events: {
    getEvents: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      return data;
    },
    getUpcomingEvents: async (limit = 3) => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    getEventById: async (id: string) => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createEvent: async (event: any) => {
      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateEvent: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("events")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteEvent: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  members: {
    getMembers: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getMemberById: async (id: string) => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    createMember: async (member: any) => {
      const { data, error } = await supabase
        .from("members")
        .insert([member])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateMember: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("members")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteMember: async (id: string) => {
      const { error } = await supabase.from("members").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  gallery: {
    getGalleryImages: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getImageById: async (id: string) => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addImage: async (image: any) => {
      const { data, error } = await supabase
        .from("gallery")
        .insert([image])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateImage: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("gallery")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteImage: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  testimonials: {
    getTestimonials: async (approvedOnly = true) => {
      let query = supabase.from("testimonials").select("*");

      if (approvedOnly) {
        query = query.eq("is_approved", true);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    },
    getTestimonialById: async (id: string) => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addTestimonial: async (testimonial: any) => {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([testimonial])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updateTestimonial: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteTestimonial: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  prayerRequests: {
    getPrayerRequests: async (publicOnly = true) => {
      let query = supabase.from("prayer_requests").select("*");

      if (publicOnly) {
        query = query.eq("is_public", true);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return data;
    },
    getPrayerRequestById: async (id: string) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    addPrayerRequest: async (request: any) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .insert([request])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    updatePrayerRequest: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deletePrayerRequest: async (id: string) => {
      const { error } = await supabase
        .from("prayer_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    },
  },
  donations: {
    getDonations: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getDonationById: async (id: string) => {
      const { data, error } = await supabase
        .from("donations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    updateDonation: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("donations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
  users: {
    getUsers: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    getUserById: async (id: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    updateUser: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    deleteUser: async (id: string) => {
      const { error } = await supabase.from("profiles").delete().eq("id", id);

      if (error) throw error;
      return true;
    },
  },
};
