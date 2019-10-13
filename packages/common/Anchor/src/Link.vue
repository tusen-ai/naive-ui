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
import registerable from '../../../mixins/registerable'

export default {
  name: 'NAnchorLink',
  inject: {
    NAnchor: {
      default: null
    }
  },
  mixins: [registerable('NAnchor', 'collectedLinkHrefs', 'href')],
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
    active () {
      return this.href && this.NAnchor.activeHref === this.href
    }
  },
  watch: {
    active: function (value) {
      if (value) this.NAnchor.updateBarPosition(this.$refs.title)
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault()
      this.NAnchor.setActiveHref(this.href)
    }
  }
}
</script>
