import type { TableColumn } from '../src/interface'
import { generateCsv } from '../src/utils'

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Address', key: 'address' }
] as TableColumn[]

describe('generateCsv', () => {
  it('should keep plain cells unquoted', () => {
    const csv = generateCsv(
      columns,
      [{ name: 'Jim Green', address: 'London' }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\nJim Green,London')
  })

  it('should quote cells containing a line break', () => {
    const csv = generateCsv(
      columns,
      [{ name: 'Jim Green', address: '11111111\r\n222222222' }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\nJim Green,"11111111\r\n222222222"')
  })

  it('should quote cells containing a comma', () => {
    const csv = generateCsv(
      columns,
      [{ name: 'Jim Green', address: 'London, UK' }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\nJim Green,"London, UK"')
  })

  it('should quote cells containing a double quote and double the quote', () => {
    const csv = generateCsv(
      columns,
      [{ name: 'Jim Green', address: 'The "Old" House' }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\nJim Green,"The ""Old"" House"')
  })

  it('should quote non string cells containing a comma', () => {
    const csv = generateCsv(
      columns,
      [{ name: 'Jim Green', address: { toString: () => 'a,b' } }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\nJim Green,"a,b"')
  })

  it('should keep empty cells for null and undefined', () => {
    const csv = generateCsv(
      columns,
      [{ name: null, address: undefined }],
      undefined,
      undefined
    )

    expect(csv).toBe('Name,Address\n,')
  })
})
