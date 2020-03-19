import NLoadingBar from './LoadingBar.vue'

export default {
  Vue: null,
  theme: null,
  loadingBarInstance: null,
  finishCallback () {
    if (this.loadingBarInstance) {
      this.loadingBarInstance.$el.remove()
      this.loadingBarInstance.$destroy()
      this.loadingBarInstance = null
    }
  },
  start ({ theme } = { theme: null }) {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.inheritedTheme = this.theme
    this.loadingBarInstance.theme = theme
    this.loadingBarInstance.start()
  },
  error ({ theme } = { theme: null }) {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.inheritedTheme = this.theme
    this.loadingBarInstance.theme = theme
    this.loadingBarInstance.error(this.finishCallback.bind(this))
  },
  finish ({ theme } = { theme: null }) {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.inheritedTheme = this.theme
    this.loadingBarInstance.theme = theme
    this.loadingBarInstance.finish(this.finishCallback.bind(this))
  },
  update ({ percent, theme } = { theme: null }) {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.inheritedTheme = this.theme
    this.loadingBarInstance.theme = theme
    this.loadingBarInstance.update(percent)
  }
}
