import { h } from 'vue'
import NIcon from '../../../icon'
import NDivider from '../../../divider'

export default {
  props: {
    name: {
      type: String,
      deafult: undefined
    }
  },
  render () {
    return this.name ? [
      h('div', {
        style: {
          alignItems: 'center',
          height: '64px',
          paddingLeft: '36px',
          fontSize: '16px',
          fontWeight: '500',
          display: 'flex',
          position: 'relative'
        }
      }, [
        this.$slots.icon
          ? h(NIcon, {
            size: 20,
            style: {
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)'
            }
          }, {
            default: this.$slots.icon
          })
          : null,
        h('span', [this.name])
      ]),
      h(NDivider, {
        style: {
          margin: '0',
          padding: '0 8px'
        }
      })
    ] : null
  }
}
