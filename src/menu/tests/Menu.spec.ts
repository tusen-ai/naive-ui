import { mount } from '@vue/test-utils'
import { HappyOutline } from '@vicons/ionicons5'
import { h } from 'vue'
import { sleep } from 'seemly'
import { NMenu } from '../index'
import { NIcon } from '../../icon'

describe('n-menu', () => {
  it('should work with import on demand', () => {
    mount(NMenu)
  })

  it('props.onUpdateValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(NMenu, {
      props: {
        onUpdateValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })

  it('should work with `render-icon` props', async () => {
    const options = [
      {
        label: 'yeh',
        key: 'yeh'
      },
      {
        label: 'fantasy',
        key: 'fantasy'
      },
      {
        label: 'mojito',
        key: 'mojito',
        icon: () => h(NIcon, null, { default: () => h(HappyOutline) })
      },
      {
        label: 'initialj',
        key: 'initialj'
      }
    ]
    function renderMenuIcon (option: any): any {
      if (option.key === 'fantasy') return true // render indent
      if (option.key === 'mojito') return true // keep menu option icon render
      if (option.key === 'initialj') return null // don't render
      return h(NIcon, null, { default: () => h(HappyOutline) }) // render this
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        renderIcon: renderMenuIcon
      }
    })
    expect(wrapper.findAll('.n-menu-item-content__icon').length).toBe(3)
    expect(wrapper.findAll('.n-icon').length).toBe(2)
  })

  it('should tooltip work with `render-label` props', async () => {
    const options = [
      {
        label: () =>
          h(
            'a',
            {
              href: 'test1',
              target: '_blank',
              rel: 'test1'
            },
            'test1'
          ),
        key: 'test1'
      },
      {
        label: 'test2',
        key: 'test2'
      }
    ]
    const renderLabel = (option: any): any => {
      if (typeof option.label === 'function') {
        return option.label()
      }
      return h(
        'a',
        {
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options
      }
    })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(false)

    await wrapper.setProps({ renderLabel: renderLabel })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[target="_blank"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(true)
  })

  it('should dropdown work with `render-label` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    const renderLabel = (option: any): any => {
      return h(
        'a',
        {
          class: option.key,
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        collapsed: true,
        renderLabel: renderLabel
      }
    })
    expect(wrapper.find('.n-submenu').exists()).toBe(true)
    await wrapper.find('.n-submenu').trigger('mouseenter')
    // Popover has delay, so we need to wait
    await sleep(150)
    expect(document.body.querySelector('.n-dropdown')).not.toEqual(null)
    expect(document.querySelectorAll('a').length).toEqual(3)
    expect(document.querySelectorAll('a.fantasy').length).toEqual(1)
  })

  it('should dropdown work with `render-icon` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderMenuIcon (): any {
      return h(NIcon, null, { default: () => h(HappyOutline) })
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        collapsed: true,
        renderIcon: renderMenuIcon
      }
    })
    expect(wrapper.find('.n-submenu').exists()).toBe(true)
    await wrapper.find('.n-submenu').trigger('mouseenter')
    // Popover has delay, so we need to wait
    await sleep(150)
    expect(document.body.querySelector('.n-dropdown')).not.toEqual(null)
    expect(document.querySelectorAll('.n-icon').length).toEqual(2)
  })

  it('should dropdown work with `expand-icon` props', () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    function renderExpandIcon (): any {
      return h('span', { class: 'expand-icon' }, '1')
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        expandIcon: renderExpandIcon
      }
    })
    expect(wrapper.find('.expand-icon').text()).toEqual('1')
  })
})
