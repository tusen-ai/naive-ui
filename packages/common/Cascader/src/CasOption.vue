<template>
  <div
    class="n-cascader-menu__item"
    :class="{
      'n-cascader-menu__item--active': active && hasChildren,
      'n-cascader-menu__item--traced': traced,
      'n-cascader-menu__item--disabled': disabled,
      'n-cascader-menu__item--has-children': hasChildren
    }"
    :data-id="id"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'NCascaderOption',
  props: {
    id: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      validator: () => true,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    traced: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    children: {
      type: Array,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    prevSibling: {
      type: Object,
      default: null
    },
    nextSibling: {
      type: Object,
      default: null
    },
    parent: {
      type: Object,
      default: null
    },
    depth: {
      type: Number,
      required: true
    }
  },
  computed: {
    hasChildren () {
      return this.children && this.children.length
    },
    option () {
      return {
        id: this.id,
        label: this.label,
        value: this.value,
        active: this.active,
        traced: this.traced,
        disabled: this.disabled,
        children: this.children,
        prevSibling: this.prevSibling,
        nextSibling: this.nextSibling,
        parent: this.parent
      }
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e, this.option)
    },
    handleMouseEnter (e) {
      this.$emit('mouseenter', e, this.option)
    },
    handleMouseLeave (e) {
      this.$emit('mouseleave', e, this.option)
    }
  }
}
</script>
