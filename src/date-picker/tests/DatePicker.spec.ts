import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { NDatePicker } from '../index'
import { Value } from '../src/interface'

describe('n-date-picker', () => {
  it('should work with import on demand', () => {
    mount(NDatePicker).unmount()
  })
  it('date type should work with shortcuts prop', async () => {
    const test = ref(0 as Value)
    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        onUpdateValue: (value: Value) => { test.value = value },
        shortcuts: [
          {
            label: 'Honey birthday',
            value: 1631203200000
          }
        ]
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document.querySelector('.n-date-panel-actions')?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual(1631203200000)
    wrapper.unmount()
  })
  it('dateRange type should work with shortcuts prop', async () => {
    const test = ref([0, 0] as Value)
    const wrapper = mount(NDatePicker, {
      props: {
        value: test.value,
        onUpdateValue: (value: Value) => { test.value = value },
        shortcuts: [
          {
            label: 'Honey birthday',
            value:  [1629216000000, 1631203200000]
          }
        ]
      }
    })
    await wrapper.find('.n-input').trigger('click')
    const button: HTMLElement = document.querySelector('.n-date-panel-actions')?.querySelector('.n-button') as HTMLElement
    button.click()
    expect(test.value).toEqual([1629216000000, 1631203200000])
    wrapper.unmount()
  })
})
