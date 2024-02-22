import { NDataTable } from '../dist/index.prod.mjs'
import { createApp } from 'vue'

// eslint-disable-next-line n/no-exports-assign
exports = undefined

describe('esm', () => {
  it('works', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    createApp(NDataTable).mount(div)
    expect(div.innerHTML).toContain('n-data-table')
  })
})
