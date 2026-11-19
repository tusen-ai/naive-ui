import { page } from 'vitest/browser'
import { createApp, h } from 'vue'
import { NConfigProvider } from '../../config-provider'
import { NRadioButton, NRadioGroup } from '../index'

describe('n-radio-group button hover border', () => {
  it('applies the theme override only to hovered, enabled, unchecked buttons', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    const app = createApp(() =>
      h(
        NConfigProvider,
        {
          themeOverrides: {
            Radio: {
              buttonBorderColor: '#123456',
              buttonBorderColorActive: '#234567',
              buttonBorderColorHover: '#abcdef'
            }
          }
        },
        () => [
          h('p', 'Outside the radio group'),
          h(NRadioGroup, { value: 'checked' }, () => [
            h(NRadioButton, { label: 'Unchecked', value: 'unchecked' }),
            h(NRadioButton, { label: 'Checked', value: 'checked' }),
            h(NRadioButton, {
              disabled: true,
              label: 'Disabled',
              value: 'disabled'
            })
          ])
        ]
      )
    )
    app.mount(host)

    function topBorderColor(label: string): string {
      const button = page
        .getByText(label, { exact: true })
        .element()
        .closest('label')!
      return getComputedStyle(button).borderTopColor
    }

    try {
      const outside = page.getByText('Outside the radio group')
      await outside.hover()
      expect(topBorderColor('Unchecked')).toBe('rgb(18, 52, 86)')

      await page.getByText('Checked', { exact: true }).hover()
      expect(topBorderColor('Checked')).toBe('rgb(35, 69, 103)')
      await page.getByText('Disabled').hover()
      expect(topBorderColor('Disabled')).toBe('rgb(18, 52, 86)')

      await page.getByText('Unchecked').hover()
      await expect
        .poll(() => topBorderColor('Unchecked'))
        .toBe('rgb(171, 205, 239)')
      await outside.hover()
      await expect
        .poll(() => topBorderColor('Unchecked'))
        .toBe('rgb(18, 52, 86)')
    }
    finally {
      app.unmount()
      host.remove()
    }
  })
})
