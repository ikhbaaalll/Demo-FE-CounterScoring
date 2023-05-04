import { create } from "zustand";

export const useSidebarStore = create((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
}));
