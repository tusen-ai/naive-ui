import { h, defineComponent, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import type { ExtractPublicPropTypes } from '../../../_utils'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

const duration = '1.6s'

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
                    <svg
                      class={`${clsPrefix}-base-loading__icon`}
                      viewBox={`0 0 ${2 * scaledRadius} ${2 * scaledRadius}`}
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: stroke }}
                    >
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          values={`0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`}
                          begin="0s"
                          dur={duration}
                          fill="freeze"
                          repeatCount="indefinite"
                        />
                        <circle
                          class={`${clsPrefix}-base-loading__icon`}
                          fill="none"
                          stroke="currentColor"
                          stroke-width={strokeWidth}
                          stroke-linecap="round"
                          cx={scaledRadius}
                          cy={scaledRadius}
                          r={radius - strokeWidth / 2}
                          stroke-dasharray={5.67 * radius}
                          stroke-dashoffset={18.48 * radius}
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values={`0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`}
                            begin="0s"
                            dur={duration}
                            fill="freeze"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="stroke-dashoffset"
                            values={`${5.67 * radius};${1.42 * radius};${
                              5.67 * radius
                            }`}
                            begin="0s"
                            dur={duration}
                            fill="freeze"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </svg>
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
