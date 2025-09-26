import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-10 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
    )
  }

  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      type="button"
      className="relative w-12 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
          isDark ? 'bg-zinc-800 text-yellow-400' : 'bg-white text-orange-500'
        } shadow-lg`}
        animate={{
          x: isDark ? 20 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

export default ThemeSwitch
