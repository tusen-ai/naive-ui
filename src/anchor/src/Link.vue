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
import { toRef } from 'vue'
import { useMemo } from 'vooks'
import {
  useInjectionRef,
  useInjectionCollection,
  useInjectionElementCollection
} from '../../_utils/composable'

export default {
  name: 'AnchorLink',
  inject: {
    NAnchor: {
      default: null
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    href: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const activeHrefRef = useInjectionRef('NAnchor', 'activeHref')
    const hrefRef = toRef(props, 'href')
    const activeRef = useMemo(() => {
      return hrefRef.value && (hrefRef.value === activeHrefRef.value)
    })
    useInjectionCollection('NAnchor', 'collectedLinkHrefs', hrefRef)
    useInjectionElementCollection('NAnchor', 'titleEls', vm => vm.$refs.title)
    return {
      activeHref: activeHrefRef,
      active: activeRef
    }
  },
  watch: {
    active (value) {
      if (value) this.NAnchor.updateBarPosition(this.$refs.title)
    }
  },
  methods: {
    handleClick (e) {
      this.NAnchor.setActiveHref(this.href)
    }
  }
}
</script>
