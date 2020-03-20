import NLoadingBar from './LoadingBar.vue'

const LoadingBar = {
  Vue: null,
  theme: null, // theme is exposed to user
  inheritedTheme: null,
  loadingBarInstance: null,
  handleThemeChange (theme) {
    LoadingBar.inheritedTheme = theme
    const syntheticTheme = LoadingBar.theme || LoadingBar.inheritedTheme
    if (LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance.inheritedTheme = syntheticTheme
    }
  },
  finishCallback () {
    if (LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance.$el.remove()
      LoadingBar.loadingBarInstance.$destroy()
      LoadingBar.loadingBarInstance = null
    }
  },
  start ({ theme } = { theme: null }) {
    if (!LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance = new LoadingBar.Vue(NLoadingBar).$mount()
      document.body.appendChild(LoadingBar.loadingBarInstance.$el)
    }
    LoadingBar.loadingBarInstance.inheritedTheme = LoadingBar.theme || LoadingBar.inheritedTheme
    LoadingBar.loadingBarInstance.theme = theme
    LoadingBar.loadingBarInstance.start()
  },
  error ({ theme } = { theme: null }) {
    if (!LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance = new LoadingBar.Vue(NLoadingBar).$mount()
      document.body.appendChild(LoadingBar.loadingBarInstance.$el)
    }
    LoadingBar.loadingBarInstance.inheritedTheme = LoadingBar.theme || LoadingBar.inheritedTheme
    LoadingBar.loadingBarInstance.theme = theme
    LoadingBar.loadingBarInstance.error(LoadingBar.finishCallback.bind(LoadingBar))
  },
  finish ({ theme } = { theme: null }) {
    if (!LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance = new LoadingBar.Vue(NLoadingBar).$mount()
      document.body.appendChild(LoadingBar.loadingBarInstance.$el)
    }
    LoadingBar.loadingBarInstance.inheritedTheme = LoadingBar.theme || LoadingBar.inheritedTheme
    LoadingBar.loadingBarInstance.theme = theme
    LoadingBar.loadingBarInstance.finish(LoadingBar.finishCallback.bind(LoadingBar))
  },
  update ({ percent, theme } = { theme: null }) {
    if (!LoadingBar.loadingBarInstance) {
      LoadingBar.loadingBarInstance = new LoadingBar.Vue(NLoadingBar).$mount()
      document.body.appendChild(LoadingBar.loadingBarInstance.$el)
    }
    LoadingBar.loadingBarInstance.inheritedTheme = LoadingBar.theme || LoadingBar.inheritedTheme
    LoadingBar.loadingBarInstance.theme = theme
    LoadingBar.loadingBarInstance.update(percent)
  }
}

export default LoadingBar
