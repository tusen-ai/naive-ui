import getSlot from '../../_utils/vue/getSlot'

export function getDerivedPropsFromChildren (instance, callback) {
  return callback(getSlot(instance))
}
