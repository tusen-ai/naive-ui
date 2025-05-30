import type { CheckStrategy, Key } from 'treemate'
import type { CascaderOption, Value } from '../interface'
import { createTreeMate } from 'treemate'
import { useMergedState } from 'vooks'
import { computed, isReactive, ref, watch } from 'vue'
import { getPathLabel } from '../utils'

export interface cascaderProps {
  defaultValue: Value | null
  value: Value | null | undefined
  leafOnly: boolean
  checkStrategy: CheckStrategy
  valueField: string
  labelField: string
  childrenField: string
  disabledField: string
  options: CascaderOption[]
  cascade: boolean
  multiple: boolean
  allowCheckingNotLoaded: boolean
  showPath: boolean
  separator: string
}

export function useCascader(props: cascaderProps) {
  const uncontrolledValueRef = ref(props.defaultValue)
  const controlledValueRef = computed(() => props.value)

  const mergedValueRef = useMergedState(
    controlledValueRef,
    uncontrolledValueRef
  )
  const mergedCheckStrategyRef = computed(() => {
    return props.leafOnly ? 'child' : props.checkStrategy
  })
  const keyboardKeyRef = ref<Key | null>(null)
  const hoverKeyRef = ref<Key | null>(null)
  const loadingKeySetRef = ref<Set<Key>>(new Set())
  const addLoadingKey = (key: Key): void => {
    loadingKeySetRef.value.add(key)
  }
  const deleteLoadingKey = (key: Key): void => {
    loadingKeySetRef.value.delete(key)
  }
  const treeMateRef = computed(() => {
    const { valueField, childrenField, disabledField } = props
    return createTreeMate(props.options, {
      getDisabled(node) {
        return (node as any)[disabledField]
      },
      getKey(node) {
        return (node as any)[valueField]
      },
      getChildren(node) {
        return (node as any)[childrenField]
      }
    })
  })
  const mergedKeysRef = computed(() => {
    const { cascade, multiple, allowCheckingNotLoaded } = props
    if (multiple && Array.isArray(mergedValueRef.value)) {
      return treeMateRef.value.getCheckedKeys(mergedValueRef.value, {
        cascade,
        allowNotLoaded: allowCheckingNotLoaded
      })
    }
    else {
      return {
        checkedKeys: [],
        indeterminateKeys: []
      }
    }
  })

  const checkedKeysRef = computed(() => mergedKeysRef.value.checkedKeys)
  const indeterminateKeysRef = computed(
    () => mergedKeysRef.value.indeterminateKeys
  )
  const menuModelRef = computed(() => {
    const { treeNodePath, treeNode } = treeMateRef.value.getPath(
      hoverKeyRef.value
    )
    let ret
    if (treeNode === null) {
      ret = [treeMateRef.value.treeNodes]
    }
    else {
      ret = treeNodePath.map(treeNode => treeNode.siblings)
      if (
        !treeNode.isLeaf
        && !loadingKeySetRef.value.has(treeNode.key)
        && treeNode.children
      ) {
        ret.push(treeNode.children)
      }
    }
    return ret
  })

  const hoverKeyPathRef = computed(() => {
    const { keyPath } = treeMateRef.value.getPath(hoverKeyRef.value)
    return keyPath
  })

  if (isReactive(props.options)) {
    watch(props.options, (value, oldValue) => {
      if (!(value === oldValue)) {
        hoverKeyRef.value = null
        keyboardKeyRef.value = null
      }
    })
  }

  const selectedOptionsRef = computed(() => {
    if (props.multiple) {
      const {
        showPath,
        separator,
        labelField,
        cascade,
        allowCheckingNotLoaded
      } = props
      const { getCheckedKeys, getNode } = treeMateRef.value
      const value = getCheckedKeys(checkedKeysRef.value, {
        cascade,
        checkStrategy: mergedCheckStrategyRef.value,
        allowNotLoaded: allowCheckingNotLoaded
      }).checkedKeys
      return value.map((key) => {
        const node = getNode(key)
        if (node === null) {
          return {
            label: String(key),
            value: key
          }
        }
        else {
          return {
            label: showPath
              ? getPathLabel(node, separator, labelField)
              : (node.rawNode as any)[labelField],
            value: node.key
          }
        }
      })
    }
    else {
      return []
    }
  })

  const selectedOptionRef = computed(() => {
    const { multiple, showPath, separator, labelField } = props
    const { value } = mergedValueRef
    if (!multiple && !Array.isArray(value)) {
      const { getNode } = treeMateRef.value
      if (value === null) {
        return null
      }
      const node = getNode(value)
      if (node === null) {
        return {
          label: String(value),
          value
        }
      }
      else {
        return {
          label: showPath
            ? getPathLabel(node, separator, labelField)
            : (node.rawNode as any)[labelField],
          value: node.key
        }
      }
    }
    else {
      return null
    }
  })

  function updateKeyboardKey(key: Key | null): void {
    keyboardKeyRef.value = key
  }

  function updateHoverKey(key: Key | null): void {
    hoverKeyRef.value = key
  }

  function getOptionsByKeys(keys: Key[]): Array<CascaderOption | null> {
    const {
      value: { getNode }
    } = treeMateRef
    return keys.map(keys => getNode(keys)?.rawNode || null)
  }

  const showCheckboxRef = computed(() => {
    if (props.multiple && props.cascade)
      return true
    if (mergedCheckStrategyRef.value !== 'child')
      return true
    return false
  })

  function getCheckedData() {
    if (showCheckboxRef.value) {
      const checkedKeys = checkedKeysRef.value
      return {
        keys: checkedKeys,
        options: getOptionsByKeys(checkedKeys)
      }
    }
    return {
      keys: [],
      options: []
    }
  }

  function getIndeterminateData() {
    if (showCheckboxRef.value) {
      const indeterminateKeys = indeterminateKeysRef.value
      return {
        keys: indeterminateKeys,
        options: getOptionsByKeys(indeterminateKeys)
      }
    }
    return {
      keys: [],
      options: []
    }
  }

  return {
    uncontrolledValueRef,
    mergedValueRef,
    mergedCheckStrategyRef,
    keyboardKeyRef,
    hoverKeyRef,
    loadingKeySetRef,
    addLoadingKey,
    deleteLoadingKey,
    treeMateRef,
    mergedKeysRef,
    checkedKeysRef,
    indeterminateKeysRef,
    menuModelRef,
    hoverKeyPathRef,
    selectedOptionsRef,
    selectedOptionRef,
    updateKeyboardKey,
    updateHoverKey,
    getOptionsByKeys,
    showCheckboxRef,
    getCheckedData,
    getIndeterminateData
  }
}
