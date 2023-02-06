"use client"
import {create} from "zustand";

export const useStore = create((set) => {
  return {
    isModalOpen: false,
    setIsModalOpen:()=>{
      set({isModalOpen: true})
    },
    setIsModalClose:()=>{
      set({isModalOpen: false})
    }
  };
});
