import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { breadcrumbLight } from '../styles'
import { NBreadcrumb } from '../index'

describe('n-breadcrumb', () => {
  const naive = create({
    locales: [enUS],
    styles: [breadcrumbLight]
  })
  it('should work with import on demand', () => {
    mount(NBreadcrumb, {
      global: {
        plugins: [naive]
      }
    })
  })
})
