import NLoadingBar from './LoadingBar.vue'

export default {
  Vue: null,
  loadingBarInstance: null,
  finishCallback () {
    if (this.loadingBarInstance) {
      document.body.removeChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.$destroy()
      this.loadingBarInstance = null
    }
  },
  start () {
    if (this.loadingBarInstance) {
      this.loadingBarInstance.start()
    } else {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.start()
    }
  },
  error () {
    if (this.loadingBarInstance) {
      this.loadingBarInstance.error(this.finishCallback.bind(this))
    } else {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.error(this.finishCallback.bind(this))
    }
  },
  finish () {
    if (this.loadingBarInstance) {
      this.loadingBarInstance.finish(this.finishCallback.bind(this))
    } else {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.finish(this.finishCallback.bind(this))
    }
  },
  update (percent) {
    if (this.loadingBarInstance) {
      this.loadingBarInstance.update(percent)
    } else {
      this.loadingBarInstance = new this.Vue(NLoadingBar).$mount()
      document.body.appendChild(this.loadingBarInstance.$el)
      this.loadingBarInstance.update(percent)
    }
  }
}
