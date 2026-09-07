'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { getSupabase } from '../../lib/supabase'
import { useAuth } from '../shared/AuthProvider'

type ProfileRow = {
  id: string
  email: string | null
  fullName: string | null
  role: 'member' | 'admin'
  createdAt: string
}

type View =
  | { state: 'checking' }
  | { state: 'unauthenticated' }
  | { state: 'forbidden' }
  | { state: 'error'; message: string }
  | { state: 'ready'; profiles: ProfileRow[] }

export default function AdminPanel() {
  const { user, status, openAuth } = useAuth()
  const [view, setView] = useState<View>({ state: 'checking' })
  const [busyId, setBusyId] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState('')

  const refresh = useCallback(async () => {
    const supabase = getSupabase()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      setView({ state: 'unauthenticated' })
      return
    }
    const res = await fetch('/api/admin/profiles', {
      headers: { authorization: `Bearer ${session.access_token}` },
    })
    if (res.status === 401) {
      setView({ state: 'unauthenticated' })
      return
    }
    if (res.status === 403) {
      setView({ state: 'forbidden' })
      return
    }
    if (!res.ok) {
      setView({ state: 'error', message: 'Could not load members.' })
      return
    }
    const json = (await res.json()) as { profiles: ProfileRow[] }
    setView({ state: 'ready', profiles: json.profiles })
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh, user, status])

  const assignRole = async (profileId: string, role: 'admin' | 'member') => {
    setBusyId(profileId)
    setActionMessage('')
    try {
      const supabase = getSupabase()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        setView({ state: 'unauthenticated' })
        return
      }
      const res = await fetch('/api/admin/assign-role', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${session.access_token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ userId: profileId, role }),
      })
      const json = (await res.json()) as { error?: string }
      if (!res.ok) {
        setActionMessage(json.error ?? 'The change could not be saved.')
        return
      }
      refresh()
    } catch {
      setActionMessage('Something went wrong. Please try again.')
    } finally {
      setBusyId(null)
    }
  }

  const canSelfChange = (profileId: string) => profileId === user?.id

  return (
    <section
      aria-labelledby="admin-title"
      style={{
        padding: '8rem clamp(1.5rem, 4vw, 4rem) clamp(5rem, 8vw, 7rem)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Heading */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'var(--color-accent-gold)',
            marginBottom: '1rem',
          }}
        >
          Atelier Admin
        </p>
        <h1
          id="admin-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.3,
            color: 'var(--color-text-primary)',
            marginBottom: '3rem',
          }}
        >
          Member Management
        </h1>

        {view.state === 'checking' && (
          <p style={bodyTextStyle}>Verifying access…</p>
        )}

        {view.state === 'unauthenticated' && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ ...bodyTextStyle, textAlign: 'center', margin: '0 auto 2rem' }}>
              Sign in to manage the atelier.
            </p>
            <button
              type="button"
              onClick={() => openAuth('signin')}
              style={{
                backgroundColor: 'var(--color-accent-gold)',
                color: 'var(--color-brand-primary)',
                border: 'none',
                borderRadius: 0,
                padding: '1rem 2.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </div>
        )}

        {view.state === 'forbidden' && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ ...bodyTextStyle, textAlign: 'center', margin: '0 auto 2rem' }}>
              This area is reserved for atelier administrators. You do not have access.
            </p>
            <Link href="/" style={goldLinkStyle}>
              Return to the site
            </Link>
          </div>
        )}

        {view.state === 'error' && (
          <p style={{ ...bodyTextStyle, color: 'var(--color-status-error)' }}>{view.message}</p>
        )}

        {view.state === 'ready' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: actionMessage ? '1rem' : '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <p style={{ ...bodyTextStyle, margin: 0 }}>
                {view.profiles.length} member{view.profiles.length === 1 ? '' : 's'}
              </p>
              {actionMessage && (
                <p
                  role="status"
                  style={{
                    ...bodyTextStyle,
                    margin: 0,
                    color: actionMessage.includes('could not')
                      ? 'var(--color-status-error)'
                      : 'var(--color-status-info)',
                  }}
                >
                  {actionMessage}
                </p>
              )}
            </div>

            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: 0,
                overflow: 'hidden',
              }}
            >
              <div
                role="table"
                aria-label="Members"
                style={{ width: '100%', borderCollapse: 'collapse' }}
              >
                {/* Header row */}
                <div
                  role="row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.25fr) minmax(0, 1fr) auto',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '0.875rem 1.25rem',
                    backgroundColor: 'var(--color-surface-container-low)',
                    borderBottom: '1px solid var(--color-border-default)',
                  }}
                >
                  {['Member', 'Email', 'Role', ''].map((label, i) => (
                    <div
                      key={`${label}-${i}`}
                      role="columnheader"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {view.profiles.map((profile) => {
                  const isYou = canSelfChange(profile.id)
                  const isAdmin = profile.role === 'admin'
                  const busy = busyId === profile.id
                  return (
                    <div
                      key={profile.id}
                      role="row"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.25fr) minmax(0, 1fr) auto',
                        gap: '1rem',
                        alignItems: 'center',
                        padding: '1.125rem 1.25rem',
                        backgroundColor:
                          isYou ? 'rgba(183, 154, 99, 0.06)' : 'transparent',
                        borderBottom:
                          '1px solid var(--color-border-default)',
                      }}
                    >
                      <div role="cell" style={{ ...cellStyle, alignItems: 'center', gap: '0.75rem' }}>
                        <span>{profile.fullName || '—'}</span>
                        {isYou && (
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.5625rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              color: 'var(--color-accent-gold)',
                              border: '1px solid var(--color-accent-gold)',
                              padding: '0.125rem 0.5rem',
                            }}
                          >
                            You
                          </span>
                        )}
                      </div>
                      <div role="cell" style={cellStyle}>
                        {profile.email ?? '—'}
                      </div>
                      <div role="cell" style={cellStyle}>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            color: isAdmin
                              ? 'var(--color-accent-gold)'
                              : 'var(--color-text-secondary)',
                          }}
                        >
                          {isAdmin ? 'Admin' : 'Member'}
                        </span>
                      </div>
                      <div role="cell" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {isYou ? (
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.625rem',
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            You cannot change your own role
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              assignRole(profile.id, isAdmin ? 'member' : 'admin')
                            }
                            style={{
                              backgroundColor: isAdmin
                                ? 'transparent'
                                : 'var(--color-accent-gold)',
                              color: isAdmin
                                ? 'var(--color-text-primary)'
                                : 'var(--color-brand-primary)',
                              border: isAdmin
                                ? '1px solid var(--color-border-strong)'
                                : '1px solid var(--color-accent-gold)',
                              borderRadius: 0,
                              padding: '0.5rem 1rem',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.625rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.15em',
                              cursor: busy ? 'default' : 'pointer',
                              opacity: busy ? 0.5 : 1,
                            }}
                          >
                            {busy ? 'Saving…' : isAdmin ? 'Remove admin' : 'Make admin'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <p
              style={{
                marginTop: '1.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
              }}
            >
              Role changes take effect immediately. Every action here is audited through the
              atelier&rsquo;s role log — you can always demote a member you promoted.
            </p>
          </>
        )}
      </div>
    </section>
  )
}

const bodyTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '0.9375rem',
  lineHeight: 1.7,
  color: 'var(--color-text-secondary)',
  marginBottom: '1.5rem',
}

const cellStyle: React.CSSProperties = {
  display: 'flex',
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '0.875rem',
  color: 'var(--color-text-primary)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const goldLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.25em',
  color: 'var(--color-accent-gold)',
  textDecoration: 'none',
}