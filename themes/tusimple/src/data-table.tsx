import { h } from 'vue'
import { CaretUpOutline, CaretDownOutline } from '@vicons/ionicons5'
import type { DataTableRenderFilter, DataTableRenderSorter } from 'naive-ui'

export const renderSorter: DataTableRenderSorter = ({ order }) => {
  const chevronStyle = {
    height: '16px',
    width: '16px',
    marginBottom: '-5px',
    transition: 'fill .3s cubic-bezier(.4, 0, .2, 1)'
  }
  return h(
    'div',
    {
      style: {
        marginLeft: '8px',
        display: 'inline-block',
        lineHeight: '0',
        width: '16px',
        verticalAlign: '-0.15em'
      }
    },
    [
      h(CaretUpOutline, {
        style: {
          ...chevronStyle,
          marginTop: '-4px',
          color:
            order === 'ascend'
              ? 'var(--n-th-icon-color-active)'
              : 'var(--n-th-icon-color)'
        }
      }),
      h(CaretDownOutline, {
        style: {
          ...chevronStyle,
          color:
            order === 'descend'
              ? 'var(--n-th-icon-color-active)'
              : 'var(--n-th-icon-color)'
        }
      })
    ]
  )
}

export const renderFilter: DataTableRenderFilter = ({ active, show }) => {
  const fill =
    active || show ? 'var(--n-th-icon-color-active)' : 'var(--n-th-icon-color)'
  return (
    <div
      style={{
        display: 'inline-block',
        marginLeft: '8px',
        height: '20px',
        width: '20px',
        lineHeight: '0',
        verticalAlign: '-0.15em',
        cursor: 'pointer'
      }}
    >
      <svg
        style={{
          fill,
          height: '20px',
          width: '20px',
          marginBottom: '-2px',
          transition: 'fill .3s cubic-bezier(.4, 0, .2, 1)'
        }}
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <g transform="translate(-614.000000, -4051.000000)">
            <g transform="translate(71.000000, 3416.000000)">
              <g transform="translate(49.000000, 562.000000)">
                <g transform="translate(0.000000, 62.000000)">
                  <g transform="translate(433.000000, 11.000000)">
                    <path d="M78.9382739,3 C79.3793623,3 79.8080782,3.14581571 80.1576954,3.41475202 C80.9894283,4.05454654 81.1788319,5.21979947 80.6182784,6.08536419 L80.5235219,6.21942152 L74.9997261,13.4 L75,21.190983 C75,21.4671254 74.7761424,21.690983 74.5,21.690983 C74.4223775,21.690983 74.3458209,21.6729105 74.2763932,21.6381966 L71.5527864,20.2763932 C71.2140024,20.1070012 71,19.7607381 71,19.381966 L70.9997261,13.4 L65.4764781,6.21942152 C65.2459613,5.91974963 65.1059004,5.56196436 65.0705874,5.18808583 L65.0617261,5 C65.0617261,3.9456382 65.8776039,3.08183488 66.9124637,3.00548574 L67.0617261,3 L78.9382739,3 Z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
