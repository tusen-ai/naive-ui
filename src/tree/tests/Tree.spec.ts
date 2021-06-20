import { mount } from '@vue/test-utils'
import { NTree } from '../index'

describe('n-tree', () => {
  it('should work with import on demand', () => {
    mount(NTree)
  })
  it('should accepts proper options', () => {
    mount(NTree, {
      props: {
        options: [
          {
            label: '123',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })
    mount(NTree, {
      props: {
        options: [
          {
            label: '123',
            key: '123',
            unknown: 'unknown'
          }
        ]
      }
    })
  })
})
