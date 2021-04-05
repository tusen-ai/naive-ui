<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider
      :native-scrollbar="false"
      bordered
      show-trigger="bar"
      v-if="showSider"
    >
      <n-menu
        :value="menuValue"
        :options="options"
        @update:value="handleMenuUpdateValue"
      />
    </n-layout-sider>
    <n-layout ref="layoutInstRef" :native-scrollbar="false">
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
// Frame component for components & docs page
import { computed, watch, toRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocOptions, useComponentOptions } from '../store'
import { useBreakpoint, useMemo } from 'vooks'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const layoutInstRef = ref(null)
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const optionsRef = computed(() =>
      route.path.includes('/docs/')
        ? docOptionsRef.value
        : componentOptionsRef.value
    )
    function findMenuValue (options, path) {
      for (const option of options) {
        if (option.children) {
          const value = findMenuValue(option.children, path)
          if (value) return value
        }
        if (option.path === path) {
          return option.key
        }
      }
      return undefined
    }
    const menuValueRef = computed(() => {
      return findMenuValue(optionsRef.value, route.path)
    })
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
    const breakpointRef = useBreakpoint()
    return {
      showSider: useMemo(() => {
        return breakpointRef.value !== 'xs'
      }),
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef,
      handleMenuUpdateValue: (_, option) => {
        router.push(option.path)
      }
    }
  }
}
</script>
