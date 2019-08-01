import confirm from './confirm.js'
let instanceStack = []

let confirmInstance

function getConfirmInstance () {
  confirmInstance = confirm.newInstance()
  instanceStack.push(confirmInstance)
  return confirmInstance
}
function update (opts) {
  const confirmInstance = getConfirmInstance()
  confirmInstance.update(opts)
  return confirmInstance
}
const Confirm = {
  name: 'NConfirm',
  confirm (options) {
    return update({
      type: 'confirm',
      isActive: true,
      ...options
    })
  },
  error (options) {
    return update({
      type: 'error',
      isActive: true,
      ...options
    })
  },
  success (options) {
    return update({
      type: 'success',
      isActive: true,
      ...options
    })
  },
  remove () {
    let instance = instanceStack.pop()
    instance.remove()
  }
}
export default Confirm
