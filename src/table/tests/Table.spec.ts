import { mount } from '@vue/test-utils'
import { NTable, NTbody, NThead, NTd, NTh, NTr } from '../index'

describe('n-table', () => {
  it('should work with import on demand', () => {
    mount(NTable)
  })
})

describe('n-table-body', () => {
  it('should work with import on demand', () => {
    mount(NTbody)
  })
})

describe('n-table-head', () => {
  it('should work with import on demand', () => {
    mount(NThead)
  })
})

describe('n-table-td', () => {
  it('should work with import on demand', () => {
    mount(NTd)
  })
})

describe('n-table-th', () => {
  it('should work with import on demand', () => {
    mount(NTh)
  })
})

describe('n-table-tr', () => {
  it('should work with import on demand', () => {
    mount(NTr)
  })
})
