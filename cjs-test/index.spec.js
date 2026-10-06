import { createRequire } from 'node:module'
import { afterEach, describe, expect, it, vi } from 'vitest'

const require = createRequire(import.meta.url)
const { createApp, h } = require('vue')
const { NDropdown } = require('../lib/index.js')

describe('cjs', () => {
  let app
  let div

  afterEach(() => {
    app.unmount()
    div.remove()
  })

  it('renders and selects dropdown submenu options', async () => {
    const onSelect = vi.fn()
    div = document.createElement('div')
    document.body.appendChild(div)
    app = createApp({
      render() {
        return h(
          NDropdown,
          {
            show: true,
            animated: false,
            options: [
              {
                label: 'Parent',
                key: 'parent',
                children: [{ label: 'Child', key: 'child' }]
              }
            ],
            onSelect
          },
          { default: () => h('button', 'Open') }
        )
      }
    })
    app.mount(div)

    await vi.waitFor(() => {
      expect(document.querySelector('.n-dropdown-option-body')).not.toBeNull()
    })
    document
      .querySelector('.n-dropdown-option-body')
      .dispatchEvent(new MouseEvent('mouseenter'))
    await vi.waitFor(() => {
      expect(document.querySelectorAll('.n-dropdown-menu')).toHaveLength(2)
    })
    const options = document.querySelectorAll('.n-dropdown-option-body')
    expect(options[1].textContent).toContain('Child')
    options[1].click()
    expect(onSelect).toHaveBeenCalledWith('child', {
      label: 'Child',
      key: 'child'
    })
  })
})
