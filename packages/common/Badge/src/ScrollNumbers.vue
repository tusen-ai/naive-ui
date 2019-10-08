<template>
  <span
    v-if="valueIsNumber"
    class="n-scroll-numbers"
  >
    <scroll-number
      v-for="(number, i) in numbers"
      :key="numbers.length - i - 1"
      :old-original-number="oldValue"
      :new-original-number="newValue"
      :value="number"
    />
  </span>
  <span
    v-else
    class="n-scroll-numbers"
  >
    {{ value }}
  </span>
</template>

<script>
import ScrollNumber from './ScrollNumber'

export default {
  components: {
    ScrollNumber
  },
  props: {
    value: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      oldValue: null,
      newValue: null
    }
  },
  computed: {
    valueIsString () {
      return typeof this.value === 'string'
    },
    valueIsNumber () {
      return typeof this.value === 'number'
    },
    numbers () {
      if (this.value < 1) return [0]
      const numbers = []
      let value = this.value
      while (value >= 1) {
        numbers.push(value % 10)
        value /= 10
        value = Math.floor(value)
      }
      numbers.reverse()
      return numbers
    }
  },
  watch: {
    value (value, oldValue) {
      this.newValue = value
      this.oldValue = oldValue
    }
  },
  created () {
    this.newValue = this.value
  }
}
</script>
