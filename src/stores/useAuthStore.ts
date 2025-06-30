import {AuthResponse} from "@/types/auth.interface";
import {User} from "@/types/user.interface";
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean

    // Actions
    login: (authData: AuthResponse) => void
    logout: () => void
    updateUser: (userData: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isAuthenticated: false,

            login: (authData: AuthResponse) => {
                // Lưu token vào localStorage
                localStorage.setItem('token', authData.token)

                set({
                    token: authData.token,
                    user: authData.user,
                    isAuthenticated: true
                })
            },

            logout: () => {
                // Xóa token khỏi localStorage
                localStorage.removeItem('token')

                set({
                    token: null,
                    user: null,
                    isAuthenticated: false
                })
            },

            updateUser: (userData: Partial<User>) => {
                const currentUser = get().user
                if (currentUser) {
                    set({
                        user: {...currentUser, ...userData}
                    })
                }
            }
        }),
        {
            name: 'auth-storage', // key trong localStorage
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
)
