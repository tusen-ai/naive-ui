import NLoadingBar from './LoadingBar.vue'

export default {
  Vue: null,
  theme: null,
  loadingBarInstance: null,
  finishCallback () {
    if (this.loadingBarInstance) {
      // document.body.removeChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.$el.remove()
      this.loadingBarInstance.$destroy()
      this.loadingBarInstance = null
    }
  },
  start () {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.theme = this.theme
    this.loadingBarInstance.start()
  },
  error () {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.theme = this.theme
    this.loadingBarInstance.error(this.finishCallback.bind(this))
  },
  finish () {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.theme = this.theme
    this.loadingBarInstance.finish(this.finishCallback.bind(this))
  },
  update (percent) {
    if (!this.loadingBarInstance) {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
    }
    this.loadingBarInstance.theme = this.theme
    this.loadingBarInstance.update(percent)
  }
}
