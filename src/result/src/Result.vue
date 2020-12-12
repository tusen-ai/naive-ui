<template>
  <div
    class="n-result"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-result--${status}-status`]: status,
      [`n-result--${size}-size`]: size
    }"
  >
    <div class="n-result-icon">
      <image-404
        v-if="status === 404 || status === '404'"
        class="n-result-icon__status-image"
      />
      <image-403
        v-else-if="status === 403 || status === '403'"
        class="n-result-icon__status-image"
      />
      <image-500
        v-else-if="status === 500 || status === '500'"
        class="n-result-icon__status-image"
      />
      <image-418
        v-else-if="status === 481 || status === '418'"
        class="n-result-icon__status-image"
      />
      <n-icon v-else-if="status === 'success'" size="80">
        <success-icon />
      </n-icon>
      <n-icon v-else-if="status === 'info'" size="80">
        <info-icon />
      </n-icon>
      <n-icon v-else-if="status === 'warning'" size="80">
        <warning-icon />
      </n-icon>
      <n-icon v-else-if="status === 'error'" size="80">
        <error-icon />
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
import { configurable, themeable, withCssr } from '../../_mixins'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'
import { NIcon } from '../../icon'
import image404 from './404.vue'
import image500 from './500.vue'
import image418 from './418.vue'
import image403 from './403.vue'
import styles from './styles'

export default {
  name: 'Result',
  components: {
    InfoIcon,
    SuccessIcon,
    WarningIcon,
    ErrorIcon,
    NIcon,
    image404,
    image403,
    image418,
    image500
  },
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'medium'
    },
    status: {
      type: String,
      default: 'info'
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    }
  }
}
</script>
