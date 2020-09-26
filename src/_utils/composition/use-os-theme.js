import { ref } from 'vue'

export default function useOsTheme () {
  const osTheme = ref()
  // Mql means media query list
  let darkMql
  let lightMql
  function handleDarkMqlChange (e) {
    if (e.matches) {
      osTheme.value = 'dark'
    }
  }
  function handleLightMqlChange (e) {
    if (e.matches) {
      osTheme.value = 'light'
    }
  }
  if (window.matchMedia) {
    darkMql = window.matchMedia('(prefers-color-scheme: dark)')
    lightMql = window.matchMedia('(prefers-color-scheme: light)')
    if (darkMql.matches) {
      osTheme.value = 'dark'
    } else if (lightMql.matches) {
      osTheme.value = 'light'
    }
    if (darkMql.addEventListener) {
      darkMql.addEventListener('change', handleDarkMqlChange)
      lightMql.addEventListener('change', handleLightMqlChange)
    } else if (darkMql.addListener) {
      darkMql.addListener(handleDarkMqlChange)
      lightMql.addListener(handleLightMqlChange)
    }
  }
  return osTheme
}
