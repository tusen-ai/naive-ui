import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { NRow, NCol } from '../index'

describe('n-grid', () => {
  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <NRow>
              {{
                default: () => [<NCol />]
              }}
            </NRow>
          )
        }
      })
    )
  })
})
