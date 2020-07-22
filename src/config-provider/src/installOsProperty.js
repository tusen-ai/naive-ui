export default function installOsProperty (Vue) {
  let osTheme = null
  // Mql means media query list
  let darkMql = null
  let lightMql = null
  function handleDarkMqlChange (e) {
    if (e.matches) {
      os.theme = 'dark'
    }
  }
  function handleLightMqlChange (e) {
    if (e.matches) {
      os.theme = 'light'
    }
  }
  if (window.matchMedia) {
    darkMql = window.matchMedia('(prefers-color-scheme: dark)')
    lightMql = window.matchMedia('(prefers-color-scheme: light)')
    if (darkMql.matches) {
      osTheme = 'dark'
    } else if (lightMql.matches) {
      osTheme = 'light'
    }
    if (darkMql.addEventListener) {
      darkMql.addEventListener('change', handleDarkMqlChange)
      lightMql.addEventListener('change', handleLightMqlChange)
    } else if (darkMql.addListener) {
      darkMql.addListener(handleDarkMqlChange)
      lightMql.addListener(handleLightMqlChange)
    }
  }
  const os = Vue.observable({
    theme: osTheme
  })
  Vue.prototype.$NOs = os
  return () => {
    if (window.matchMedia) {
      if (darkMql.removeEventListener) {
        darkMql.removeEventListener('change', handleDarkMqlChange)
        lightMql.removeEventListener('change', handleLightMqlChange)
      } else if (darkMql.removeListener) {
        darkMql.removeListener(handleDarkMqlChange)
        lightMql.removeListener(handleLightMqlChange)
      }
    }
  }
}
