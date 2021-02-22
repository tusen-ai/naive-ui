<template>
  <component
    :is="configProvider"
    class="demo"
    namespace="naive-ui-doc"
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
    :hljs="hljs"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <Site />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </component>
</template>

<script>
import { siteSetup } from './store'
import Site from './Site.vue'

export default {
  name: 'SiteProvider',
  components: {
    Site
  },
  setup () {
    return siteSetup()
  }
}
</script>
