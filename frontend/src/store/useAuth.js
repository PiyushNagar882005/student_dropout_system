import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuth = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,

      login: (userData, userRole) => {
        set({
          user: userData,
          isAuthenticated: true,
          role: userRole
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          role: null
        })
      },

      setUser: (userData) => {
        set({ user: userData })
      },

      isAdmin: () => {
        const state = useAuth.getState()
        return state.role === 'admin'
      },

      isUser: () => {
        const state = useAuth.getState()
        return state.role === 'user'
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role
      })
    }
  )
)

export default useAuth
