"use client";
import { create } from "zustand";

type storeType = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  setIsModalClose: () => void;
  selectedContactId: string;
  setSelectedContactId: (id: string) => void;
};

export const useStore = create<storeType>()((set) => {
  return {
    isModalOpen: false,
    selectedContactId: "",
    setIsModalOpen: () => {
      set({ isModalOpen: true });
    },
    setIsModalClose: () => {
      set({ isModalOpen: false });
    },
    setSelectedContactId: (id: string) => {
      set({ selectedContactId: id });
    },
  };
});
