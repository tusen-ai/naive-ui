import type { CheckStrategy } from 'treemate'
import type { Ref } from 'vue'
import type { UseFormItem } from '../../../_mixins/use-form-item'
import type { CascaderProps } from '../Cascader'
import type {
  CascaderOption,
  Key,
  OnUpdateValueImpl,
  Value
} from '../interface'
import { createTreeMate } from 'treemate'
import { useMergedState } from 'vooks'
import { computed, isReactive, ref, watch } from 'vue'
import { call } from '../../../_utils'
import { getPathLabel, getRawNodePath } from '../utils'

export function useCascader<T = unknown>(
  props: CascaderProps,
  formItem: UseFormItem<T>
) {
  const uncontrolledValueRef = ref(props.defaultValue)
  const controlledValueRef = computed(() => props.value)
  const mergedValueRef = useMergedState(
    controlledValueRef,
    uncontrolledValueRef
  ) as Ref<Value>

  const mergedCheckStrategyRef = computed(() => {
    return props.leafOnly ? 'child' : (props.checkStrategy as CheckStrategy)
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
    return createTreeMate(props.options || [], {
      getDisabled(node) {
        return (node as any)[disabledField || 'disabled']
      },
      getKey(node) {
        return (node as any)[valueField || 'value']
      },
      getChildren(node) {
        return (node as any)[childrenField || 'children']
      }
    })
  })
  const mergedKeysRef = computed(() => {
    const { cascade, multiple } = props
    if (multiple && Array.isArray(mergedValueRef.value)) {
      return treeMateRef.value.getCheckedKeys(mergedValueRef.value, {
        cascade,
        allowNotLoaded: props.allowCheckingNotLoaded
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
    watch(
      () => props.options,
      (value, oldValue) => {
        if (!(value === oldValue)) {
          hoverKeyRef.value = null
          keyboardKeyRef.value = null
        }
      }
    )
  }
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

  const selectedOptionsRef = computed(() => {
    if (props.multiple) {
      const { showPath, separator, labelField, cascade } = props
      const { getCheckedKeys, getNode } = treeMateRef.value
      const value = getCheckedKeys(checkedKeysRef.value, {
        cascade,
        checkStrategy: mergedCheckStrategyRef.value,
        allowNotLoaded: props.allowCheckingNotLoaded
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
              ? getPathLabel(node, separator, labelField || 'label')
              : (node.rawNode as any)[labelField || 'label'],
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
            ? getPathLabel(node, separator, labelField || 'label')
            : (node.rawNode as any)[labelField || 'label'],
          value: node.key
        }
      }
    }
    else {
      return null
    }
  })

  function doUpdateValue(
    value: Value | null,
    option: CascaderOption | null | Array<CascaderOption | null>,
    optionPath: null | CascaderOption[] | Array<CascaderOption[] | null>
  ): void {
    const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props
    const { nTriggerFormInput, nTriggerFormChange } = formItem
    if (onUpdateValue) {
      call(onUpdateValue as OnUpdateValueImpl, value, option, optionPath)
    }
    if (_onUpdateValue) {
      call(_onUpdateValue as OnUpdateValueImpl, value, option, optionPath)
    }
    if (onChange) {
      call(onChange as OnUpdateValueImpl, value, option, optionPath)
    }
    uncontrolledValueRef.value = value
    nTriggerFormInput()
    nTriggerFormChange()
  }

  function doUncheck(key: Key): void {
    const { cascade, multiple } = props
    if (multiple) {
      const {
        value: { uncheck, getNode, getPath }
      } = treeMateRef
      const { checkedKeys } = uncheck(key, mergedKeysRef.value.checkedKeys, {
        cascade,
        checkStrategy: mergedCheckStrategyRef.value,
        allowNotLoaded: props.allowCheckingNotLoaded
      })
      doUpdateValue(
        checkedKeys,
        checkedKeys.map(checkedKey => getNode(checkedKey)?.rawNode || null),
        checkedKeys.map(checkedKey =>
          getRawNodePath(getPath(checkedKey)?.treeNodePath)
        )
      )
      keyboardKeyRef.value = key
      hoverKeyRef.value = key
    }
  }

  return {
    uncontrolledValueRef,
    controlledValueRef,
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
    updateKeyboardKey,
    updateHoverKey,
    getOptionsByKeys,
    selectedOptionsRef,
    selectedOptionRef,
    doUpdateValue,
    doUncheck
  }
}
