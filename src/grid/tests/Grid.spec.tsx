import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { NGi, NGrid, NGridItem } from '../index'

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

  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <NGrid>
              {{
                default: () => [<NGi />]
              }}
            </NGrid>
          )
        }
      })
    )
  })

  it('should work with `gap` prop', async () => {
    const wrapper = mount(NGrid, {
      props: {
        'x-gap': 10,
        'y-gap': 20
      },
      slots: {
        default: () => [
          h(NGi, null, { default: () => 'test1' }),
          h(NGridItem, null, { default: () => 'test2' })
        ]
      }
    })
    expect(wrapper.find('.n-grid').attributes('style')).toContain(
      'column-gap: 10px; row-gap: 20px;'
    )
  })

  it('should work with `offset` prop', async () => {
    const wrapper = mount(NGrid, {
      slots: {
        default: () => [
          h(NGi, { offset: 2 }, { default: () => 'test1' }),
          h(NGridItem, { offset: 1 }, { default: () => 'test2' })
        ]
      }
    })
    expect(
      wrapper.find('.n-grid').element.children[0].getAttribute('style')
    ).toContain('grid-column: span 3 / span 3;')
    expect(
      wrapper.find('.n-grid').element.children[1].getAttribute('style')
    ).toContain('grid-column: span 2 / span 2;')
  })
})
