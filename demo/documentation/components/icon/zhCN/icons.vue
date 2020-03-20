<template>
  <div v-if="mode==='debug'">
    <n-input
      v-model="pattern"
      :style="{
        marginBottom: '24px',
        marginTop: '18px'
      }"
      placeholder="查询图标"
    />
    <div class="icons">
      <icon-wrapper
        v-for="name in filteredNames"
        :key="name"
        :name="name"
      >
        <n-icon depth="tertiary">
          <component :is="name" />
        </n-icon>
      </icon-wrapper>
    </div>
  </div>
</template>

<script>
import icons from '../../../../../src/_icons/index'
import iconWrapper from './iconWrapper'
import { state } from '../../../../store'

const prefixedIcons = Object.entries(icons).reduce((prevValue, [key, value]) => {
  prevValue['icon-' + key] = value
  return prevValue
}, {})

export default {
  components: {
    iconWrapper,
    ...prefixedIcons
  },
  data () {
    return {
      pattern: '',
      state: state
    }
  },
  computed: {
    mode () {
      return this.state.mode
    },
    names () {
      return Object.keys(prefixedIcons)
    },
    filteredNames () {
      if (this.pattern.trim()) {
        const pattern = this.pattern.trim()
        return this.names.filter(name => ~(name.search(pattern)))
      } else {
        return this.names
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
