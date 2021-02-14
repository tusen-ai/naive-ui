<template>
  <n-service-layout
    ref="layoutInstRef"
    :padding-body="false"
    :items="items"
    :sider-props="siderProps"
  >
    <router-view />
  </n-service-layout>
</template>

<script>
// Frame component for components & docs page
import { computed, watch, toRef, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDocOptions, useComponentOptions } from '../store'

export default {
  setup () {
    const route = useRoute()
    const layoutInstRef = ref(null)
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const optionsRef = computed(() =>
      route.path.includes('/docs/')
        ? docOptionsRef.value
        : componentOptionsRef.value
    )
    watch(toRef(route, 'path'), (value, oldValue) => {
      const langReg = /(zh-CN)|(en-US)/
      if (value.replace(langReg, '') !== oldValue.replace(langReg, '')) {
        layoutInstRef.value.scrollTo(0, 0)
      }
    })
    return {
      layoutInstRef,
      items: optionsRef,
      siderProps: {
        style: {
          height: '100%'
        }
      }
    }
  }
}
</script>
