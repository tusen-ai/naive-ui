<template>
  <div class="n-dynamic-tags">
    <n-tag
      v-for="(tag, index) in value"
      :key="index"
      :theme="theme"
      :style="tagStyle"
      :type="type"
      :round="round"
      :size="size"
      :closable="closable"
      :disabled="disabled"
      @close="handleCloseClick(index)"
    >
      {{ tag }}
    </n-tag>
    <n-input
      v-if="inputVisible"
      ref="tagInput"
      v-model:value="inputValue"
      :force-focus="inputForceFocused"
      :theme="theme"
      :style="inputStyle"
      :size="inputSize"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputBlur"
    />
    <n-button
      v-else
      :theme="theme"
      :size="inputSize"
      @click="handleAddClick"
    >
      <template v-slot:icon>
        <n-icon>
          <add-icon />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script>
import NTag from '../../tag'
import NIcon from '../../icon'
import AddIcon from '../../_icons/add-outline'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import locale from '../../_mixins/locale'
import usecssr from '../../_mixins/usecssr'
import commonProps from '../../tag/src/common-props'
import styles from './styles'
import { call } from '../../_utils/vue'
import { warn } from '../../_utils/naive'

export default {
  name: 'DynamicTags',
  components: {
    NTag,
    NIcon,
    AddIcon
  },
  mixins: [
    withapp,
    themeable,
    locale('Tag'),
    asformitem({
      change: 'change'
    }),
    usecssr(styles)
  ],
  props: {
    ...commonProps,
    closable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    tagStyle: {
      type: Object,
      default: () => {
        return {
          marginRight: '6px'
        }
      }
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {
          width: '64px'
        }
      }
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) warn('dynamic-tags', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  data () {
    return {
      inputValue: '',
      inputVisible: false,
      inputForceFocused: true
    }
  },
  computed: {
    localizedAdd () {
      return this.localeNamespace.add
    },
    inputSize () {
      const sizes = ['small', 'medium', 'large']
      const tagSizeIndex = sizes.findIndex(size => size === this.size)
      const inputSizeIndex = (tagSizeIndex - 1) > 0 ? tagSizeIndex - 1 : 0
      return sizes[inputSizeIndex]
    }
  },
  methods: {
    doChange (value) {
      const {
        onChange,
        'onUpdate:value': onUpdateValue,
        __triggerFormInput,
        __triggerFormChange
      } = this
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      __triggerFormInput()
      __triggerFormChange()
    },
    handleCloseClick (index) {
      const tags = this.value.slice(0)
      tags.splice(index, 1)
      this.doChange(tags)
    },
    handleInputConfirm () {
      if (this.inputValue) {
        const tags = this.value.slice(0)
        tags.push(this.inputValue)
        this.doChange(tags)
      }
      this.inputVisible = false
      this.inputForceFocused = true
      this.inputValue = ''
    },
    handleInputBlur () {
      this.handleInputConfirm()
    },
    handleAddClick () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
        this.inputForceFocused = false
      })
    }
  }
}
</script>
