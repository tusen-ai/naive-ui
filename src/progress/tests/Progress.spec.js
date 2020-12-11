import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { progressLight } from '../styles'
import { NProgress } from '../index'

describe('n-progress', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      progressLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NProgress, {
      global: {
        plugins: [naive]
      }
    })
  })
})
