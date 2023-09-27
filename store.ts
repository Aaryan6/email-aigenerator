import { create } from "zustand";

interface StoreState {
  email: string;
  storeEmail: any;
}

const useStore = create<StoreState>((set) => ({
  email: null,
  storeEmail(value: any) {
    set((state) => ({ email: value }));
  },
}));

export default useStore;
