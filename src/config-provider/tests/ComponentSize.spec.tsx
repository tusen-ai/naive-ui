import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NAutoComplete } from '../../auto-complete'
import { NButton } from '../../button'
import { NCard } from '../../card'
import { NCascader } from '../../cascader'
import { NCheckbox } from '../../checkbox'
import { NColorPicker } from '../../color-picker'
import { NDataTable } from '../../data-table'
import { NDatePicker } from '../../date-picker'
import { NDescriptions } from '../../descriptions'
import { NDialog } from '../../dialog'
import { NDropdown } from '../../dropdown'
import { NDynamicInput } from '../../dynamic-input'
import { NDynamicTags } from '../../dynamic-tags'
import { NEmpty } from '../../empty'
import { NForm, NFormItem } from '../../form'
import { NInput } from '../../input'
import { NInputNumber } from '../../input-number'
import { NInputOtp } from '../../input-otp'
import { NMention } from '../../mention'
import { NPagination } from '../../pagination'
import { NPopselect } from '../../popselect'
import { NRadio } from '../../radio'
import { NRate } from '../../rate'
import { NResult } from '../../result'
import { NSelect } from '../../select'
import { NSkeleton } from '../../skeleton'
import { NSpace } from '../../space'
import { NSwitch } from '../../switch'
import { NTable } from '../../table'
import { NTabs } from '../../tabs'
import { NTag } from '../../tag'
import { NTimePicker } from '../../time-picker'
import { NTransfer } from '../../transfer'
import { NTree } from '../../tree'
import { NTreeSelect } from '../../tree-select'
import { NConfigProvider } from '../index'

function mountWithConfig(
  component: any,
  configKey: string,
  config: Record<string, any>,
  extraProps: Record<string, any> = {},
  slots: Record<string, any> = {}
) {
  return mount(NConfigProvider, {
    props: {
      componentOptions: {
        [configKey]: config
      }
    },
    slots: {
      default: () => h(component, { ...extraProps }, slots)
    }
  })
}

function mountDirect(
  component: any,
  props: Record<string, any> = {},
  slots: Record<string, any> = {}
) {
  return mount(component, { props, slots })
}

function testGlobalSize(
  component: any,
  configKey: string,
  selector: string,
  sizes: readonly string[],
  extraProps: Record<string, any> = {}
) {
  sizes.forEach((size) => {
    const globalWrapper = mountWithConfig(
      component,
      configKey,
      { size },
      extraProps
    )
    const propWrapper = mountDirect(component, { size, ...extraProps })
    expect(globalWrapper.find(selector).attributes('style')).toBe(
      propWrapper.find(selector).attributes('style')
    )
    globalWrapper.unmount()
    propWrapper.unmount()
  })
}

const SML = ['small', 'medium', 'large'] as const

