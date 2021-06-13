import { h, HTMLAttributes } from 'vue'
import { mount } from '@vue/test-utils'
import { NDataTable } from '../index'
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
    const data: any = []
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data}>
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
})
