import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { listLight } from '../styles'
import { NList } from '../index'

describe('n-list', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      listLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NList, {
      global: {
        plugins: [naive]
      }
    })
  })
})
