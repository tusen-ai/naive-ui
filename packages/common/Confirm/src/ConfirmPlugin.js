import ConfirmEnvironment from './ConfirmEnvironment.vue'

const instances = new Set()

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
  createInstance () {
    const instance = new this.Vue(ConfirmEnvironment)
    instance.$mount()
    instances.add(instance)
    instance.instances = instances
    return instance
  },
  confirm (options) {
    this.open.bind(this)(options)
  },
  open (options) {
    const instance = this.createInstance()
    updateConfirm(
      {
        type: 'confirm',
        active: true,
        theme: this.theme,
        ...options
      },
      instance
    )
    return instance
  },
  error (options) {
    const instance = this.createInstance()
    updateConfirm(
      {
        type: 'error',
        active: true,
        theme: this.theme,
        ...options
      },
      instance
    )
    return instance
  },
  success (options) {
    const instance = this.createInstance()
    updateConfirm(
      {
        type: 'success',
        active: true,
        theme: this.theme,
        ...options
      },
      instance
    )
    return instance
  },
  destroyAll () {
    instances.forEach(instance => {
      instance.active = false
    })
  }
}
