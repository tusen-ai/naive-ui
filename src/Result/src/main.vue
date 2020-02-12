<template>
  <div
    class="n-result"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-result--${status}-status`]: status
    }"
  >
    <div class="n-result-icon">
      <image-404 v-if="status === 404 || status === '404'" class="n-result-icon__status-image" />
      <image-403 v-else-if="status === 403 || status === '403'" class="n-result-icon__status-image" />
      <image-500 v-else-if="status === 500 || status === '500'" class="n-result-icon__status-image" />
      <image-418 v-else-if="status === 481 || status === '418'" class="n-result-icon__status-image" />
      <n-icon v-else-if="status === 'success'" size="80">
        <ios-checkmark-circle />
      </n-icon>
      <n-icon v-else-if="status === 'info'" size="80">
        <ios-information-circle />
      </n-icon>
      <n-icon v-else-if="status === 'warning'" size="80">
        <ios-alert />
      </n-icon>
      <n-icon v-else-if="status === 'error'" size="80">
        <ios-close-circle />
      </n-icon>
    </div>
    <div class="n-result-header">
      <div class="n-result-header__title">
        {{ title }}
      </div>
      <div class="n-result-header__description">
        {{ description }}
      </div>
    </div>
    <div v-if="$slots.default" class="n-result-content">
      <slot />
    </div>
    <div class="n-result-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import iosCheckmarkCircle from '../../_icons/ios-checkmark-circle'
import iosAlert from '../../_icons/ios-alert'
import iosInformationCircle from '../../_icons/ios-information-circle'
import iosCloseCircle from '../../_icons/ios-close-circle'
import NIcon from '../../Icon'
import image404 from './404.vue'
import image500 from './500.vue'
import image418 from './418.vue'
import image403 from './403.vue'

export default {
  name: 'NResult',
  components: {
    iosCheckmarkCircle,
    iosAlert,
    iosInformationCircle,
    iosCloseCircle,
    NIcon,
    image404,
    image403,
    image418,
    image500
  },
  mixins: [ withapp, themeable ],
  props: {
    status: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  }
}
</script>
