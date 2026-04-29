import { useEffect } from 'react'

export function useMouseGlow(enabled = true) {
  useEffect(() => {
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const updateGlow = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', updateGlow, { passive: true })

    return () => {
      window.removeEventListener('pointermove', updateGlow)
    }
  }, [enabled])
}
