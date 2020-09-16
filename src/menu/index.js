import Menu from './src/Menu.js'

Menu.install = function (app, naive) {
  app.component(naive.componentPrefix + Menu.name, Menu)
}

export default Menu
