"use client";
import { create } from "zustand";

type storeType = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  setIsModalClose: () => void;
};

export const useStore = create<storeType>()((set) => {
  return {
    isModalOpen: false,
    setIsModalOpen: () => {
      set({ isModalOpen: true });
    },
    setIsModalClose: () => {
      set({ isModalOpen: false });
    },
  };
});
