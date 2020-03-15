<template>
  <div>
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
        v-for="name in filteredNames.slice(0, loadNumber)"
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
import icons from '../../../../../lib/iconNames'
import iconWrapper from './iconWrapper'
import getScrollParent from '../../../../../lib/_utils/dom/getScrollParent'

function toHump (name) {
  return name.replace(/-([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
const components = {}
components.iconWrapper = iconWrapper
let names = []
icons.iconNames.forEach(name => {
  const fileName = name.match(/.*(?=.vue)/g)[0]
  const moduleName = toHump(fileName)
  names.push(fileName)
  components[moduleName] = () => import('naive-ui/lib/icons/' + fileName)
})

export default {
  components: components,
  data () {
    return {
      pattern: '',
      names: names,
      loadNumber: 20,
      container: null
    }
  },
  computed: {
    filteredNames () {
      if (this.pattern.trim()) {
        const pattern = this.pattern.trim()
        return this.names.filter(name => ~(name.search(pattern)))
      } else {
        return this.names.filter(name => {
          return name
        })
      }
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
