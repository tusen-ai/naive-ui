import { h, defineComponent } from 'vue'
import { useStyle } from '../../../_mixins'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseLoading',
  props: {
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
  setup () {
    useStyle('BaseLoading', style)
  },
  render () {
    return (
      <div class="n-base-loading" style={{ stroke: this.stroke }}>
        <NIconSwitchTransition>
          {{
            default: () =>
              this.show ? (
                <svg
                  key="loading"
                  class="n-base-loading-circular n-base-loading__icon"
                  viewBox={`0 0 ${(this.radius * 2) / this.scale} ${
                    (this.radius * 2) / this.scale
                  }`}
                >
                  <circle
                    style={{ strokeWidth: this.strokeWidth }}
                    class="n-base-loading-circular-path"
                    cx={this.radius / this.scale}
                    cy={this.radius / this.scale}
                    fill="none"
                    r={this.radius - this.strokeWidth / 2}
                  />
                </svg>
              ) : (
                <div key="placeholder" class="n-base-loading__placeholder">
                  {this.$slots}
                </div>
              )
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
