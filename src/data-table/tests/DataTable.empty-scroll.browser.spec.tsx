import type { DataTableColumns } from '../index'
import { locators, page } from 'vitest/browser'
import { createApp, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { NDataTable } from '../index'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByClass: (className: string) => import('vitest/browser').Locator
  }
}

locators.extend({
  getByClass(className: string) {
    return `.${className}`
  }
})

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Row',
    key: 'row',
    render(_row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row1',
    key: 'row1',
    render(_row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row2',
    key: 'row2',
    render(_row, index) {
      return h('span', ['row ', index])
    },
    width: 100,
    fixed: 'right'
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

const rows: RowData[] = Array.from({ length: 80 }, (_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

const storedScrollLeft = 360

interface MountOptions {
  virtualScroll?: boolean
  maxHeight?: number
  flexHeight?: boolean
}

async function mountTable(options: MountOptions = {}) {
  const { virtualScroll = true, maxHeight = 250, flexHeight = false } = options
  await page.viewport(800, 600)

  const host = document.createElement('div')
  host.style.width = '640px'
  if (flexHeight) {
    host.style.height = '400px'
    host.style.display = 'flex'
    host.style.flexDirection = 'column'
  }
  document.body.append(host)

  const data = ref(rows)

  const App = defineComponent({
    setup() {
      return () => (
        <div
          style={
            flexHeight
              ? 'flex: 1; min-height: 0; display: flex; flex-direction: column'
              : undefined
          }
        >
          <button
            type="button"
            onClick={() => {
              data.value = data.value.length ? [] : rows
            }}
          >
            Toggle
          </button>
          <NDataTable
            columns={columns}
            data={data.value}
            maxHeight={flexHeight ? undefined : maxHeight}
            flexHeight={flexHeight}
            scrollX={1800}
            virtualScroll={virtualScroll}
            style={flexHeight ? 'flex: 1' : undefined}
          />
        </div>
      )
    }
  })

  const app = createApp(App)
  app.mount(host)

  await nextTick()
  await expect
    .element(page.getByRole('button', { name: 'Toggle' }))
    .toBeVisible()
  await expect.element(page.getByText('Edward King 0')).toBeVisible()

  return {
    data,
    async getHeader(): Promise<HTMLElement> {
      return (await page
        .getByClass('n-data-table-base-table-header')
        .findElement()) as HTMLElement
    },
    async getBody(): Promise<HTMLElement> {
      const virtualBody = page.getByClass('v-vl').query()
      if (virtualBody)
        return virtualBody as HTMLElement
      return (await page
        .getByClass('n-scrollbar-container')
        .findElement()) as HTMLElement
    },
    async toggle(): Promise<void> {
      await page.getByRole('button', { name: 'Toggle' }).click()
    },
    unmount() {
      app.unmount()
      host.remove()
    }
  }
}

async function expectHeaderScrollable(header: HTMLElement): Promise<void> {
  await expect.poll(() => header.clientWidth).toBeGreaterThan(100)
  await expect
    .poll(() => header.scrollWidth - header.clientWidth)
    .toBeGreaterThan(100)
}

async function scrollHeaderTo(
  header: HTMLElement,
  left: number
): Promise<void> {
  header.scrollLeft = left
  await expect.poll(() => header.scrollLeft).toBe(left)
}

describe('n-data-table empty scroll (browser)', () => {
  it('keeps header horizontal scroll when virtual-scroll data becomes empty', async () => {
    const table = await mountTable({ virtualScroll: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll when empty virtual-scroll data is restored', async () => {
    const table = await mountTable({ virtualScroll: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()
      await table.toggle()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
      const body = await table.getBody()
      await expect.poll(() => body.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll after data -> empty -> data', async () => {
    const table = await mountTable({ virtualScroll: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()
      await expect
        .poll(async () => (await table.getHeader()).scrollLeft)
        .toBe(storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()
      await expect
        .poll(async () => (await table.getHeader()).scrollLeft)
        .toBe(storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()
      await expect
        .poll(async () => (await table.getHeader()).scrollLeft)
        .toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll when non-virtual data becomes empty', async () => {
    const table = await mountTable({ virtualScroll: false })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll when flex-height data becomes empty', async () => {
    const table = await mountTable({ virtualScroll: true, flexHeight: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll after body x-scroll then empty', async () => {
    const table = await mountTable({ virtualScroll: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)

      const body = await table.getBody()
      await expect
        .poll(() => body.scrollWidth - body.clientWidth)
        .toBeGreaterThan(100)
      body.scrollLeft = storedScrollLeft
      await expect.poll(() => body.scrollLeft).toBe(storedScrollLeft)
      await expect.poll(() => header.scrollLeft).toBe(storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      table.unmount()
    }
  })

  it('still allows header x-scroll after data becomes empty', async () => {
    const table = await mountTable({ virtualScroll: true })
    try {
      const header = await table.getHeader()
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await table.toggle()
      await expect.element(page.getByClass('n-data-table-empty')).toBeVisible()

      const headerAfter = await table.getHeader()
      await expectHeaderScrollable(headerAfter)
      await scrollHeaderTo(headerAfter, 120)
      expect(headerAfter.scrollLeft).toBe(120)
    }
    finally {
      table.unmount()
    }
  })

  it('keeps header horizontal scroll after keep-alive keyed toggle back', async () => {
    await page.viewport(800, 600)

    const host = document.createElement('div')
    host.style.width = '640px'
    document.body.append(host)

    const manyRows = rows.slice(0, 40)
    const fewRows: RowData[] = [
      {
        key: 0,
        name: 'Single Row',
        age: 32,
        address: 'London, Park Lane no. 0'
      }
    ]

    const Demo = defineComponent({
      name: 'KeepAliveScrollDemo',
      props: {
        name: {
          type: String,
          required: true
        }
      },
      setup(props) {
        return () => (
          <NDataTable
            columns={columns}
            data={props.name === '1' ? manyRows : fewRows}
            maxHeight={250}
            scrollX={1800}
            virtualScroll
          />
        )
      }
    })

    const name = ref('1')
    const App = defineComponent({
      setup() {
        return () => (
          <div>
            <button
              type="button"
              onClick={() => {
                name.value = name.value === '1' ? '2' : '1'
              }}
            >
              Toggle
            </button>
            <KeepAlive>
              <Demo key={name.value} name={name.value} />
            </KeepAlive>
          </div>
        )
      }
    })

    const app = createApp(App)
    app.mount(host)

    try {
      await nextTick()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()

      const header = (await page
        .getByClass('n-data-table-base-table-header')
        .findElement()) as HTMLElement
      await expectHeaderScrollable(header)
      await scrollHeaderTo(header, storedScrollLeft)

      await page.getByRole('button', { name: 'Toggle' }).click()
      await expect.element(page.getByText('Single Row')).toBeVisible()

      await page.getByRole('button', { name: 'Toggle' }).click()
      await expect.element(page.getByText('Edward King 0')).toBeVisible()

      const headerAfter = (await page
        .getByClass('n-data-table-base-table-header')
        .findElement()) as HTMLElement
      await expect.poll(() => headerAfter.scrollLeft).toBe(storedScrollLeft)
    }
    finally {
      app.unmount()
      host.remove()
    }
  })
})
