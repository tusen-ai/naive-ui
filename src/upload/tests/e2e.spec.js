import { test, expect } from '@playwright/test'
import path from 'path'

test.beforeEach(async ({ page }) => {
  await page.goto(
    `file://${path.resolve(__dirname, '..', '..', '_e2e', 'index.html')}`
  )
})

test('onBeforeUpload serializable', async ({ page }) => {
  await page.evaluate(() => {
    window.Vue.createApp({
      data () {
        return {
          fileList: []
        }
      },
      methods: {
        async deduplicateType ({ file, fileList }) {
          await new Promise((resolve) => {
            setTimeout(resolve, 0, [0])
          })
          return fileList.every(
            (previousFile) => previousFile.type !== file.type
          )
        }
      },
      components: {
        NUpload: window.naive.NUpload
      },
      template: `<div id="result">{{ fileList.length }}</div>
      <n-upload multiple v-model:file-list="fileList" @before-upload="deduplicateType">Upload</n-upload>`
    }).mount('#app')
  })

  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Upload').click()
  ])
  await fileChooser.setFiles(['README.md', 'CONTRIBUTING.md'])

  await expect(page.locator('#result')).toHaveText('1')
})
