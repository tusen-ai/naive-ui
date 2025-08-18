import type { CheckStrategy } from 'treemate'
import type { Ref } from 'vue'
import type { CascaderProps } from '../Cascader'
import type {
  CascaderMenuInstance,
  CascaderOption,
  Key,
  OnUpdateValueImpl,
  Value
} from '../interface'
import { changeColor, depx } from 'seemly'
import { createTreeMate, SubtreeNotLoadedError } from 'treemate'
import { useMergedState } from 'vooks'
import { computed, isReactive, ref, watch } from 'vue'
import {
  useConfig,
  useFormItem,
  useLocale,
  useTheme,
  useThemeClass
} from '../../../_mixins'
import { call } from '../../../_utils'
import { cascaderLight } from '../../styles'
import style from '../styles/index.cssr'
import { getPathLabel, getRawNodePath } from '../utils'

export function useCascader(props: CascaderProps) {
  const {
    mergedBorderedRef,
    mergedClsPrefixRef,
    namespaceRef,
    inlineThemeDisabled
  } = useConfig(props)

  const formItem = useFormItem(props)

  const { localeRef } = useLocale('Cascader')

  const themeRef = useTheme(
    'Cascader',
    '-cascader',
    style,
    cascaderLight,
    props,
    mergedClsPrefixRef
  )

  const optionHeightRef = computed(() => {
    return themeRef.value.self.optionHeight
  })

  const uncontrolledValueRef = ref(props.defaultValue)
  const controlledValueRef = computed(() => props.value)
  const mergedValueRef = useMergedState(
    controlledValueRef,
    uncontrolledValueRef
  ) as Ref<Value>

  const mergedCheckStrategyRef = computed(() => {
    return props.leafOnly ? 'child' : (props.checkStrategy as CheckStrategy)
  })

  const cascaderMenuInstRef = ref<CascaderMenuInstance | null>(null)

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

  const showCheckboxRef = computed(() => {
    if (props.multiple && props.cascade)
      return true
    if (mergedCheckStrategyRef.value !== 'child')
      return true
    return false
  })

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

  function doCheck(key: Key, focusSelectionInput?: () => void): boolean {
    const { cascade, multiple, filterable } = props
    const {
      value: { check, getNode, getPath }
    } = treeMateRef
    if (multiple) {
      try {
        const { checkedKeys } = check(key, mergedKeysRef.value.checkedKeys, {
          cascade,
          checkStrategy: mergedCheckStrategyRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        })
        doUpdateValue(
          checkedKeys,
          getOptionsByKeys(checkedKeys),
          checkedKeys.map(checkedKey =>
            getRawNodePath(getPath(checkedKey)?.treeNodePath)
          )
        )
        if (filterable && focusSelectionInput)
          focusSelectionInput()
        keyboardKeyRef.value = key
        hoverKeyRef.value = key
      }
      catch (err) {
        if (err instanceof SubtreeNotLoadedError) {
          if (cascaderMenuInstRef.value) {
            const tmNode = getNode(key)
            if (tmNode !== null) {
              cascaderMenuInstRef.value.showErrorMessage(
                (tmNode.rawNode as any)[props.labelField || 'label'] as string
              )
            }
          }
        }
        else {
          throw err
        }
      }
    }
    else {
      if (mergedCheckStrategyRef.value === 'child') {
        const tmNode = getNode(key)
        if (tmNode?.isLeaf) {
          doUpdateValue(
            key,
            tmNode.rawNode,
            getRawNodePath(getPath(key).treeNodePath)
          )
        }
        else {
          return false
        }
      }
      else {
        const tmNode = getNode(key)
        doUpdateValue(
          key,
          tmNode?.rawNode || null,
          getRawNodePath(getPath(key)?.treeNodePath)
        )
      }
    }
    return true
  }

  function move(direction: 'prev' | 'next' | 'child' | 'parent'): void {
    const { value: keyboardKey } = keyboardKeyRef
    const { value: treeMate } = treeMateRef
    switch (direction) {
      case 'prev':
        if (keyboardKey !== null) {
          const node = treeMate.getPrev(keyboardKey, { loop: true })
          if (node !== null) {
            updateKeyboardKey(node.key)
            updateHoverKey(node.key)
            cascaderMenuInstRef.value?.scroll(
              node.level,
              node.index,
              depx(optionHeightRef.value)
            )
          }
        }
        break
      case 'next':
        if (keyboardKey === null) {
          const node = treeMate.getFirstAvailableNode()
          if (node !== null) {
            updateKeyboardKey(node.key)
            updateHoverKey(node.key)
            cascaderMenuInstRef.value?.scroll(
              node.level,
              node.index,
              depx(optionHeightRef.value)
            )
          }
        }
        else {
          const node = treeMate.getNext(keyboardKey, { loop: true })
          if (node !== null) {
            updateKeyboardKey(node.key)
            updateHoverKey(node.key)
            cascaderMenuInstRef.value?.scroll(
              node.level,
              node.index,
              depx(optionHeightRef.value)
            )
          }
        }
        break
      case 'child':
        if (keyboardKey !== null) {
          const currentNode = treeMate.getNode(keyboardKey)
          if (currentNode !== null) {
            if (currentNode.shallowLoaded) {
              const node = treeMate.getChild(keyboardKey)
              if (node !== null) {
                updateHoverKey(node.key)
                updateKeyboardKey(node.key)
              }
            }
            else {
              const { value: loadingKeySet } = loadingKeySetRef
              if (!loadingKeySet.has(keyboardKey)) {
                addLoadingKey(keyboardKey)
                updateHoverKey(keyboardKey)
                const { onLoad } = props
                if (onLoad) {
                  onLoad(currentNode.rawNode)
                    .then(() => {
                      deleteLoadingKey(keyboardKey)
                    })
                    .catch(() => {
                      deleteLoadingKey(keyboardKey)
                    })
                }
              }
            }
          }
        }
        break
      case 'parent':
        if (keyboardKey !== null) {
          const node = treeMate.getParent(keyboardKey)
          if (node !== null) {
            updateHoverKey(node.key)
            updateKeyboardKey(node.key)
          }
        }
        break
    }
  }

  const cssVarsRef = computed(() => {
    const {
      self: {
        optionArrowColor,
        optionTextColor,
        optionTextColorActive,
        optionTextColorDisabled,
        optionCheckMarkColor,
        menuColor,
        menuBoxShadow,
        menuDividerColor,
        menuBorderRadius,
        menuHeight,
        optionColorHover,
        optionHeight,
        optionFontSize,
        loadingColor,
        columnWidth
      },
      common: { cubicBezierEaseInOut }
    } = themeRef.value
    return {
      '--n-bezier': cubicBezierEaseInOut,
      '--n-menu-border-radius': menuBorderRadius,
      '--n-menu-box-shadow': menuBoxShadow,
      '--n-menu-height': menuHeight,
      '--n-column-width': columnWidth,
      '--n-menu-color': menuColor,
      '--n-menu-divider-color': menuDividerColor,
      '--n-option-height': optionHeight,
      '--n-option-font-size': optionFontSize,
      '--n-option-text-color': optionTextColor,
      '--n-option-text-color-disabled': optionTextColorDisabled,
      '--n-option-text-color-active': optionTextColorActive,
      '--n-option-color-hover': optionColorHover,
      '--n-option-check-mark-color': optionCheckMarkColor,
      '--n-option-arrow-color': optionArrowColor,
      '--n-menu-mask-color': changeColor(menuColor, { alpha: 0.75 }),
      '--n-loading-color': loadingColor
    }
  })
  const themeClassHandle = inlineThemeDisabled
    ? useThemeClass('cascader', undefined, cssVarsRef, props)
    : undefined

  return {
    mergedBorderedRef,
    mergedClsPrefixRef,
    namespaceRef,
    inlineThemeDisabled,
    themeRef,
    formItem,
    localeRef,
    optionHeightRef,
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
    showCheckboxRef,
    selectedOptionsRef,
    selectedOptionRef,
    doUpdateValue,
    cascaderMenuInstRef,
    doUncheck,
    doCheck,
    move,
    cssVarsRef,
    themeClassHandle
  }
}
