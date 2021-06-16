import { mount, VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { NSpace } from '../index'

const getChildrenNode = (wrapper: VueWrapper<any>): any[] => {
  return (
    wrapper.findAll('div').filter((v) => {
      return !v.classes().includes('n-space')
    }) || []
  )
}

describe('n-space', () => {
  it('should work with import on demand', () => {
    mount(NSpace)
  })

  it('render empty children', () => {
    const wrapper = mount({
      render () {
        return <NSpace />
      }
    })
    expect(wrapper.find('.n-space')).not.toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render space string size', () => {
    const wrapper = mount({
      render () {
        return <NSpace size="large" />
      }
    })
    expect(wrapper.attributes('style')).toContain('margin')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render space number size', () => {
    const size = 20
    const wrapper = mount({
      render () {
        return <NSpace size={size} />
      }
    })
    expect(wrapper.attributes('style')).toContain(`margin-top: -${size / 2}px`)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render vertical space', () => {
    const wrapper = mount({
      render () {
        return (
          <NSpace vertical>
            <div>1</div>
            <div>2</div>
          </NSpace>
        )
      }
    })
    expect(wrapper.attributes('style')).toContain('flex-direction: column;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with invalidElement', () => {
    const wrapper = mount({
      render () {
        return (
          <NSpace>
            text1<span>text1</span>
            text1
          </NSpace>
        )
      }
    })

    const childNodes = getChildrenNode(wrapper)
    expect(childNodes.length).toBe(3)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('render justify space', () => {
    const justifyList = ['start', 'end'] as Array<'start' | 'end'>
    justifyList.forEach((pos) => {
      const wrapper = mount({
        render () {
          return (
            <NSpace justify={pos}>
              <div>1</div>
              <div>2</div>
            </NSpace>
          )
        }
      })
      expect(wrapper.attributes('style')).toContain(
        `justify-content: flex-${pos};`
      )
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('render custom style space', () => {
    const wrapper = mount(
      {
        render () {
          return <NSpace>div</NSpace>
        }
      },
      {
        props: {
          itemStyle: { backgroundColor: 'red', color: 'yellow' }
        }
      }
    )
    const childNodes = getChildrenNode(wrapper)

    expect(childNodes[0].attributes('style')).toContain(
      'background-color: red; color: yellow;'
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
