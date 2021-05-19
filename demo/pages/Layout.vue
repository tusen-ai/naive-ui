<template>
  <n-layout has-sider :position="isXs ? undefined : 'absolute'">
    <n-layout-sider
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
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
      <site-footer />
    </n-layout>
  </n-layout>
</template>

<script>
// Frame component for components & docs page
import { computed, watch, toRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findMenuValue } from '../utils/route'
import { useIsXs } from '../utils/composables'
import SiteFooter from './home/Footer.vue'
import { useDocOptions, useComponentOptions } from '../store'
import { useMemo } from 'vooks'

export default {
  components: {
    SiteFooter
  },
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
    const isXsRef = useIsXs()
    return {
      showSider: useMemo(() => {
        return !isXsRef.value
      }),
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef,
      isXs: isXsRef,
      handleMenuUpdateValue: (_, option) => {
        router.push(option.path)
      }
    }
  }
}
</script>
