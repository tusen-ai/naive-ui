import { h, isVNode, type VNode } from 'vue'
import { createHoverColor, createPressedColor } from '../color'
import {
  call,
  createDataKey,
  formatLength,
  getTitleAttribute,
  keep,
  keysOf,
  largerSize,
  omit,
  render,
  smallerSize
} from '../index'

describe('color', () => {
  it('should work with createHoverColor', () => {
    expect(createHoverColor('#666666')).toBe('rgba(126, 126, 126, 1)')
    expect(createHoverColor('rgb(42, 148, 125)')).toBe('rgba(76, 165, 146, 1)')
  })

  it('should work with createPressedColor', () => {
    expect(createPressedColor('#666666')).toBe('rgba(90, 90, 90, 1)')
    expect(createPressedColor('rgb(42, 148, 125)')).toBe(
      'rgba(37, 130, 110, 1)'
    )
  })
})

describe('css', () => {
  it('should work with formatLength', () => {
    expect(formatLength(7)).toBe('7px')
    expect(formatLength(2, { offset: 3 })).toBe('5px')
    expect(formatLength(3, { offset: 4, c: 2 })).toBe('14px')
    expect(formatLength('3')).toBe('3px')
    expect(formatLength('3', { attachPx: false })).toBe('3')
    expect(formatLength('2', { offset: 3 })).toBe('5px')
    expect(formatLength('3', { offset: 4, c: 2 })).toBe('14px')
    expect(formatLength('4px')).toBe('4px')
    expect(formatLength('2px', { offset: 3 })).toBe('5px')
    expect(formatLength('3px', { offset: 4, c: 2 })).toBe('14px')
  })
})

describe('naive', () => {
  it('should work with getTitleAttribute', () => {
    expect(getTitleAttribute(7)).toBe('7')
    expect(getTitleAttribute('test')).toBe('test')
    expect(getTitleAttribute([])).toBe(undefined)
    expect(getTitleAttribute({})).toBe(undefined)
    expect(getTitleAttribute(() => '')).toBe(undefined)
  })

  it('should work with largerSize', () => {
    expect(largerSize('tiny')).toBe('small')
    expect(largerSize('small')).toBe('medium')
    expect(largerSize('medium')).toBe('large')
    expect(largerSize('large')).toBe('huge')
  })

  it('should work with smallerSize', () => {
    expect(smallerSize('huge')).toBe('large')
    expect(smallerSize('large')).toBe('medium')
    expect(smallerSize('medium')).toBe('small')
    expect(smallerSize('small')).toBe('tiny')
  })
})

describe('vue', () => {
  it('should work with call', () => {
    let testValue = 0
    let testValue2 = 0
    function testFunction1 (): void {
      testValue = testValue + 1
    }
    function testFunction2 (v: number): void {
      testValue = testValue + v + 2
    }
    function testFunction3 (v: number): void {
      testValue2 = testValue2 + v + 3
    }
    call(testFunction1)
    expect(testValue).toBe(1)
    testValue = 0
    call(testFunction2, 1)
    expect(testValue).toBe(3)
    testValue = 0
    call([testFunction2, testFunction3], 1)
    expect(testValue).toBe(3)
    expect(testValue2).toBe(4)
  })

  it('should work with createDataKey', () => {
    expect(createDataKey('1')).toBe('s-1')
    expect(createDataKey(1)).toBe('n-1')
  })

  it('should work with keep', () => {
    const test = { c: 3 }
    const test2 = { a: 1, b: 2, d: test }
    expect(JSON.stringify(keep(test, ['c']))).toBe(JSON.stringify({ c: 3 }))
    expect(JSON.stringify(keep(test2, ['a', 'b', 'd']))).toBe(
      JSON.stringify({ a: 1, b: 2, d: { c: 3 } })
    )
    expect(JSON.stringify(keep(test2, ['a', 'b', 'd'], { a: 4, e: 5 }))).toBe(
      JSON.stringify({ a: 4, b: 2, d: { c: 3 }, e: 5 })
    )
  })

  it('should work with keysOf', () => {
    const test = { c: 3 }
    const test2 = { a: 1, b: 2, d: test }
    expect(keysOf(test).toString()).toBe(['c'].toString())
    expect(keysOf(test2).toString()).toBe(['a', 'b', 'd'].toString())
  })

  it('should work with omit', () => {
    const test = { c: 3 }
    const test2 = { a: 1, b: 2, d: test }

    expect(JSON.stringify(omit(test2, ['a']))).toBe(
      JSON.stringify({ b: 2, d: { c: 3 } })
    )
    expect(JSON.stringify(omit(test2, ['a', 'd']))).toBe(
      JSON.stringify({ b: 2 })
    )
    expect(JSON.stringify(omit(test2, ['b'], { a: 4, b: 5 }))).toBe(
      JSON.stringify({ a: 4, d: { c: 3 }, b: 5 })
    )
  })

  it('should work with render', () => {
    function testFunction (value: string): VNode {
      return h(value, null, { default: () => 'test' })
    }
    expect(isVNode(render('test'))).toBe(true)
    expect(isVNode(render(123))).toBe(true)
    expect(isVNode(render(testFunction, 'div'))).toBe(true)
    expect(isVNode(render({ a: 1 }))).toBe(false)
    expect(render({ a: 1 })).toBe(null)
    expect(isVNode(render(['1']))).toBe(false)
    expect(render(['1'])).toBe(null)
  })
})
