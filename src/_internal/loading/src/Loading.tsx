import { h, defineComponent, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { ExtractPublicPropTypes } from '../../../_utils'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

const exposedLoadingProps = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: undefined
  }
}

export type BaseLoadingExposedProps = ExtractPublicPropTypes<
  typeof exposedLoadingProps
>

export default defineComponent({
  name: 'BaseLoading',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    },
    ...exposedLoadingProps
  },
  setup (props) {
    useStyle('-base-loading', style, toRef(props, 'clsPrefix'))
  },
  render () {
    const { clsPrefix, radius, strokeWidth, stroke, scale } = this
    const scaledRadius = radius / scale
    return (
      <div class={`${clsPrefix}-base-loading`} role="img" aria-label="loading">
        <NIconSwitchTransition>
          {{
            default: () =>
              this.show ? (
                <div
                  key="icon"
                  class={`${clsPrefix}-base-loading__transition-wrapper`}
                >
                  <div class={`${clsPrefix}-base-loading__container`}>
                    <div class={`${clsPrefix}-base-loading__container-layer`}>
                      <div
                        class={`${clsPrefix}-base-loading__container-layer-left`}
                      >
                        <svg
                          class={`${clsPrefix}-base-loading__svg`}
                          viewBox={`0 0 ${2 * scaledRadius} ${
                            2 * scaledRadius
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: stroke }}
                        >
                          <circle
                            fill="none"
                            stroke="currentColor"
                            stroke-width={strokeWidth}
                            stroke-linecap="round"
                            cx={scaledRadius}
                            cy={scaledRadius}
                            r={radius - strokeWidth / 2}
                            stroke-dasharray={4.91 * radius}
                            stroke-dashoffset={2.46 * radius}
                          />
                        </svg>
                      </div>
                      <div
                        class={`${clsPrefix}-base-loading__container-layer-patch`}
                      >
                        <svg
                          class={`${clsPrefix}-base-loading__svg`}
                          viewBox={`0 0 ${2 * scaledRadius} ${
                            2 * scaledRadius
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: stroke }}
                        >
                          <circle
                            fill="none"
                            stroke="currentColor"
                            stroke-width={strokeWidth}
                            stroke-linecap="round"
                            cx={scaledRadius}
                            cy={scaledRadius}
                            r={radius - strokeWidth / 2}
                            stroke-dasharray={4.91 * radius}
                            stroke-dashoffset={2.46 * radius}
                          />
                        </svg>
                      </div>
                      <div
                        class={`${clsPrefix}-base-loading__container-layer-right`}
                      >
                        <svg
                          class={`${clsPrefix}-base-loading__svg`}
                          viewBox={`0 0 ${2 * scaledRadius} ${
                            2 * scaledRadius
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: stroke }}
                        >
                          <circle
                            fill="none"
                            stroke="currentColor"
                            stroke-width={strokeWidth}
                            stroke-linecap="round"
                            cx={scaledRadius}
                            cy={scaledRadius}
                            r={radius - strokeWidth / 2}
                            stroke-dasharray={4.91 * radius}
                            stroke-dashoffset={2.46 * radius}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key="placeholder"
                  class={`${clsPrefix}-base-loading__placeholder`}
                >
                  {this.$slots}
                </div>
              )
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
