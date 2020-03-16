<template>
  <div v-if="mode==='debug'">
    <n-input
      v-model="pattern"
      :style="{
        marginBottom: '24px',
        marginTop: '18px'
      }"
      placeholder="Search Icons"
    />
    <div class="icons">
      <icon-wrapper
        v-for="name in displayNames"
        :key="name"
        :name="name"
      >
        <n-icon>
          <component :is="name" />
        </n-icon>
      </icon-wrapper>
    </div>
  </div>
</template>

<script>
import icons from '../../../../../src/_icons/index'
import iconWrapper from './iconWrapper'
import getScrollParent from '../../../../../src/_utils/dom/getScrollParent'
import { state } from '../../../../store'

export default {
  components: {
    iconWrapper,
    ...icons
  },
  data () {
    return {
      pattern: '',
      loadNumber: 20,
      container: null,
      state: state
    }
  },
  computed: {
    mode () {
      return this.state.mode
    },
    names () {
      const iconNames = []
      for (const key in icons) {
        iconNames.push(key)
      }
      return iconNames
    },
    filteredNames () {
      if (this.pattern.trim()) {
        const pattern = this.pattern.trim()
        return this.names.filter(name => ~(name.search(pattern)))
      } else {
        return this.names.filter(name => {
          return name
        })
      }
    },
    displayNames () {
      return this.filteredNames.slice(0, loadNumber)
    }
  },
  mounted () {
    this.container = getScrollParent(this.$el)
    this.container.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const scrollTop = this.container.scrollTop
      const clientHeight = this.container.clientHeight
      const scrollHeight = this.container.scrollHeight
      if (scrollTop + clientHeight === scrollHeight) {
        this.loadNumber += 20
      }
    }
  }
}
</script>

<style scoped>
.icons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
}
</style>
