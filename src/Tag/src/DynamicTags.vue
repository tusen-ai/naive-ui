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
      :theme="theme"
      :style="inputStyle"
      :size="inputSize"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <n-button
      v-else
      :theme="theme"
      :size="inputSize"
      @click="handleAddClick"
    >
      + {{ localizedAdd }}
    </n-button>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import locale from '../../_mixins/locale'
import NTag from './main'
import commonProps from './commonProps'

export default {
  name: 'NDynamicTags',
  components: {
    NTag
  },
  mixins: [withapp, themeable, locale('Tag'), asformitem({
    change: 'change',
    input: 'input'
  })],
  model: {
    name: ' value',
    event: 'change'
  },
  props: {
    ...commonProps,
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
          marginRight: '5px',
          marginBottom: '5px'
        }
      }
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {
          width: '50px'
        }
      }
    }
  },
  data () {
    return {
      inputValue: '',
      inputVisible: false
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
      this.inputValue = ''
    },
    handleAddClick () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    }
  }

}
</script>
