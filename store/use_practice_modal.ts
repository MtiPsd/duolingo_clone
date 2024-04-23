import { create } from "zustand";

type practiceModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const usePracticeModal = create<practiceModalStore>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
