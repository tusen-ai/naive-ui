import { splitAndMarkByRegex } from '../src/utils'

describe('splitAndMarkByRegex', () => {
  it('should split text by regex and mark matches correctly', () => {
    const text = 'Hello world, hello again'
    const regex = /hello/gi
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'Hello', isMatch: true },
      { text: ' world, ', isMatch: false },
      { text: 'hello', isMatch: true },
      { text: ' again', isMatch: false }
    ])
  })

  it('should handle case sensitive matching', () => {
    const text = 'Hello world, hello again'
    const regex = /hello/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'Hello world, ', isMatch: false },
      { text: 'hello', isMatch: true },
      { text: ' again', isMatch: false }
    ])
  })

  it('should handle empty string', () => {
    const text = ''
    const regex = /test/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([])
  })

  it('should handle no matches', () => {
    const text = 'Hello world'
    const regex = /xyz/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([{ text: 'Hello world', isMatch: false }])
  })

  it('should handle regex that matches entire string', () => {
    const text = 'hello'
    const regex = /hello/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([{ text: 'hello', isMatch: true }])
  })

  it('should handle regex with multiple word patterns', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const regex = /(quick|fox|lazy)/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'The ', isMatch: false },
      { text: 'quick', isMatch: true },
      { text: ' brown ', isMatch: false },
      { text: 'fox', isMatch: true },
      { text: ' jumps over the ', isMatch: false },
      { text: 'lazy', isMatch: true },
      { text: ' dog', isMatch: false }
    ])
  })

  it('should handle consecutive matches', () => {
    const text = 'aaa bbb'
    const regex = /a/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'a', isMatch: true },
      { text: 'a', isMatch: true },
      { text: 'a', isMatch: true },
      { text: ' bbb', isMatch: false }
    ])
  })

  it('should handle regex with special characters', () => {
    const text = 'Price: $100.99'
    const regex = /\$\d+\.\d+/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'Price: ', isMatch: false },
      { text: '$100.99', isMatch: true }
    ])
  })

  it('should handle regex that matches at the beginning', () => {
    const text = 'hello world'
    const regex = /hello/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'hello', isMatch: true },
      { text: ' world', isMatch: false }
    ])
  })

  it('should handle regex that matches at the end', () => {
    const text = 'hello world'
    const regex = /world/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'hello ', isMatch: false },
      { text: 'world', isMatch: true }
    ])
  })

  it('should throw error for non-global regex', () => {
    const text = 'hello world hello again'
    const regex = /hello/i

    expect(() => splitAndMarkByRegex(text, regex)).toThrow(
      'splitAndMarkByRegex requires a global regex (with "g" flag)'
    )
  })

  it('should throw error for regex without global flag', () => {
    const text = 'test string'
    const regex = /test/

    expect(() => splitAndMarkByRegex(text, regex)).toThrow(
      'splitAndMarkByRegex requires a global regex (with "g" flag)'
    )
  })

  it('should handle regex with capturing groups', () => {
    const text = 'foo123bar456'
    const regex = /(\d+)/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'foo', isMatch: false },
      { text: '123', isMatch: true },
      { text: 'bar', isMatch: false },
      { text: '456', isMatch: true }
    ])
  })

  it('should handle complex regex patterns', () => {
    const text = 'Email: user@example.com, Phone: +1-234-567-8900'
    const regex = /[\w.-]+@[\w.-]+\.\w+|\+\d{1,3}-\d{3}-\d{3}-\d{4}/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'Email: ', isMatch: false },
      { text: 'user@example.com', isMatch: true },
      { text: ', Phone: ', isMatch: false },
      { text: '+1-234-567-8900', isMatch: true }
    ])
  })

  it('should handle single character matches', () => {
    const text = 'a1b2c3'
    const regex = /\d/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: 'a', isMatch: false },
      { text: '1', isMatch: true },
      { text: 'b', isMatch: false },
      { text: '2', isMatch: true },
      { text: 'c', isMatch: false },
      { text: '3', isMatch: true }
    ])
  })

  it('should handle unicode characters', () => {
    const text = '你好世界 hello world'
    const regex = /你好|hello/g
    const result = splitAndMarkByRegex(text, regex)

    expect(result).toEqual([
      { text: '你好', isMatch: true },
      { text: '世界 ', isMatch: false },
      { text: 'hello', isMatch: true },
      { text: ' world', isMatch: false }
    ])
  })
})
