import {
  computed,
  getCurrentInstance,
  ref,
  watch
} from 'vue'
import {
  TreeMate
} from 'treemate'

export function useCascader (props) {
  const keyboardKeyRef = ref(null)
  const hoverKeyRef = ref(null)
  const treeMateRef = computed(() => {
    return TreeMate(props.options, {
      getKey ({ node }) {
        return node.value
      }
    })
  })
  const mergedKeysRef = computed(() => {
    const {
      value,
      cascade,
      multiple
    } = props
    if (multiple) {
      return treeMateRef.value.getCheckedKeys(value, {
        cascade
      })
    } else {
      return {
        checkedKeys: [],
        indeterminateKeys: []
      }
    }
  })
  const checkedKeysRef = computed(() => mergedKeysRef.value.checkedKeys)
  const indeterminateKeysRef = computed(() => mergedKeysRef.value.indeterminateKeys)
  const menuModelRef = computed(() => {
    const {
      treeNodePath,
      treeNode
    } = treeMateRef.value.getPath(hoverKeyRef.value)
    let ret
    if (treeNode === null) {
      ret = [
        treeMateRef.value.treeNodes
      ]
    } else {
      ret = treeNodePath.map(treeNode => treeNode.siblings)
      if (!treeNode.isLeaf) {
        ret.push(treeNode.children)
      }
    }
    return ret
  })
  const hoverKeyPathRef = computed(() => {
    const {
      keyPath
    } = treeMateRef.value.getPath(hoverKeyRef.value)
    return keyPath
  })
  watch(props.options, () => {
    hoverKeyRef.value = null
    keyboardKeyRef.value = null
  })
  const vm = getCurrentInstance().proxy
  function updateKeyboardKey (key) {
    keyboardKeyRef.value = key
  }
  function updateHoverKey (key) {
    hoverKeyRef.value = key
  }
  function doCheck (key) {
    const {
      cascade,
      multiple,
      leafOnly
    } = props
    if (multiple) {
      const {
        checkedKeys
      } = treeMateRef.value.check(
        key,
        mergedKeysRef.value.checkedKeys,
        {
          cascade,
          leafOnly
        }
      )
      vm.doUpdateValue(checkedKeys)
    } else {
      vm.doUpdateValue(key)
    }
  }
  function doUncheck (key) {
    const {
      cascade,
      multiple,
      leafOnly
    } = props
    if (multiple) {
      const {
        checkedKeys
      } = treeMateRef.value.uncheck(
        key,
        mergedKeysRef.value.checkedKeys,
        {
          cascade,
          leafOnly
        }
      )
      vm.doUpdateValue(checkedKeys)
    }
  }
  const selectedOptionsRef = computed(() => {
    if (props.multiple) {
      const {
        value,
        showPath,
        separator
      } = props
      if (Array.isArray(value)) {
        const {
          getNode
        } = treeMateRef.value
        return value.map(key => {
          const node = getNode(key)
          if (node === null) {
            return {
              label: key,
              value: key
            }
          } else {
            return {
              label: showPath ? getPathLabel(node, separator) : node.rawNode.label,
              value: node.rawNode.value
            }
          }
        })
      } else {
        return []
      }
    } else return []
  })
  const selectedOptionRef = computed(() => {
    const {
      multiple,
      showPath,
      separator
    } = props
    if (!multiple) {
      const {
        value
      } = props
      const {
        getNode
      } = treeMateRef.value
      if (value === null) {
        return null
      }
      const node = getNode(value)
      if (node === null) {
        return {
          label: value,
          value
        }
      } else {
        return {
          label: showPath ? getPathLabel(node, separator) : node.rawNode.label,
          value: node.rawNode.value
        }
      }
    } else return null
  })
  return {
    treeMate: treeMateRef,
    keyboardKey: keyboardKeyRef,
    hoverKey: hoverKeyRef,
    menuModel: menuModelRef,
    checkedKeys: checkedKeysRef,
    indeterminateKeys: indeterminateKeysRef,
    selectedOptions: selectedOptionsRef,
    selectedOption: selectedOptionRef,
    hoverKeyPath: hoverKeyPathRef,
    updateKeyboardKey,
    updateHoverKey,
    doCheck,
    doUncheck
  }
}

function getPathLabel (node, separator) {
  const path = []
  while (node) {
    path.push(node.rawNode.label)
    node = node.parent
  }
  return path.reverse().join(separator)
}
