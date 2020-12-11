import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { treeLight } from '../styles'
import { NTree } from '../index'

describe('n-tree', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      treeLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NTree, {
      global: {
        plugins: [naive]
      }
    })
  })
})
