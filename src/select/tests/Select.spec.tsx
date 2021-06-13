import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NSelect, SelectProps } from '../index'

describe('n-select', () => {
  it('should work with import on demand', () => {
    mount(NSelect)
  })
  describe('props.option', () => {
    it('has correct type', () => {
      const options: SelectProps['options'] = [
        {
          label: 'cool1',
          value: 'cool1'
        },
        {
          type: 'group',
          label: 'cool',
          key: 'group cool',
          children: [
            {
              label: 'cool2',
              value: 'cool2'
            }
          ]
        }
      ]
      mount(() => <NSelect options={options} />).unmount()
    })
  })
})
