<template>
  <code
    v-if="code"
    class="n-text"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
    v-bind="$attrs"
  ><template v-if="!$props.delete"><slot /></template><del v-else><slot /></del></code>
  <del
    v-else-if="$props.delete"
    class="n-text"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
    v-bind="$attrs"
  ><slot /></del>
  <component
    :is="compitableTag || 'span'"
    v-else
    class="n-text"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script>
import { configurable, themeable, withCssr } from '../../_mixins'
import { warn } from '../../_utils'
import { useCompitable } from 'vooks'
import styles from './styles/text'

export default {
  name: 'Text',
  cssrName: 'Typography',
  cssrId: 'TypographyText',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    code: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    delete: {
      type: Boolean,
      default: false
    },
    strong: {
      type: Boolean,
      default: false
    },
    italic: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    depth: {
      validator (value) {
        return [1, 2, 3, '1', '2', '3'].includes(value)
      },
      default: undefined
    },
    tag: {
      type: String,
      default: undefined
    },
    // deprecated
    as: {
      validator () {
        if (__DEV__) { warn('text', '`as` is deprecated, please use `tag` instead.') }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return {
      compitableTag: useCompitable(props, ['as', 'tag'])
    }
  }
}
</script>
