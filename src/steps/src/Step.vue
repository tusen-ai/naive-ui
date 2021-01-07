<template>
  <div class="n-step" :style="cssVars">
    <div class="n-step-indicator">
      <div class="n-step-indicator-slot">
        <n-icon-switch-transition>
          <div
            v-if="!(mergedStatus === 'finish' || mergedStatus === 'error')"
            key="index"
            class="n-step-indicator-slot__index"
          >
            {{ index }}
          </div>
          <n-icon v-else-if="mergedStatus === 'finish'" key="finish">
            <finished-icon />
          </n-icon>
          <n-icon v-else-if="mergedStatus === 'error'" key="error">
            <error-icon />
          </n-icon>
        </n-icon-switch-transition>
      </div>
      <div v-if="vertical" class="n-step-splitor" />
    </div>
    <div class="n-step-content">
      <div class="n-step-content-header">
        <div class="n-step-content-header__title">
          {{ title }}
        </div>
        <div v-if="!vertical" class="n-step-splitor" />
      </div>
      <div
        v-if="description !== undefined || $slots.default"
        class="n-step-content__description"
      >
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, inject } from 'vue'
import {
  CheckmarkIcon as FinishedIcon,
  CloseIcon as ErrorIcon
} from '../../_base/icons'
import { NIcon } from '../../icon'
import { useTheme } from '../../_mixins'
import { NIconSwitchTransition } from '../../_base'
import { createKey } from '../../_utils'
import { stepsLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Step',
  components: {
    NIcon,
    FinishedIcon,
    ErrorIcon,
    NIconSwitchTransition
  },
  props: {
    status: {
      type: String,
      default: undefined,
      validator (value) {
        return ['process', 'finish', 'error', 'wait'].includes(value)
      }
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    index: {
      type: [Number, String],
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Steps', 'Steps', style, stepsLight, props)
    const NSteps = inject('NSteps')

    const verticalRef = computed(() => {
      return NSteps.vertical
    })
    const mergedStatusRef = computed(() => {
      const { status } = props
      if (status) {
        return status
      } else {
        const { index } = props
        const { current } = NSteps
        if (index < current) {
          return 'finish'
        } else if (index === current) {
          return NSteps.status || 'process'
        } else if (index > current) {
          return 'wait'
        }
      }
      return undefined
    })
    return {
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      cssVars: computed(() => {
        const { value: status } = mergedStatusRef
        const { size } = NSteps
        const {
          common: { cubicBezierEaseInOut },
          self: {
            stepHeaderFontWeight,
            [createKey('stepHeaderFontSize', size)]: stepHeaderFontSize,
            [createKey('indicatorIndexFontSize', size)]: indicatorIndexFontSize,
            [createKey('indicatorSize', size)]: indicatorSize,
            [createKey('indicatorIconSize', size)]: indicatorIconSize,
            [createKey('indicatorTextColor', status)]: indicatorTextColor,
            [createKey('indicatorBorderColor', status)]: indicatorBorderColor,
            [createKey('headerTextColor', status)]: headerTextColor,
            [createKey('splitorColor', status)]: splitorColor,
            [createKey('indicatorColor', status)]: indicatorColor,
            [createKey('descriptionTextColor', status)]: descriptionTextColor
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--description-text-color': descriptionTextColor,
          '--header-text-color': headerTextColor,
          '--indicator-border-color': indicatorBorderColor,
          '--indicator-color': indicatorColor,
          '--indicator-icon-size': indicatorIconSize,
          '--indicator-index-font-size': indicatorIndexFontSize,
          '--indicator-size': indicatorSize,
          '--indicator-text-color': indicatorTextColor,
          '--splitor-color': splitorColor,
          '--step-header-font-size': stepHeaderFontSize,
          '--step-header-font-weight': stepHeaderFontWeight
        }
      })
    }
  }
})
</script>
