import { h, HTMLAttributes, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { DataTableInst, NDataTable } from '../index'
import type { DataTableColumns } from '../index'
import { NButton, NButtonGroup } from '../../button'

describe('n-data-table', () => {
  it('should work with import on demand', () => {
    mount(NDataTable)
  })
  it('show custom empty', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={[]}>
        {{
          empty: () => <div class="empty-info">empty</div>
        }}
      </NDataTable>
    ))
    expect(wrapper.find('.empty-info').exists()).toEqual(true)
  })
  describe('props.columns', () => {
    it('has correct type', () => {
      interface Data {
        collegeID: number
        collegeName: string
      }
      const data: Data[] = [
        {
          collegeID: 1,
          collegeName: 'Peking University'
        }
      ]
      const createRowKey = (row: Data): number => row.collegeID
      const createRowClassName = (row: Data): string => 'star kirby'
      const createRowProps = (row: Data): HTMLAttributes => ({
        style: { color: 'red' }
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const createSummary = (pageData: Data[]) => {
        return {
          collegeID: {
            value: pageData.reduce(
              (prevValue, row) => prevValue + row.collegeID,
              0
            ),
            colSpan: 3
          }
        }
      }
      const columns: DataTableColumns<Data> = [
        {
          title: 'collegeID',
          key: 'collegeID',
          align: 'center',
          sorter: (row1, row2) => row1.collegeID - row2.collegeID
        },
        {
          title: 'collegeName',
          key: 'collegeName',
          align: 'center',
          defaultSortOrder: 'ascend'
        },
        {
          title: '操作',
          key: 'actions',
          render (row) {
            return (
              <NButtonGroup>
                {{
                  default: () => {
                    return (
                      [
                        {
                          text: '修改',
                          type: 'warning'
                        },
                        {
                          text: '删除',
                          type: 'error'
                        }
                      ] as const
                    ).map(({ type, text }) => (
                      <NButton type={type} round dashed>
                        {{ default: () => text }}
                      </NButton>
                    ))
                  }
                }}
              </NButtonGroup>
            )
          }
        }
      ]
      mount(() => (
        <NDataTable
          columns={columns}
          data={data}
          rowKey={createRowKey}
          rowClassName={createRowClassName}
          rowProps={createRowProps}
          summary={createSummary}
        />
      )).unmount()
    })
  })
  it('should work with `itemCount` without `remote`', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const pagination = {
      page: 1,
      pageCount: 1,
      pageSize: 10,
      itemCount: 0,
      prefix ({ itemCount }: { itemCount: number | undefined }) {
        return itemCount
      }
    }
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} pagination={pagination} />
    ))
    expect(wrapper.find('.n-pagination-prefix').text()).toEqual('978')
  })

  it('should work with `itemCount` with `remote`', async () => {
    const onPageChange = jest.fn((page: number): void => {
      setTimeout(() => {
        pagination.page = page
        pagination.itemCount = data.length
        data = data.slice(
          (page - 1) * pagination.pageSize,
          page * pagination.pageSize
        )
      }, 1000)
    })
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    let data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const pagination = {
      page: 1,
      pageSize: 10,
      itemCount: 978,
      prefix ({ itemCount }: { itemCount: number | undefined }) {
        return itemCount
      }
    }
    const wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        pagination={pagination}
        remote
        onUpdatePage={onPageChange}
      />
    ))
    await void wrapper.findAll('.n-pagination-item')[2].trigger('click')
    await nextTick()
    expect(onPageChange).toHaveBeenCalled()
    expect(wrapper.find('.n-pagination-prefix').text()).toEqual('978')
  })

  it('should work with `bordered` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--bordered'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} bordered={false} />
    ))
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--bordered'
    )
  })

  it('should work with `bottom-bordered` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => (
      <NDataTable columns={columns} data={data} bordered={false} />
    ))
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--bottom-bordered'
    )

    wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        bordered={false}
        bottom-bordered={false}
      />
    ))
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--bottom-bordered'
    )
  })

  it('should work with `loading` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-base-loading').exists()).not.toBe(true)

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} loading={true} />
    ))
    expect(wrapper.find('.n-base-loading').exists()).toBe(true)
  })

  it('should work with `flex-height` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--flex-height'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} flexHeight={true} />
    ))
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--flex-height'
    )
  })

  it('should work with `row-class-name` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const getRowClassName = (rowData: any, index: number): string => {
      return `${index}-test`
    }
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('tbody .n-data-table-tr').classes()).not.toContain(
      'test'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} rowClassName="test" />
    ))
    expect(wrapper.find('tbody .n-data-table-tr').classes()).toContain('test')

    wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        rowClassName={getRowClassName}
      />
    ))
    expect(wrapper.find('tbody .n-data-table-tr').classes()).toContain('0-test')
  })
  it('should work with multiple sorter uncontrolled', async () => {
    interface UserData {
      name: string
      age: number
      address: string
      chinese: number
      math: number
      english: number
    }
    const columns: DataTableColumns<UserData> = [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: () => h('span', { id: 'age-title' }, 'Age'),
        className: 'age-col',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: () => <span id="chinese-title">Chinese Score</span>,
        key: 'chinese',
        defaultSortOrder: false,
        className: 'chinese-col',
        sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3
        }
      },
      {
        title: () => <span id="math-title">Math Score</span>,
        defaultSortOrder: false,
        className: 'math-col',
        key: 'math',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2
        }
      },
      {
        title: () => <span id="english-title">English Score</span>,
        className: 'english-col',
        defaultSortOrder: false,
        key: 'english',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1
        }
      },
      {
        title: 'Address',
        key: 'address',
        filterOptions: [
          {
            label: 'London',
            value: 'London'
          },
          {
            label: 'New York',
            value: 'New York'
          },
          {
            label: 'Sidney',
            value: 'Sidney'
          }
        ],
        filter (value: any, row) {
          return row.address.includes(value)
        }
      }
    ]

    const data = [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        chinese: 98,
        math: 60,
        english: 70
      },
      {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        chinese: 98,
        math: 66,
        english: 89
      },
      {
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        chinese: 98,
        math: 66,
        english: 89
      },
      {
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        chinese: 88,
        math: 99,
        english: 89
      }
    ]
    const tableRef = ref<DataTableInst | null>(null)
    const wrapper = mount(
      () => <NDataTable ref={tableRef} columns={columns} data={data} />,
      {
        attachTo: document.body
      }
    )
    const checkIsMatched = async (
      colClassName: string,
      target: number[]
    ): Promise<boolean> => {
      const cols = await wrapper.findAll(colClassName)
      const colNums = cols.slice(1).map((item) => Number(item.text()))
      const matchResult = String(colNums) === String(target)
      if (!matchResult) {
        console.log(colClassName, String(colNums), String(target))
      }
      return String(colNums) === String(target)
    }
    const checkScoreIsMatched = async (
      targets: [number[], number[], number[]]
    ): Promise<boolean> => {
      const matchResult =
        (await checkIsMatched('.chinese-col', targets[0])) &&
        (await checkIsMatched('.math-col', targets[1])) &&
        (await checkIsMatched('.english-col', targets[2]))

      return matchResult
    }
    const chineseDom: HTMLElement | null =
      document.querySelector('#chinese-title')
    const mathDom: HTMLElement | null = document.querySelector('#math-title')
    const englishDom: HTMLElement | null =
      document.querySelector('#english-title')
    const ageDom: HTMLElement | null = document.querySelector('#age-title')

    it('chinese: descend, math: false, english: false', async () => {
      chineseDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [60, 66, 66, 99],
          [70, 89, 89, 89]
        ])
      ).toEqual(true)
    })
    it('chinese: descend, math: descend, english: false', async () => {
      mathDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: descend, math: descend, english: descend', async () => {
      englishDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: ascend, math: descend, english: descend', async () => {
      chineseDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [88, 98, 98, 98],
          [99, 66, 66, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: descend, english: descend', async () => {
      chineseDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [88, 98, 98, 98],
          [99, 66, 66, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: ascend, english: descend', async () => {
      mathDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [60, 66, 66, 99],
          [70, 89, 89, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: false, english: descend', async () => {
      mathDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 88, 98],
          [66, 66, 99, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: descend, math: false, english: descend', async () => {
      chineseDom?.click()
      await nextTick()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('filter: Sidney and New York', async () => {
      if (tableRef.value) {
        tableRef.value.filter({
          address: ['Sidney', 'New York']
        })
      }
      await nextTick()
      const result = await checkScoreIsMatched([
        [98, 98],
        [66, 60],
        [89, 70]
      ])
      expect(result).toEqual(true)
      if (tableRef.value) {
        tableRef.value.filter(null)
      }
    })

    it('age: descend', async () => {
      ageDom?.click()
      await nextTick()
      const result =
        (await checkIsMatched('.age-col', [42, 32, 32, 32])) &&
        (await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 60, 66, 99],
          [89, 70, 89, 89]
        ]))
      expect(result).toEqual(true)
    })
  })
})
