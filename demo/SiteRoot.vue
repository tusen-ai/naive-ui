<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    :unstable-theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <router-view />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { siteSetup } from './store'

export default {
  name: 'SiteProvider',
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  setup () {
    return siteSetup()
  }
}
</script>
