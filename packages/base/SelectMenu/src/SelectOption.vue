<template>
  <div
    class="n-base-select-menu__item"
    :class="{
      'n-base-select-menu__item--selected':
        isSelected,
      'n-base-select-menu__item--disabled':
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
      default: undefined
    },
    index: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
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
    index2Id () {
      if (this.NBaseSelectMenu) {
        return this.NBaseSelectMenu.index2Id
      } return null
    },
    id2Option () {
      if (this.NBaseSelectMenu) {
        return this.NBaseSelectMenu.id2Option
      } return null
    },
    optionId () {
      if (this.index2Id === null) return null
      return this.index2Id.get(this.index)
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
    console.log('select option mounted')
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
