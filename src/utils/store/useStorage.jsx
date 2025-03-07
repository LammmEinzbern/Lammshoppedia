import { create } from "zustand";

// Zustand store untuk menyimpan transaksi atau session user
export const useStorage = create((set) => ({
  user: null,
  transactions: [],

  setUser: (userData) => set({ user: userData }),
  setTransactions: (transactions) => set({ transactions }),

  clearStorage: () => set({ user: null, transactions: [] }),
}));
