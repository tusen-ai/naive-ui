<template>
  <div
    class="n-anchor-link"
  >
    <a
      ref="title"
      class="n-anchor-link__title"
      :class="{
        'n-anchor-link__title--active': active
      }"
      :href="href"
      @click="handleClick"
    >
      {{ title }}
    </a>
    <slot />
  </div>
</template>

<script>
import collectable from '../../_mixins/collectable'
import simlulatedComputed from '../../_mixins/simulatedComputed'

export default {
  name: 'NAnchorLink',
  inject: {
    NAnchor: {
      default: null
    }
  },
  mixins: [
    simlulatedComputed({
      active: {
        get () {
          const href = this.href
          return href && (this.activeHref === href)
        },
        deps: ['activeHref', 'href'],
        default: false
      }
    }),
    collectable('NAnchor', 'collectedLinkHrefs', 'href')
  ],
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: null
    }
  },
  computed: {
    activeHref () {
      return this.NAnchor.activeHref
    }
  },
  watch: {
    active (value) {
      if (value) this.NAnchor.updateBarPosition(this.$refs.title)
    }
  },
  mounted () {
    this.NAnchor.titleEls.push(this.$refs.title)
  },
  beforeDestroy () {
    const titleElIndex = this.NAnchor.titleEls.findIndex(el => el === this.$refs.title)
    if (~titleElIndex) this.NAnchor.titleEls.splice(titleElIndex, 1)
  },
  methods: {
    handleFontReady () {
      if (this.active) {
        this.NAnchor.updateBarPosition(this.$refs.title, false)
      }
    },
    handleClick (e) {
      this.NAnchor.setActiveHref(this.href)
    }
  }
}
</script>
