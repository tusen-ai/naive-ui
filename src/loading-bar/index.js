/* istanbul ignore file */
import LoadingBarProvider from './src/LoadingBarProvider'

LoadingBarProvider.install = function (app, naive) {
  app.component(naive.componentPrefix + LoadingBarProvider.name, LoadingBarProvider)
}

export default LoadingBarProvider
