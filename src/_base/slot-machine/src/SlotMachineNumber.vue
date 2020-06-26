<template>
  <transition
    :name="isNotNumber ? 'n-fade-in-width-expand-transition' : 'n-fade-up-width-expand-transition'"
    :appear="appeared"
  >
    <span
      ref="numbers"
      class="n-scroll-number"
      :style="{
        maxWidth: styleMaxWidth,
        width: styleMaxWidth
      }"
    >
      <span
        v-if="oldNumber !== null"
        class="n-scroll-number-old-number n-scroll-number-old-number--top"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
      <span
        class="n-scroll-number-current-number"
        :class="newNumberScrollAnimationClass"
      >
        <span
          ref="numberWrapper"
          class="n-scroll-number-current-number__inner"
          :class="{
            'n-scroll-number-current-number__inner--not-number':
              isNotNumber
          }"
        >{{ newNumber }}</span>
      </span>
      <span
        v-if="oldNumber !== null"
        class="n-scroll-number-old-number n-scroll-number-old-number--bottom"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
    </span>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    oldOriginalNumber: {
      type: Number,
      default: null
    },
    newOriginalNumber: {
      type: Number,
      default: null
    },
    appeared: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      oldNumber: null,
      newNumber: null,
      maxWidth: null,
      scrollAnimationDirection: null,
      active: false
    }
  },
  computed: {
    newNumberScrollAnimationClass () {
      return this.active ? `n-scroll-number-current-number--${this.scrollAnimationDirection}-scroll` : null
    },
    oldNumberScrollAnimationClass () {
      return this.active ? `n-scroll-number-old-number--${this.scrollAnimationDirection}-scroll` : null
    },
    styleMaxWidth () {
      return this.maxWidth ? `${this.maxWidth}px` : null
    },
    isNotNumber () {
      return !(typeof this.value === 'number')
    }
  },
  watch: {
    value (value, oldValue) {
      this.oldNumber = oldValue
      this.newNumber = value
      this.$nextTick(this.scroll)
    }
  },
  mounted () {
    this.maxWidth = this.$refs.numberWrapper.offsetWidth
  },
  updated () {
    this.maxWidth = this.$refs.numberWrapper.offsetWidth
  },
  created () {
    this.newNumber = this.value
  },
  methods: {
    scroll () {
      const newOriginalNumber = this.newOriginalNumber
      const oldOriginalNumber = this.oldOriginalNumber
      if (oldOriginalNumber === null && newOriginalNumber === null) return
      if (oldOriginalNumber === null || newOriginalNumber > oldOriginalNumber) {
        this.scrollUp()
      } else if (oldOriginalNumber > newOriginalNumber) {
        this.scrollDown()
      }
    },
    scrollUp () {
      this.scrollAnimationDirection = 'up'
      this.active = false
      this.$nextTick(() => {
        this.$el.getBoundingClientRect()
        this.active = true
      })
    },
    scrollDown () {
      this.scrollAnimationDirection = 'down'
      this.active = false
      this.$nextTick(() => {
        this.$el.getBoundingClientRect()
        this.active = true
      })
    }
  }
}
</script>