describe('n-config-provider componentOptions', () => {
  // ---- Size configs ----

  it('should work with AutoComplete global size', () => {
    testGlobalSize(NAutoComplete, 'AutoComplete', '.n-input', SML)
  })

  it('should work with Button global size', () => {
    testGlobalSize(NButton, 'Button', 'button', [
      'tiny',
      'small',
      'medium',
      'large'
    ])
  })

  it('should work with Card global size', () => {
    testGlobalSize(NCard, 'Card', '.n-card', SML)
  })

  it('should work with Cascader global size', () => {
    testGlobalSize(NCascader, 'Cascader', '.n-base-selection', SML, {
      options: []
    })
  })

  it('should work with Checkbox global size', () => {
    testGlobalSize(NCheckbox, 'Checkbox', '.n-checkbox', SML)
  })

  it('should work with ColorPicker global size', () => {
    testGlobalSize(NColorPicker, 'ColorPicker', '.n-color-picker', SML)
  })

  it('should work with DataTable global size', () => {
    testGlobalSize(NDataTable, 'DataTable', '.n-data-table', SML, {
      columns: [],
      data: []
    })
  })

  it('should work with DatePicker global size', () => {
    testGlobalSize(NDatePicker, 'DatePicker', '.n-input', SML)
  })

  it('should work with Descriptions global size', () => {
    testGlobalSize(NDescriptions, 'Descriptions', '.n-descriptions', SML)
  })

  it('should work with Dropdown global size', async () => {
    const dropdownOptions = [
      { label: 'opt1', key: '1' },
      { label: 'opt2', key: '2' }
    ]
    for (const size of SML) {
      const wrapper = mount(NConfigProvider, {
        attachTo: document.body,
        props: { componentOptions: { Dropdown: { size } } },
        slots: {
          default: () =>
            h(
              NDropdown,
              { trigger: 'click', options: dropdownOptions },
              { default: () => h('button', { class: 'dd-trigger' }, 'trigger') }
            )
        }
      })
      await wrapper.find('.dd-trigger').trigger('click')
      await nextTick()
      const menu = document.querySelector('.n-dropdown')
      expect(menu?.classList.contains(`n-dropdown--${size}-size`)).toBe(true)
      wrapper.unmount()
    }
  })

  it('should work with DynamicTags global size', () => {
    testGlobalSize(NDynamicTags, 'DynamicTags', '.n-dynamic-tags', SML)
  })

  it('should work with Form global size', () => {
    SML.forEach((size) => {
      const globalWrapper = mount(NConfigProvider, {
        props: { componentOptions: { Form: { size } } },
        slots: {
          default: () =>
            h(NForm, null, {
              default: () =>
                h(
                  NFormItem,
                  { label: 'test' },
                  {
                    default: () => h(NInput)
                  }
                )
            })
        }
      })
      const propWrapper = mount(NForm, {
        props: { size },
        slots: {
          default: () =>
            h(
              NFormItem,
              { label: 'test' },
              {
                default: () => h(NInput)
              }
            )
        }
      })
      expect(globalWrapper.find('.n-input').attributes('style')).toBe(
        propWrapper.find('.n-input').attributes('style')
      )
      globalWrapper.unmount()
      propWrapper.unmount()
    })
  })

  it('should work with Input global size', () => {
    testGlobalSize(NInput, 'Input', '.n-input', SML)
  })

  it('should work with InputNumber global size', () => {
    testGlobalSize(NInputNumber, 'InputNumber', '.n-input-number', SML)
  })

  it('should work with InputOtp global size', () => {
    testGlobalSize(NInputOtp, 'InputOtp', '.n-input-otp', SML)
  })

  it('should work with Mention global size', () => {
    testGlobalSize(NMention, 'Mention', '.n-input', SML, { options: [] })
  })

  it('should work with Pagination global size', () => {
    testGlobalSize(NPagination, 'Pagination', '.n-pagination', SML, {
      pageCount: 10
    })
  })

  it('should work with Popselect global size', async () => {
    const psOptions = [
      { label: 'opt1', value: '1' },
      { label: 'opt2', value: '2' }
    ]
    for (const size of SML) {
      const wrapper = mount(NConfigProvider, {
        attachTo: document.body,
        props: { componentOptions: { Popselect: { size } } },
        slots: {
          default: () =>
            h(
              NPopselect,
              { trigger: 'click', options: psOptions },
              {
                default: () => h('button', { class: 'ps-trigger' }, 'trigger')
              }
            )
        }
      })
      await wrapper.find('.ps-trigger').trigger('click')
      await nextTick()
      const menu = document.querySelector('.n-base-select-menu')
      expect(menu?.classList.contains(`n-base-select-menu--${size}-size`)).toBe(
        true
      )
      wrapper.unmount()
    }
  })

  it('should work with Radio global size', () => {
    testGlobalSize(NRadio, 'Radio', '.n-radio', SML)
  })

  it('should work with Rate global size', () => {
    testGlobalSize(NRate, 'Rate', '.n-rate', SML)
  })

  it('should work with Result global size', () => {
    testGlobalSize(NResult, 'Result', '.n-result', SML)
  })

  it('should work with Select global size', () => {
    testGlobalSize(NSelect, 'Select', '.n-base-selection', SML)
  })

  it('should work with Skeleton global size', () => {
    testGlobalSize(NSkeleton, 'Skeleton', '.n-skeleton', SML)
  })

  it('should work with Space global size', () => {
    SML.forEach((size) => {
      const globalWrapper = mountWithConfig(
        NSpace,
        'Space',
        { size },
        {},
        { default: () => [h('div', 'a'), h('div', 'b')] }
      )
      const propWrapper = mountDirect(
        NSpace,
        { size },
        { default: () => [h('div', 'a'), h('div', 'b')] }
      )
      expect(globalWrapper.find('[role="none"]').attributes('style')).toBe(
        propWrapper.find('[role="none"]').attributes('style')
      )
      globalWrapper.unmount()
      propWrapper.unmount()
    })
  })

  it('should work with Switch global size', () => {
    testGlobalSize(NSwitch, 'Switch', '.n-switch', SML)
  })

  it('should work with Table global size', () => {
    testGlobalSize(NTable, 'Table', '.n-table', SML)
  })

  it('should work with Tabs global size', () => {
    testGlobalSize(NTabs, 'Tabs', '.n-tabs', SML)
  })

  it('should work with Tag global size', () => {
    testGlobalSize(NTag, 'Tag', '.n-tag', SML)
  })

  it('should work with TimePicker global size', () => {
    testGlobalSize(NTimePicker, 'TimePicker', '.n-input', SML)
  })

  it('should work with Transfer global size', () => {
    testGlobalSize(NTransfer, 'Transfer', '.n-transfer', SML, {
      options: []
    })
  })

  it('should work with TreeSelect global size', () => {
    testGlobalSize(NTreeSelect, 'TreeSelect', '.n-base-selection', SML, {
      options: []
    })
  })

  // ---- Non-size configs ----

  it('should work with DatePicker global timePickerSize', async () => {
    for (const size of SML) {
      const wrapper = mount(NConfigProvider, {
        attachTo: document.body,
        props: {
          componentOptions: { DatePicker: { timePickerSize: size } }
        },
        slots: {
          default: () => h(NDatePicker, { type: 'datetime' })
        }
      })
      await wrapper.find('.n-input').trigger('click')
      await nextTick()
      const panel = document.querySelector('.n-date-panel')
      expect(panel).not.toBeNull()
      const tpInput = panel?.querySelector('.n-time-picker .n-input')
      expect(tpInput).not.toBeNull()
      expect(tpInput?.classList.contains(`n-input--${size}-size`)).toBe(true)
      wrapper.unmount()
    }
  })

  it('should work with Dialog global iconPlacement', () => {
    const wrapper = mountWithConfig(
      NDialog,
      'Dialog',
      { iconPlacement: 'top' },
      { title: 'Test', content: 'Content' }
    )
    const directWrapper = mountDirect(NDialog, {
      iconPlacement: 'top',
      title: 'Test',
      content: 'Content'
    })
    expect(wrapper.find('.n-dialog').html()).toBe(
      directWrapper.find('.n-dialog').html()
    )
    wrapper.unmount()
    directWrapper.unmount()
  })

  it('should work with DynamicInput global buttonSize', () => {
    SML.forEach((size) => {
      const globalWrapper = mountWithConfig(
        NDynamicInput,
        'DynamicInput',
        { buttonSize: size },
        { defaultValue: ['a'] }
      )
      const buttons = globalWrapper.findAll(
        '.n-dynamic-input-item__action button'
      )
      expect(buttons.length).toBeGreaterThan(0)
      buttons.forEach((btn) => {
        expect(btn.classes()).toContain(`n-button--${size}-type`)
      })
      globalWrapper.unmount()
    })
  })

  it('should work with Empty global description', () => {
    const wrapper = mountWithConfig(NEmpty, 'Empty', {
      description: 'custom empty text'
    })
    expect(wrapper.text()).toContain('custom empty text')
    wrapper.unmount()
  })

  it('should work with Empty global renderIcon', () => {
    const wrapper = mountWithConfig(NEmpty, 'Empty', {
      renderIcon: () => h('div', { class: 'custom-icon' }, 'icon')
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with Pagination global inputSize and selectSize', () => {
    const wrapper = mountWithConfig(
      NPagination,
      'Pagination',
      { inputSize: 'small', selectSize: 'small' },
      {
        pageCount: 100,
        showQuickJumper: true,
        showSizePicker: true,
        pageSizes: [10, 20]
      }
    )
    expect(wrapper.find('.n-pagination').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with Cascader global renderEmpty', async () => {
    const wrapper = mount(NConfigProvider, {
      attachTo: document.body,
      props: {
        componentOptions: {
          Cascader: {
            renderEmpty: () =>
              h('div', { class: 'cascader-custom-empty' }, 'no data')
          }
        }
      },
      slots: {
        default: () => h(NCascader, { options: [] })
      }
    })
    await wrapper.find('.n-base-selection').trigger('click')
    await nextTick()
    const menu = document.querySelector('.n-cascader-menu')
    expect(menu).not.toBeNull()
    expect(menu?.querySelector('.cascader-custom-empty')?.textContent).toBe(
      'no data'
    )
    wrapper.unmount()
  })

  it('should work with Select global renderEmpty', async () => {
    const wrapper = mount(NConfigProvider, {
      attachTo: document.body,
      props: {
        componentOptions: {
          Select: {
            renderEmpty: () =>
              h('div', { class: 'select-custom-empty' }, 'no data')
          }
        }
      },
      slots: {
        default: () => h(NSelect, { options: [] })
      }
    })
    await wrapper.find('.n-base-selection').trigger('click')
    await nextTick()
    const menu = document.querySelector('.n-base-select-menu')
    expect(menu).not.toBeNull()
    expect(menu?.querySelector('.select-custom-empty')?.textContent).toBe(
      'no data'
    )
    wrapper.unmount()
  })

  it('should work with DataTable global renderEmpty', () => {
    const wrapper = mountWithConfig(
      NDataTable,
      'DataTable',
      { renderEmpty: () => h('div', { class: 'custom-empty' }, 'no data') },
      { columns: [{ title: 'Name', key: 'name' }], data: [] }
    )
    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with Transfer global renderEmpty', () => {
    const wrapper = mountWithConfig(
      NTransfer,
      'Transfer',
      {
        renderEmpty: () =>
          h('div', { class: 'transfer-custom-empty' }, 'no data')
      },
      { options: [] }
    )
    const empties = wrapper.findAll('.transfer-custom-empty')
    expect(empties.length).toBeGreaterThan(0)
    expect(empties[0].text()).toBe('no data')
    wrapper.unmount()
  })

  it('should work with Tree global renderEmpty', () => {
    const wrapper = mountWithConfig(NTree, 'Tree', {
      renderEmpty: () => h('div', { class: 'custom-empty' }, 'no data')
    })
    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with TreeSelect global renderEmpty', async () => {
    const wrapper = mount(NConfigProvider, {
      attachTo: document.body,
      props: {
        componentOptions: {
          TreeSelect: {
            renderEmpty: () =>
              h('div', { class: 'treeselect-custom-empty' }, 'no data')
          }
        }
      },
      slots: {
        default: () => h(NTreeSelect, { options: [] })
      }
    })
    await wrapper.find('.n-base-selection').trigger('click')
    await nextTick()
    const menu = document.querySelector('.n-tree-select-menu')
    expect(menu).not.toBeNull()
    expect(menu?.querySelector('.treeselect-custom-empty')?.textContent).toBe(
      'no data'
    )
    wrapper.unmount()
  })

  // ---- Priority test ----

  it('prop size should override global size', () => {
    const wrapper = mount(NConfigProvider, {
      props: {
        componentOptions: { Input: { size: 'small' } }
      },
      slots: {
        default: () => h(NInput, { size: 'large' })
      }
    })
    const directWrapper = mountDirect(NInput, { size: 'large' })
    expect(wrapper.find('.n-input').attributes('style')).toBe(
      directWrapper.find('.n-input').attributes('style')
    )
    wrapper.unmount()
    directWrapper.unmount()
  })
})
