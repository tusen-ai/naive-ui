import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NInput } from '../../input'
import { NForm, NFormItem } from '../index'

describe('n-form', () => {
  it('should work with import on demand', () => {
    mount(NForm)
  })
  describe('require mark', () => {
    it("doesn't show by default", () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        false
      )
    })
    it('shows when props.showRequireMark is set', () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem showRequireMark label="star kirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
    })
    it('shows when required rule is set in form', () => {
      const wrapper = mount(() => (
        <NForm rules={{ starKirby: { required: true } }}>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby" path="starKirby">
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
    })
    it('shows when required rule is set in form item', () => {
      const wrapper = mount(() => (
        <NForm>
          {{
            default: () => {
              return (
                <NFormItem label="star kirby" rule={{ required: true }}>
                  {{
                    default: () => <NInput />
                  }}
                </NFormItem>
              )
            }
          }}
        </NForm>
      ))
      expect(wrapper.find('.n-form-item-label__asterisk').exists()).toEqual(
        true
      )
    })
  })
})
