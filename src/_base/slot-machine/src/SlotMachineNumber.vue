<template>
  <transition
    :name="isNotNumber ? 'n-fade-in-width-expand-transition' : 'n-fade-up-width-expand-transition'"
    :appear="appeared"
    @leave="handleLeave"
  >
    <span
      ref="numbers"
      class="n-base-slot-machine-number"
      :style="{
        maxWidth: styleMaxWidth,
        width: styleMaxWidth
      }"
    >
      <span
        v-if="oldNumber !== null"
        class="n-base-slot-machine-old-number n-base-slot-machine-old-number--top"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
      <span
        class="n-base-slot-machine-current-number"
        :class="newNumberScrollAnimationClass"
      >
        <span
          ref="numberWrapper"
          class="n-base-slot-machine-current-number__inner"
          :class="{
            'n-base-slot-machine-current-number__inner--not-number':
              isNotNumber
          }"
        >{{ newNumber }}</span>
      </span>
      <span
        v-if="oldNumber !== null"
        class="n-base-slot-machine-old-number n-base-slot-machine-old-number--bottom"
        :class="oldNumberScrollAnimationClass"
      >{{ oldNumber }}</span>
    </span>
  </transition>
</template>

<script>
export default {
  name: 'SlotMachindNumber',
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
      return this.active ? `n-base-slot-machine-current-number--${this.scrollAnimationDirection}-scroll` : null
    },
    oldNumberScrollAnimationClass () {
      return this.active ? `n-base-slot-machine-old-number--${this.scrollAnimationDirection}-scroll` : null
    },
    styleMaxWidth () {
      return this.maxWidth !== null ? `${this.maxWidth}px` : null
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
    if (this.appeared) {
      this.maxWidth = 0
      this.$nextTick(() => {
        void this.$el.offsetWidth
        this.maxWidth = this.$refs.numberWrapper.offsetWidth
      })
    } else {
      this.maxWidth = this.$refs.numberWrapper.offsetWidth
    }
  },
  created () {
    this.newNumber = this.value
  },
  methods: {
    handleLeave () {
      if (this.isNotNumber) {
        this.$el.style.maxWidth = 0
      }
    },
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
        void this.$el.offsetWidth
        this.active = true
      })
    },
    scrollDown () {
      this.scrollAnimationDirection = 'down'
      this.active = false
      this.$nextTick(() => {
        void this.$el.offsetWidth
        this.active = true
      })
    }
  }
}
</script>
