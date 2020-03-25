import ConfirmEnvironment from './ConfirmEnvironment.vue'

function updateConfirm (data, instance) {
  for (const key of Object.keys(data)) {
    if (key in instance.$data) {
      instance.$data[key] = data[key]
    }
  }
}

export default {
  name: 'NConfirm',
  theme: null,
  inheritedTheme: null,
  instances: new Set(),
  handleThemeChange (theme) {
    this.inheritedTheme = theme
    const syntheticTheme = this.theme || this.inheritedTheme
    for (const instance of this.instances) {
      instance.inheritedTheme = syntheticTheme
    }
  },
  createInstance () {
    const instance = new this.Vue(ConfirmEnvironment)
    instance.$mount()
    this.instances.add(instance)
    instance.instances = this.instances
    return instance
  },
  confirm (options) {
    this.open.bind(this)(options)
  },
  open (options) {
    this.warning(options)
  },
  warning (options) {
    const instance = this.createInstance()
    const syntheticTheme = this.theme || this.inheritedTheme
    updateConfirm(
      {
        type: 'warning',
        active: true,
        ...options,
        inheritedTheme: syntheticTheme
      },
      instance
    )
    return instance
  },
  error (options) {
    const instance = this.createInstance()
    const syntheticTheme = this.theme || this.inheritedTheme
    updateConfirm(
      {
        type: 'error',
        active: true,
        ...options,
        inheritedTheme: syntheticTheme
      },
      instance
    )
    return instance
  },
  success (options) {
    const instance = this.createInstance()
    const syntheticTheme = this.theme || this.inheritedTheme
    updateConfirm(
      {
        type: 'success',
        active: true,
        ...options,
        inheritedTheme: syntheticTheme
      },
      instance
    )
    return instance
  },
  destroyAll () {
    this.instances.forEach(instance => {
      instance.active = false
    })
  }
}
