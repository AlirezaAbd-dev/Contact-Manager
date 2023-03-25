"use client";
import { create } from "zustand";

type storeType = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  setIsModalClose: () => void;
  selectedContactId: string;
  selectedContactName: string;
  setSelectedContactId: (id: string) => void;
  setSelectedContactName: (name: string) => void;
};

export const useStore = create<storeType>()((set) => {
  return {
    isModalOpen: false,
    selectedContactId: "",
    selectedContactName: "",
    setIsModalOpen: () => {
      set({ isModalOpen: true });
    },
    setIsModalClose: () => {
      set({ isModalOpen: false });
    },
    setSelectedContactId: (id: string) => {
      set({ selectedContactId: id });
    },
    setSelectedContactName: (name: string) => {
      set({ selectedContactName: name });
    },
  };
});
