import { h, defineComponent, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseLoading',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 28
    },
    stroke: {
      type: String,
      default: undefined
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    useStyle('BaseLoading', style, toRef(props, 'clsPrefix'))
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        class={`${clsPrefix}-base-loading`}
        style={{ stroke: this.stroke }}
        role="img"
        aria-label="loading"
      >
        <NIconSwitchTransition>
          {{
            default: () =>
              this.show ? (
                <svg
                  key="loading"
                  class={`${clsPrefix}-base-loading-circular ${clsPrefix}-base-loading__icon`}
                  viewBox={`0 0 ${(this.radius * 2) / this.scale} ${
                    (this.radius * 2) / this.scale
                  }`}
                >
                  <circle
                    style={{ strokeWidth: this.strokeWidth }}
                    class={`${clsPrefix}-base-loading-circular-path`}
                    cx={this.radius / this.scale}
                    cy={this.radius / this.scale}
                    fill="none"
                    r={this.radius - this.strokeWidth / 2}
                  />
                </svg>
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
