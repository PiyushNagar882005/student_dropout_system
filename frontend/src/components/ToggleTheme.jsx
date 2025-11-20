import React, { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

// Supported animation types (kept minimal JS-friendly)
const ANIMATION_TYPES = [
  'none',
  'circle-spread',
  'round-morph',
  'swipe-left',
  'swipe-up',
  'diag-down-right',
  'fade-in-out',
  'shrink-grow',
  'flip-x-in',
  'split-vertical',
  'swipe-right',
  'swipe-down',
  'wave-ripple',
]

export default function ToggleTheme({ className = '', duration = 400, animationType = 'wave-ripple', ...props }){
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    // initialize from document or localStorage
    const stored = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('theme') : null
    const initial = stored ? stored === 'dark' : document.documentElement.classList.contains('dark')
    setIsDark(initial)
    if(initial) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')

    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if(!buttonRef.current) return

    const doToggle = () => {
      const newTheme = !document.documentElement.classList.contains('dark')
      flushSync(() => setIsDark(newTheme))
      if(newTheme) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      try { localStorage.setItem('theme', newTheme ? 'dark' : 'light') } catch (e) {}
    }

    // Use View Transition API if available to enable spatial animations
    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        doToggle()
      }).ready

      // compute ripple values
      const rect = buttonRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      // run the requested animation (we only need wave-ripple for now)
      switch (animationType) {
        case 'wave-ripple':
        default:
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            { duration, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', pseudoElement: '::view-transition-new(root)' }
          )
          break
      }
    } else {
      // fallback: simple toggle without fancy animation
      doToggle()
    }
  }, [animationType, duration])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`${className} p-2 rounded-full transition-colors duration-300 flex items-center justify-center`}
        aria-label="Toggle theme"
        {...props}
      >
        {isDark ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-blue-400" />}
      </button>
    </>
  )
}
