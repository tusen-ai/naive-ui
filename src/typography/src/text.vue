<template>
  <code
    v-if="code"
    class="n-text"
    :class="{
      'n-text--code': code,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--underline': underline
    }"
    :style="cssVars"
  ><template v-if="!$props.delete"><slot /></template><del v-else><slot /></del></code>
  <del
    v-else-if="$props.delete"
    class="n-text"
    :class="{
      'n-text--code': code,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--underline': underline
    }"
    :style="cssVars"
  ><slot /></del>
  <component
    :is="compitableTag || 'span'"
    v-else
    class="n-text"
    :class="{
      'n-text--code': code,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--underline': underline
    }"
    :style="cssVars"
  >
    <slot />
  </component>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useCompitable } from 'vooks'
import { useTheme } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import { typographyLight } from '../styles'
import style from './styles/text.cssr.js'

export default defineComponent({
  name: 'Text',
  props: {
    ...useTheme.props,
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
        if (__DEV__) {
          warn('text', '`as` is deprecated, please use `tag` instead.')
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Typography',
      'Text',
      style,
      typographyLight,
      props
    )
    return {
      compitableTag: useCompitable(props, ['as', 'tag']),
      cssVars: computed(() => {
        const { depth, type } = props
        const textColorKey =
          type === 'default'
            ? depth === undefined
              ? 'textColor'
              : `textColor${depth}Depth`
            : createKey('textColor', type)
        const {
          common: { fontWeightStrong, fontFamilyMono },
          self: {
            codeTextColor,
            codeBorderRadius,
            codeColor,
            codeBorder,
            [textColorKey]: textColor
          }
        } = themeRef.value
        return {
          '--text-color': textColor,
          '--font-weight-strong': fontWeightStrong,
          '--font-famliy-mono': fontFamilyMono,
          '--code-border-radius': codeBorderRadius,
          '--code-text-color': codeTextColor,
          '--code-color': codeColor,
          '--code-border': codeBorder
        }
      })
    }
  }
})
</script>
