import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { NGrid, NGridItem } from '../index'

describe('n-grid', () => {
  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <NGrid>
              {{
                default: () => [<NGridItem />]
              }}
            </NGrid>
          )
        }
      })
    )
  })
})
