<template>
  <code
    v-if="code"
    class="n-text"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
    v-on="$listeners"
  ><template v-if="!$props.delete"><slot /></template><del v-else><slot /></del></code>
  <del
    v-else-if="$props.delete"
    class="n-text"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
    v-on="$listeners"
  ><slot /></del>
  <span
    v-else
    class="n-text"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-text--code': code,
      [`n-text--${type}-type`]: type,
      'n-text--delete': $props.delete,
      'n-text--strong': strong,
      'n-text--italic': italic,
      'n-text--disabled': disabled,
      'n-text--underline': underline,
      [`n-text--${depth}-depth`]: depth
    }"
  ><slot /></span>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NText',
  mixins: [withapp, themeable],
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
        return ['primary', 'secondary', 'tertiary'].includes(value)
      },
      default: null
    }
  }
}
</script>
