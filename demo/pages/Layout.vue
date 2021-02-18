<template>
  <n-service-layout
    ref="layoutInstRef"
    :padding-body="false"
    :items="options"
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
      const langAndThemeReg = /\/(zh-CN|en-US)\/(light|dark|os-theme)/g
      // only theme & lang change do not restore the scroll status
      if (
        value.replace(langAndThemeReg, '') !==
        oldValue.replace(langAndThemeReg, '')
      ) {
        layoutInstRef.value.scrollTo(0, 0)
      }
    })
    return {
      layoutInstRef,
      options: optionsRef,
      siderProps: {
        style: {
          height: '100%'
        }
      }
    }
  }
}
</script>
