'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getSupabase, hasSupabaseEnv } from '../../lib/supabase'
import type { User } from '@supabase/supabase-js'
import AuthDrawer from './AuthDrawer'

type AuthStatus = 'loading' | 'authed' | 'guest'

export type AuthMode = 'signin' | 'register'

type AuthContextValue = {
  user: User | null
  status: AuthStatus
  openAuth: (mode?: AuthMode) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('signin')

  useEffect(() => {
    if (!hasSupabaseEnv) {
      setStatus('guest')
      return
    }
    const supabase = getSupabase()

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setStatus(data.session ? 'authed' : 'guest')
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setStatus('guest')
        return
      }
      setUser(session?.user ?? null)
      setStatus(session ? 'authed' : 'guest')
    })

    return () => subscription.unsubscribe()
  }, [])

  const openAuth = useCallback((mode: AuthMode = 'signin') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }, [])

  const signOut = useCallback(async () => {
    try {
      await getSupabase().auth.signOut()
    } catch {
      /* Supabase not configured — nothing to sign out of. */
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, status, openAuth, signOut }}>
      {children}
      <AuthDrawer
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        user={user}
        initialMode={authMode}
      />
    </AuthContext.Provider>
  )
}