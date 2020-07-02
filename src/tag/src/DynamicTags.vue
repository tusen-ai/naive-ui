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
      v-model="inputValue"
      :force-focus="inputForceFocused"
      :theme="theme"
      :style="inputStyle"
      :size="inputSize"
      @keyup.enter.native="handleInputConfirm"
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
          <add-outline />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import locale from '../../_mixins/locale'
import NTag from './Tag'
import commonProps from './commonProps'
import NIcon from '../../Icon'
import addOutline from '../../_icons/add-outline'

export default {
  name: 'NDynamicTags',
  components: {
    NTag,
    NIcon,
    addOutline
  },
  mixins: [
    withapp,
    themeable,
    locale('Tag'),
    asformitem({
      change: 'change'
    })
  ],
  model: {
    name: 'value',
    event: 'change'
  },
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
    handleCloseClick (index) {
      const tags = this.value.slice(0)
      tags.splice(index, 1)
      this.$emit('change', tags)
    },
    handleInputConfirm () {
      if (this.inputValue) {
        const tags = this.value.slice(0)
        tags.push(this.inputValue)
        this.$emit('change', tags)
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
