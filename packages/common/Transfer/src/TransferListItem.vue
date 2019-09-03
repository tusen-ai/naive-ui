<template>
  <li
    class="n-transfer-list-item"
    @click="handleClick"
  >
    <div class="n-transfer-list-item__checkbox">
      <n-checkbox
        :value="checked"
        @input="handleInput"
      />
    </div>
    <slot />
  </li>
</template>

<script>
import NCheckbox from '../../Checkbox'

export default {
  name: 'NTransferListItem',
  components: {
    NCheckbox
  },
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    value: {
      validator () {
        return true
      },
      required: true
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    transitionName () {
      return this.source ? 'n-transfer-list-item-source--transition' : 'n-transfer-list-item-target--transition'
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    handleInput (checked) {
      this.$emit('input', checked, this.value)
    }
  }
}
</script>
