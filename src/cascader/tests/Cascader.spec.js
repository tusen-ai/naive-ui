import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { cascaderLight } from '../styles'
import { NCascader } from '../index'

describe('n-cascader', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      cascaderLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NCascader, {
      global: {
        plugins: [naive]
      }
    })
  })
})
