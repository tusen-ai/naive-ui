<template>
  <div class="n-dynamic-tags">
    <n-tag
      v-for="(tag, index) in value"
      :key="tag + index"
      :style="{marginRight: spacing + 'px' }"
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
      style="width:50px;"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <n-button
      v-else
      size="small"
      @click="handleClickAdd"
    >
      + Add
    </n-button>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NTag from './main'
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NDynamicTags',
  components: {
    NTag
  },
  mixins: [withapp, themeable, asformitem({
    change: 'change',
    input: 'input'
  })],
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      validator (value) {
        return ['default', 'success', 'info', 'warning', 'error'].includes(value)
      },
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    closable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    spacing: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      inputValue: '',
      inputVisible: false
    }
  },
  watch: {
    value (tags) {
      this.$emit('change', tags)
    }
  },
  methods: {
    handleCloseClick (index) {
      const tags = this.value.slice(0)
      tags.splice(index, 1)
      this.$emit('input', tags)
    },
    handleInputConfirm () {
      if (this.inputValue) {
        const tags = this.value.slice(0)
        tags.push(this.inputValue)
        this.$emit('input', tags)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClickAdd () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.tagInput.$refs.input.focus()
      })
    }
  }

}
</script>
