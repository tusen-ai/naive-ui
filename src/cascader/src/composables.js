import {
  computed,
  ref,
  watch
} from 'vue'
import {
  TreeMate,
  SubtreeNotLoadedError
} from 'treemate'
import { useIsMounted } from 'vooks'
import { useFormItem } from '../../_composables'
import { call } from '../../_utils'

export function useCascader (props) {
  const formItem = useFormItem(props)
  const cascaderMenuRef = ref(null)
  const selectMenuRef = ref(null)
  const triggerRef = ref(null)
  const keyboardKeyRef = ref(null)
  const hoverKeyRef = ref(null)
  const loadingKeySetRef = ref(new Set())
  const addLoadingKey = (key) => {
    loadingKeySetRef.value.add(key)
  }
  const deleteLoadingKey = (key) => {
    loadingKeySetRef.value.delete(key)
  }
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
      if (!treeNode.isLeaf && !loadingKeySetRef.value.has(treeNode.key)) {
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
  watch(props.options, (value, oldValue) => {
    if (!(value === oldValue)) {
      hoverKeyRef.value = null
      keyboardKeyRef.value = null
    }
  })
  function doUpdateValue (...args) {
    const {
      'onUpdate:value': onUpdateValue,
      onChange
    } = props
    const {
      nTriggerFormInput,
      nTriggerFormChange
    } = formItem
    if (onUpdateValue) call(onUpdateValue, ...args)
    if (onChange) call(onChange, ...args)
    nTriggerFormInput()
    nTriggerFormChange()
  }
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
      try {
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
        doUpdateValue(checkedKeys)
      } catch (err) {
        if (err instanceof SubtreeNotLoadedError) {
          if (cascaderMenuRef.value) {
            const node = treeMateRef.value.getNode(key)
            if (node !== null) {
              cascaderMenuRef.value.showErrorMessage(
                node.rawNode.label
              )
            }
          }
        } else {
          throw err
        }
      }
    } else {
      if (leafOnly) {
        const node = treeMateRef.value.getNode(key)
        if (node !== null && node.isLeaf) {
          doUpdateValue(key)
        } else {
          return false
        }
      } else {
        doUpdateValue(key)
      }
    }
    return true
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
      doUpdateValue(checkedKeys)
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
    loadingKeySet: loadingKeySetRef,
    isMounted: useIsMounted(),
    cascaderMenuRef,
    selectMenuRef,
    triggerRef,
    ...formItem,
    updateKeyboardKey,
    updateHoverKey,
    doCheck,
    doUncheck,
    addLoadingKey,
    deleteLoadingKey
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
