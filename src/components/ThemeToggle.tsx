import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import type { Theme } from '../hooks/useTheme'

type ThemeToggleProps = {
  theme: Theme
  onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="icon-button relative overflow-hidden"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, scale: 0.72, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </motion.span>
    </button>
  )
}

export default ThemeToggle
