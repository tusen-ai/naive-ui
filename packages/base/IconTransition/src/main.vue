<script>
export default {
  name: 'NBaseIconTransition',
  data () {
    return {
      appear: false
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.appear = true
    })
  },
  render (h) {
    return h('transition', {
      props: {
        name: 'n-icon-transition',
        appear: this.appear
      }
    }, this.$slots.default)
  }
}
</script>

<style>
.n-icon-transition-enter, .n-icon-transition-leave-to {
  transform: scale(.75)!important;
  opacity: 0;
}
.n-icon-transition-enter-to, .n-icon-transition-leave {
  transform: scale(0.9999);
  opacity: 1;
}
.n-icon-transition-leave-active, .n-icon-transition-enter-active {
  transform-origin: center;
  position: absolute;
  left: 0;
  top: 0;
  transition:
    all .3s cubic-bezier(.4, 0, .2, 1) !important;
}
</style>
