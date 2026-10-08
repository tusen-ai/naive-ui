import { createApp, h, nextTick, ref } from 'vue'
import { NConfigProvider } from '../../config-provider'
import { darkTheme } from '../../themes'
import { NDataTable } from '../index'

for (const theme of [null, darkTheme]) {
  for (const singleColumn of [false, true]) {
    it(`keeps the column border color stable in ${theme ? 'dark' : 'light'} mode with singleColumn=${singleColumn}`, async () => {
      const host = document.createElement('div')
      document.body.append(host)
      const singleLine = ref(true)
      const app = createApp({
        render: () => (
          <NConfigProvider theme={theme}>
            <NDataTable
              singleLine={singleLine.value}
              singleColumn={singleColumn}
              columns={[
                { title: 'Name', key: 'name' },
                { title: 'Age', key: 'age' }
              ]}
              data={[
                { key: 1, name: 'Alice', age: 28 },
                { key: 2, name: 'Bob', age: 32 }
              ]}
            />
          </NConfigProvider>
        )
      })
      app.mount(host)

      try {
        await nextTick()
        const cell = host.querySelector<HTMLElement>('.n-data-table-td')!
        const expectedColor = getComputedStyle(cell).borderBottomColor
        expect(expectedColor).not.toBe(getComputedStyle(cell).color)
        expect(getComputedStyle(cell).borderRightWidth).toBe('0px')

        for (const visible of [true, false, true]) {
          singleLine.value = !visible
          await nextTick()
          // Flush styles at the start of the transition, before a flash can settle.
          const style = getComputedStyle(cell)
          expect(style.borderRightWidth).toBe(visible ? '1px' : '0px')
          expect(style.borderRightColor).toBe(expectedColor)
          expect(style.borderBottomWidth).toBe(singleColumn ? '0px' : '1px')
        }
      }
      finally {
        app.unmount()
        host.remove()
      }
    })
  }
}
