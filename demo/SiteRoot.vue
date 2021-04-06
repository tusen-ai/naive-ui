<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="naive-ui-doc"
    :theme-name="themeName"
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
    :hljs="hljs"
  >
    <n-theme-editor :style="themeEditorStyle">
      <n-loading-bar-provider>
        <n-message-provider>
          <n-notification-provider>
            <n-dialog-provider>
              <Site />
            </n-dialog-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
      <n-global-style />
    </n-theme-editor>
  </component>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { initRouter, siteSetup } from './store'
import Site from './Site.vue'

export default {
  name: 'SiteProvider',
  components: {
    Site
  },
  setup () {
    initRouter(useRouter(), useRoute())
    return siteSetup()
  }
}
</script>
