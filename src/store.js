import create from "zustand";

const useStore = create((set) => ({
  formula: "",
  setFormula: (formula) => set({ formula }),
}));

export default useStore;
