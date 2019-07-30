<template>
  <div
    ref="scrollContainer"
    class="n-scrollbar"
    @scroll="handleScroll"
  >
    <div ref="scrollContent">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NScrollbar',
  data () {
    return {
      width: null,
      height: null,
      scrollLeft: null,
      scrollTop: null
    }
  },
  computed: {
    scrollbarHeight () {

    }
  },
  mounted () {
    this.$el.parentElement.style.position = 'relative'
    this.$el.parentElement.style.overflow = 'hidden'
    this.$el.parentElement.classList.add('n-scrollbar-wrapper')

    const containerRect = this.$refs.scrollContainer.getBoundingClientRect()
    const contentRect = this.$refs.scrollContent.getBoundingClientRect()
  },
  methods: {
    handleScroll () {
      console.log(this.$refs.scrollContainer.scrollTop)
      console.log('scroll')
    }
  }
}
</script>

<style lang="scss" scoped>
.n-scrollbar-wrapper {

}

.n-scrollbar {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
