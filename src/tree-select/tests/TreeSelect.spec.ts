import { mount } from '@vue/test-utils'
import { NTreeSelect, TreeSelectOption } from '../index'

describe('n-tree-select', () => {
  it('should work with import on demand', () => {
    mount(NTreeSelect)
  })
  it('should accept proper options', () => {
    mount(NTreeSelect, {
      props: {
        options: [
          {
            label: '1',
            key: '1'
          }
        ]
      }
    })
    const options: TreeSelectOption[] = [
      {
        label: '1',
        key: '1',
        gogogo: '12'
      }
    ]
    mount(NTreeSelect, {
      props: {
        options
      }
    })
  })
})
