<template>
  <transition
    name="n-fade-up-width-expand"
    appear
  >
    <span
      class="n-scroll-number"
      :style="{
        maxWidth: styleMaxWidth
      }"
    >
      <span
        v-if="oldNumber !== null"
        class="n-scroll-number__old-number n-scroll-number__old-number--top"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
      <span
        ref="numberWrapper"
        class="n-scroll-number__new-number"
        :class="newNumberScrollAnimationClass"
      >{{ newNumber }}</span>
      <span
        v-if="oldNumber !== null"
        class="n-scroll-number__old-number n-scroll-number__old-number--bottom"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
    </span>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    oldOriginalNumber: {
      type: Number,
      default: null
    },
    newOriginalNumber: {
      type: Number,
      default: null
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
      return this.active ? `n-scroll-number__new-number--${this.scrollAnimationDirection}-scroll` : null
    },
    oldNumberScrollAnimationClass () {
      return this.active ? `n-scroll-number__old-number--${this.scrollAnimationDirection}-scroll` : null
    },
    styleMaxWidth () {
      return this.maxWidth ? `${this.maxWidth + 1}px` : null
    }
  },
  watch: {
    value (value, oldValue) {
      this.oldNumber = oldValue
      this.newNumber = value
      this.$nextTick().then(this.scroll)
    }
  },
  mounted () {
    this.maxWidth = this.$refs.numberWrapper.offsetWidth
  },
  beforeDestroy () {
    this.scrollDown()
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
      this.$nextTick().then(() => {
        this.$el.getBoundingClientRect()
        this.active = true
      })
    },
    scrollDown (sync) {
      this.scrollAnimationDirection = 'down'
      this.active = false
      this.$nextTick().then(() => {
        this.$el.getBoundingClientRect()
        this.active = true
      })
    }
  }
}
</script>
