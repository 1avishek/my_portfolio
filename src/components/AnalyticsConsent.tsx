import { useEffect, useState } from 'react'
import { site } from '../data/site'

type AnalyticsChoice = 'accepted' | 'rejected' | 'pending'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const storageKey = 'analytics-consent'

function getSavedChoice(): AnalyticsChoice {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved === 'accepted' || saved === 'rejected' ? saved : 'pending'
  } catch {
    return 'pending'
  }
}

function loadAnalytics() {
  if (document.getElementById('google-analytics')) return

  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args)
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', site.googleAnalyticsId)

  const script = document.createElement('script')
  script.id = 'google-analytics'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`
  document.head.append(script)
}

function clearAnalyticsCookies() {
  const propertyCookie = `_ga_${site.googleAnalyticsId.replace('G-', '')}`
  for (const name of ['_ga', propertyCookie]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
  }
}

function AnalyticsConsent() {
  const [choice, setChoice] = useState<AnalyticsChoice>(getSavedChoice)

  useEffect(() => {
    if (choice === 'accepted') loadAnalytics()
  }, [choice])

  const saveChoice = (nextChoice: Exclude<AnalyticsChoice, 'pending'>) => {
    try {
      localStorage.setItem(storageKey, nextChoice)
    } catch {
      // The current session still respects the visitor's choice.
    }

    if (nextChoice === 'rejected' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      clearAnalyticsCookies()
      window.location.reload()
      return
    }

    setChoice(nextChoice)
  }

  if (choice !== 'pending') {
    return (
      <button
        className="analytics-settings"
        type="button"
        aria-label="Change analytics consent settings"
        onClick={() => setChoice('pending')}
      >
        Analytics
      </button>
    )
  }

  return (
    <aside className="analytics-consent" aria-labelledby="analytics-consent-title">
      <div>
        <h2 id="analytics-consent-title">Analytics</h2>
        <p>
          Optional analytics. Nothing loads before you accept.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          .
        </p>
      </div>
      <div className="analytics-consent__actions">
        <button type="button" onClick={() => saveChoice('rejected')}>
          Reject
        </button>
        <button type="button" onClick={() => saveChoice('accepted')}>
          Accept
        </button>
      </div>
    </aside>
  )
}

export default AnalyticsConsent
