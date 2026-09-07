'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { getSupabase } from '../../lib/supabase'
import type { User } from '@supabase/supabase-js'

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

type Mode = 'signin' | 'register'
type Method = 'password' | 'magiclink'
type Status = 'idle' | 'busy' | 'checkEmail' | 'error' | 'notice'

const OAUTH_PROVIDERS = [
  { id: 'google', label: 'Google' },
  { id: 'apple', label: 'Apple' },
] as const

type OAuthId = (typeof OAUTH_PROVIDERS)[number]['id']

export default function AuthDrawer({
  isOpen,
  onClose,
  user,
  initialMode = 'signin',
}: {
  isOpen: boolean
  onClose: () => void
  user: User | null
  initialMode?: Mode
}) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<Mode>('signin')
  const [method, setMethod] = useState<Method>('password')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [, startTransition] = useTransition()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // When the drawer opens for a signed-in user, quietly check whether their
  // profile carries the admin role so we can offer the admin link.
  useEffect(() => {
    if (!isOpen || !user) {
      setIsAdmin(false)
      return
    }
    let cancelled = false
    getSupabase()
      .auth.getSession()
      .then(async ({ data: { session } }) => {
        if (cancelled || !session) return
        const res = await fetch('/api/admin/me', {
          headers: { authorization: `Bearer ${session.access_token}` },
        })
        if (cancelled) return
        if (res.ok) {
          const json = (await res.json()) as { isAdmin: boolean }
          setIsAdmin(json.isAdmin === true)
        }
      })
      .catch(() => { /* role check is non-critical */ })
    return () => {
      cancelled = true
    }
  }, [isOpen, user])

  useEffect(() => {
    if (!isOpen) return
    setMode(initialMode)
    setMethod('password')
    setStatus('idle')
    setMessage('')
    setPassword('')
    const raf = requestAnimationFrame(() =>
      closeButtonRef.current?.focus({ preventScroll: true })
    )

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [isOpen, onClose, initialMode])

  const switchMode = (next: Mode) => {
    setMode(next)
    setMethod('password')
    setStatus('idle')
    setMessage('')
    setPassword('')
  }

  const handleOAuth = (provider: OAuthId) => {
    if (status === 'busy') return
    setStatus('busy')
    setMessage('')
    getSupabase()
      .auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      })
      .catch((err: unknown) => {
        const msg =
          (err as { msg?: string })?.msg ??
          (err as { message?: string })?.message
        const label = OAUTH_PROVIDERS.find((p) => p.id === provider)?.label ?? provider
        if (msg && /not enabled/i.test(msg)) {
          setStatus('error')
          setMessage(`${label} sign-in is not yet enabled on this site. Please use email and password, or a magic link instead.`)
          return
        }
        setStatus('error')
        setMessage(`${label} sign-in could not be started. Please try again.`)
      })
  }

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'busy') return
    const cleanEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    if (password.length < 6 && method === 'password') {
      setStatus('error')
      setMessage('Your password must be at least 6 characters.')
      return
    }
    setStatus('busy')
    setMessage('')

    startTransition(async () => {
      const supabase = getSupabase()
      try {
        if (mode === 'signin' && method === 'magiclink') {
          const { error } = await supabase.auth.signInWithOtp({
            email: cleanEmail,
            options: { emailRedirectTo: window.location.origin },
          })
          if (error) {
            setStatus('error')
            setMessage('The magic link could not be sent. Please check the address and retry.')
            return
          }
          setStatus('notice')
          setMessage('Check your inbox — we have sent you a secure sign-in link.')
          return
        }
        if (mode === 'signin') {
          const { error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          })
          if (error) {
            setStatus('error')
            setMessage('Those credentials did not match. Please check and retry.')
            return
          }
          onClose()
        } else {
          const { error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
          if (error) {
            setStatus('error')
            setMessage('That address could not be registered. It may already be a member — try signing in.')
            return
          }
          setStatus('checkEmail')
        }
      } catch {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    })
  }

  const handleForgotPassword = () => {
    const cleanEmail = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus('error')
      setMessage('Enter your email address so we can send you a reset link.')
      return
    }
    setStatus('busy')
    setMessage('')
    startTransition(async () => {
      try {
        const { error } = await getSupabase().auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: window.location.origin,
        })
        if (error) {
          setStatus('error')
          setMessage('The reset link could not be sent. Please try again.')
          return
        }
        setStatus('notice')
        setMessage('If that address is registered, a password reset link is on its way.')
      } catch {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    })
  }

  const handleSignOut = async () => {
    setStatus('busy')
    await getSupabase().auth.signOut()
    setStatus('idle')
    onClose()
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--color-border-strong)',
    borderRadius: 0,
    padding: '0.875rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    fontWeight: 300,
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  return (
    <>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Member account"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 80,
                  background: 'rgba(6, 6, 6, 0.94)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex',
                  overflowY: 'auto',
                  padding: 'clamp(4rem, 8vh, 6rem) clamp(1rem, 3vw, 3rem) 2rem',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close account"
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: 'clamp(1.5rem, 4vw, 4rem)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.625rem',
                    color: 'var(--color-text-secondary)',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent-gold)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
                  </svg>
                </button>

                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                  className="auth-dialog"
                  style={{
                    width: 'min(38rem, 100%)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  {/* Form panel */}
                  <div
                    className="auth-form-panel"
                    style={{
                      background: 'var(--color-surface-background)',
                      padding: 'clamp(2.5rem, 5vw, 3.5rem)',
                    }}
                  >
                    {user ? (
                      <div style={{ margin: 'auto', width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            color: 'var(--color-accent-gold)',
                            marginBottom: '1.5rem',
                          }}
                        >
                          Member
                        </p>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                            color: 'var(--color-text-primary)',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {user.user_metadata?.name
                            ? String(user.user_metadata.name)
                            : user.email}
                        </h2>
                        {user.email && (
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontWeight: 300,
                              fontSize: '0.9375rem',
                              color: 'var(--color-text-secondary)',
                              marginBottom: '3rem',
                            }}
                          >
                            {user.email}
                          </p>
                        )}
                        {isAdmin && (
                          <p
                            style={{
                              margin: '0 0 1.5rem',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.25em',
                            }}
                          >
                            <a
                              href="/admin"
                              onClick={onClose}
                              style={{
                                color: 'var(--color-accent-gold)',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)' }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                            >
                              Atelier Admin
                            </a>
                          </p>
                        )}
                        <div>
                          <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={status === 'busy'}
                            style={{
                              backgroundColor: 'transparent',
                              color: 'var(--color-text-primary)',
                              border: '1px solid var(--color-border-strong)',
                              borderRadius: 0,
                              padding: '1rem 3rem',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.25em',
                              cursor: 'pointer',
                              transition: 'border-color 0.3s ease, color 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
                              e.currentTarget.style.color = 'var(--color-accent-gold)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                              e.currentTarget.style.color = 'var(--color-text-primary)'
                            }}
                          >
                            {status === 'busy' ? 'Signing out…' : 'Sign out'}
                          </button>
                        </div>
                      </div>
                    </div>
                    ) : status === 'checkEmail' ? (
                      <div style={{ maxWidth: '28rem', margin: 'auto', width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                            color: 'var(--color-text-primary)',
                            marginBottom: '1.5rem',
                          }}
                        >
                          Check your inbox
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: '0.9375rem',
                            lineHeight: 1.8,
                            color: 'var(--color-text-secondary)',
                            marginBottom: '2.5rem',
                          }}
                        >
                          We sent a confirmation link to <strong>{email.trim()}</strong>. Once
                          verified you can sign in.
                        </p>
                        <button
                          type="button"
                          onClick={() => switchMode('signin')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: 'var(--color-accent-gold)',
                          }}
                        >
                          Return to sign in
                        </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ margin: 'auto', width: '100%' }}>
                        {/* Mode tabs */}
                        <div
                          role="tablist"
                          aria-label="Sign in or register"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            borderBottom: '1px solid var(--color-border-default)',
                            marginBottom: '2.5rem',
                          }}
                        >
                          {(['signin', 'register'] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              role="tab"
                              aria-selected={mode === m}
                              onClick={() => switchMode(m)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '1rem 0 1.125rem',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: mode === m ? 700 : 400,
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                color: mode === m
                                  ? 'var(--color-accent-gold)'
                                  : 'var(--color-text-muted)',
                                boxShadow: mode === m
                                  ? 'inset 0 -1px 0 var(--color-accent-gold)'
                                  : 'none',
                                transition: 'color 0.3s ease, box-shadow 0.3s ease',
                              }}
                            >
                              {m === 'signin' ? 'Sign In' : 'Create Account'}
                            </button>
                          ))}
                        </div>

                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 300,
                            fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
                            color: 'var(--color-text-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {mode === 'signin' ? 'Welcome back' : 'Become a member'}
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            margin: '0 0 2.25rem',
                          }}
                        >
                          {mode === 'signin'
                            ? 'Resume the ritual where you left it.'
                            : 'A few details — then the collection is yours.'}
                        </p>

                        {/* Social sign-in */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {OAUTH_PROVIDERS.map((provider) => (
                            <button
                              key={provider.id}
                              type="button"
                              onClick={() => handleOAuth(provider.id)}
                              disabled={status === 'busy'}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.875rem',
                                backgroundColor: 'transparent',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-border-strong)',
                                borderRadius: 0,
                                padding: '0.9375rem 1.5rem',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                cursor: 'pointer',
                                opacity: status === 'busy' ? 0.5 : 1,
                                transition: 'border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent-gold)'
                                e.currentTarget.style.color = 'var(--color-accent-gold)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                                e.currentTarget.style.color = 'var(--color-text-primary)'
                              }}
                            >
                              {provider.id === 'google' ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                  <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.2 3.5 2.7.2.2c2.2-2 3.8-5 3.8-8.8z" />
                                  <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-3c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5l-.1.1-3.6 2.8v.2C3.2 21.3 7.2 24 12 24z" />
                                  <path fill="#FBBC05" d="M5.3 14.2c-.2-.7-.4-1.5-.4-2.2s.1-1.5.4-2.2l-.1-.2L1.6 6.9l-.2.1C.6 8.2.1 10 .1 12s.5 3.8 1.3 5l3.9-2.8z" />
                                  <path fill="#EA4335" d="M12 4.7c2.2 0 3.7 1 4.6 1.8l3.3-3.2C17.9 1.2 15.2 0 12 0 7.2 0 3.2 2.7 1.3 6.9l3.9 3.1c1-2.9 3.6-5.3 6.8-5.3z" />
                                </svg>
                              ) : (
                                <svg width="16" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M16.365 1.43c0 1.14-.495 2.213-1.283 2.99-.884.873-2.316 1.584-3.536 1.418-.133-1.144.464-2.472 1.21-3.24C13.563 1.656 15.375.98 16.365 1.43zM20.945 17.246c-.579 1.316-.857 1.9-1.602 3.061-.1.158-1.228 2.178-2.617 2.178H16.7c-1.235 0-1.827-.813-3.518-.813-1.671 0-2.25.808-3.518.808-1.399 0-2.42-1.844-2.683-2.315C4.742 17.838 4 15.8 4 13.32c0-3.665 2.374-5.884 4.35-5.884 1.194 0 2.263.566 3.122.566.859 0 1.758-.583 3.262-.583 1.217 0 2.531.62 3.386 1.77-.134.083-2.455 1.513-2.455 3.755 0 2.687 2.28 3.723 2.28 3.723s-1.983-.37-3-1.302z" fillRule="evenodd" />
                                </svg>
                              )}
                              Continue with {provider.label}
                            </button>
                          ))}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            margin: '2rem 0',
                          }}
                        >
                          <span style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-default)' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.625rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.25em',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            or
                          </span>
                          <span style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-default)' }} />
                        </div>

                        {/* Email form */}
                        <form onSubmit={handleEmail} noValidate>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                              <label
                                htmlFor="auth-email"
                                style={{
                                  display: 'block',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.6875rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.25em',
                                  color: 'var(--color-text-secondary)',
                                  marginBottom: '0.25rem',
                                }}
                              >
                                Email
                              </label>
                              <input
                                id="auth-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={inputStyle}
                              />
                            </div>

                            {method === 'password' && (
                              <div>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  <label
                                    htmlFor="auth-password"
                                    style={{
                                      fontFamily: 'var(--font-body)',
                                      fontSize: '0.6875rem',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.25em',
                                      color: 'var(--color-text-secondary)',
                                    }}
                                  >
                                    Password
                                  </label>
                                  {mode === 'signin' && (
                                    <button
                                      type="button"
                                      onClick={handleForgotPassword}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.6875rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em',
                                        color: 'var(--color-text-muted)',
                                        transition: 'color 0.3s ease',
                                      }}
                                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
                                    >
                                      Forgot password
                                    </button>
                                  )}
                                </div>
                                <input
                                  id="auth-password"
                                  type="password"
                                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder={mode === 'register' ? 'Six characters or more' : 'Your password'}
                                  style={inputStyle}
                                />
                              </div>
                            )}

                            {status === 'error' && message && (
                              <p
                                role="alert"
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.8125rem',
                                  lineHeight: 1.6,
                                  color: 'var(--color-status-error)',
                                  margin: 0,
                                }}
                              >
                                {message}
                              </p>
                            )}
                            {status === 'notice' && message && (
                              <p
                                role="status"
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.8125rem',
                                  lineHeight: 1.6,
                                  color: 'var(--color-status-info)',
                                  margin: 0,
                                }}
                              >
                                {message}
                              </p>
                            )}

                            <button
                              type="submit"
                              disabled={status === 'busy'}
                              style={{
                                width: '100%',
                                backgroundColor: 'var(--color-accent-gold)',
                                color: 'var(--color-brand-primary)',
                                border: 'none',
                                borderRadius: 0,
                                padding: '1.125rem 1.5rem',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                cursor: 'pointer',
                                opacity: status === 'busy' ? 0.6 : 1,
                                transition: 'background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-text-primary)'
                                e.currentTarget.style.color = 'var(--color-brand-primary)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-accent-gold)'
                                e.currentTarget.style.color = 'var(--color-brand-primary)'
                              }}
                            >
                              {status === 'busy'
                                ? mode === 'signin'
                                  ? 'Signing in…'
                                  : 'Creating account…'
                                : mode === 'signin'
                                  ? method === 'magiclink'
                                    ? 'Send magic link'
                                    : 'Sign In'
                                  : 'Create Account'}
                            </button>

                            {mode === 'signin' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setMethod(method === 'password' ? 'magiclink' : 'password')
                                  setStatus('idle')
                                  setMessage('')
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '0.375rem 0',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '0.6875rem',
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.15em',
                                  color: 'var(--color-text-muted)',
                                  transition: 'color 0.3s ease',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent-gold)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
                              >
                                {method === 'password'
                                  ? 'Or use a magic link instead'
                                  : 'Or sign in with your password'}
                              </button>
                            )}
                          </div>
                        </form>

                        <p
                          style={{
                            marginTop: '1.5rem',
                            textAlign: 'center',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 300,
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {mode === 'signin' ? 'New to Auvérer?' : 'Already a member?'}{' '}
                          <button
                            type="button"
                            onClick={() => switchMode(mode === 'signin' ? 'register' : 'signin')}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 0,
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              color: 'var(--color-accent-gold)',
                            }}
                          >
                            {mode === 'signin' ? 'Create an account' : 'Sign in'}
                          </button>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}