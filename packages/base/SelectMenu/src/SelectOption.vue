<template>
  <div
    class="n-base-select-option"
    :class="{
      'n-base-select-option--selected':
        isSelected,
      'n-base-select-option--disabled':
        disabled
    }"
    :data-id="optionId"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else-if="label">
      {{ label }}
    </template>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'NBaseSelectOption',
  inject: {
    NBaseSelectMenu: {
      default: null
    },
    NBaseSelectOptionCollector: {
      default: null
    }
  },
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      validator () {
        return true
      },
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSelected () {
      return this.processedOption && this.NBaseSelectMenu.isSelected(this.processedOption)
    },
    value2Id () {
      if (this.NBaseSelectMenu) {
        return this.NBaseSelectMenu.value2Id
      } return null
    },
    id2Option () {
      if (this.NBaseSelectMenu) {
        return this.NBaseSelectMenu.id2Option
      } return null
    },
    optionId () {
      if (this.value2Id === null) return null
      return this.value2Id.get(this.value)
    },
    processedOption () {
      if (this.id2Option === null) return null
      return this.id2Option.get(this.optionId)
    }
  },
  watch: {
    option () {
      this.$nextTick().then(() => {
        this.NBaseSelectOptionCollector.collectOptions()
      })
    }
  },
  mounted () {
    if (this.NBaseSelectOptionCollector) {
      this.NBaseSelectOptionCollector.collectOptions()
    }
  },
  beforeDestroy () {
    this.$nextTick().then(() => {
      if (this.NBaseSelectOptionCollector) {
        this.NBaseSelectOptionCollector.collectOptions()
      }
    })
  },
  methods: {
    handleClick (e) {
      this.NBaseSelectMenu.handleOptionClick(e, this.processedOption)
      this.$emit('click', e)
    },
    handleMouseEnter (e) {
      this.NBaseSelectMenu.handleOptionMouseEnter(e, this.processedOption)
      this.$emit('mouseenter', e)
    }
  }
}
</script>
