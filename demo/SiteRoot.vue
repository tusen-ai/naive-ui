<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Site from './Site.vue'
import { initRouter, siteSetup } from './store'

export default defineComponent({
  name: 'SiteProvider',
  components: {
    Site
  },
  setup() {
    initRouter(useRouter(), useRoute())
    return siteSetup()
  }
})
</script>

<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="naive-ui-doc"
    preflight-style-disabled
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
            <n-modal-provider>
              <n-dialog-provider>
                <Site />
              </n-dialog-provider>
            </n-modal-provider>
          </n-notification-provider>
        </n-message-provider>
      </n-loading-bar-provider>
      <n-global-style />
    </n-theme-editor>
  </component>
</template>
