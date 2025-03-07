import { create } from "zustand";
import { supabase } from "../SupaNiga";

const useOrders = create((set) => ({
  orders: [],

  fetchOrders: async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("history_payment")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) {
      set({ orders: data });
    } else {
      console.error("Error fetching orders:", error);
    }
  },
}));

export default useOrders;
