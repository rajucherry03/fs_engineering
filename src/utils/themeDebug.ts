// Debug utility to check and fix theme issues
export const debugTheme = () => {
  const html = document.documentElement
  const savedTheme = localStorage.getItem('theme')
  const hasDarkClass = html.classList.contains('dark')
  
  console.log('=== Theme Debug Info ===')
  console.log('Saved theme in localStorage:', savedTheme)
  console.log('Has "dark" class on <html>:', hasDarkClass)
  console.log('Computed style background:', window.getComputedStyle(document.body).backgroundColor)
  console.log('System prefers dark:', window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  return {
    savedTheme,
    hasDarkClass,
    computedBg: window.getComputedStyle(document.body).backgroundColor
  }
}

export const forceLightMode = () => {
  const html = document.documentElement
  html.classList.remove('dark')
  localStorage.setItem('theme', 'light')
  console.log('Forced light mode - dark class removed')
  location.reload()
}

export const forceDarkMode = () => {
  const html = document.documentElement
  html.classList.add('dark')
  localStorage.setItem('theme', 'dark')
  console.log('Forced dark mode - dark class added')
  location.reload()
}

// Make these available globally for debugging
if (typeof window !== 'undefined') {
  const win = window as any
  win.debugTheme = debugTheme
  win.forceLightMode = forceLightMode
  win.forceDarkMode = forceDarkMode
}

