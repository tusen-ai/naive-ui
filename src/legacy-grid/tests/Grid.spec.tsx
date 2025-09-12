import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { NCol, NRow } from '../index'

describe('n-grid', () => {
  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render() {
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
