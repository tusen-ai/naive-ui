import { h, defineComponent, Fragment } from 'vue'
import { NIcon } from '../../../icon'
import { NDivider } from '../../../divider'

export default defineComponent({
  name: 'ServiceLayoutHeader',
  props: {
    name: String
  },
  render () {
    return this.name ? (
      <>
        <div
          style={{
            alignItems: 'center',
            height: '64px',
            paddingLeft: '36px',
            fontSize: '16px',
            fontWeight: 500,
            display: 'flex',
            position: 'relative'
          }}
        >
          {this.$slots.icon ? (
            <NIcon
              size={20}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              {{ default: this.$slots.icon }}
            </NIcon>
          ) : null}
          {<span>{this.name}</span>}
        </div>
        <NDivider
          style={{
            margin: '0',
            padding: '0 8px'
          }}
        />
      </>
    ) : null
  }
})
