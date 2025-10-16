import { create } from 'zustand'

const useTheme = create((set) => ({
  dark: true,
  toggle: () => set((s) => ({ dark: !s.dark })),
}))

export default useTheme
