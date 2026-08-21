import { ref } from 'vue'

export const themeStorageKey = 'naive-ui-theme'

function normalizeThemePreference(themeName) {
  return themeName === 'light' || themeName === 'dark' ? themeName : null
}

export function readThemePreference(storage) {
  try {
    const targetStorage = storage ?? window.localStorage
    return normalizeThemePreference(targetStorage.getItem(themeStorageKey))
  }
  catch {
    return null
  }
}

export function writeThemePreference(themeName, storage) {
  try {
    const targetStorage = storage ?? window.localStorage
    const preference = normalizeThemePreference(themeName)
    if (preference === null)
      targetStorage.removeItem(themeStorageKey)
    else targetStorage.setItem(themeStorageKey, preference)
  }
  catch {
    // The in-memory preference still works when storage is unavailable.
  }
}

const themePreferenceRef = ref(readThemePreference())

export function setThemePreference(themeName) {
  themePreferenceRef.value = normalizeThemePreference(themeName)
  writeThemePreference(themeName)
}

export function useThemePreference() {
  return themePreferenceRef
}
