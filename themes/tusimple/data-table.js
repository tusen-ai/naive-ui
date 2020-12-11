import { h } from 'vue'
import FilterIcon from './filter.vue'
import {
  CaretUpOutline,
  CaretDownOutline
} from '@vicons/ionicons-v5'
import { normalTypedColor } from './color'
import { GRAY_COLOR_4 } from './const'

export function renderSorter ({
  order
}) {
  const chevronStyle = {
    height: '16px',
    width: '16px',
    marginBottom: '-4px',
    transition: 'fill .3s cubic-bezier(.4, 0, .2, 1)'
  }
  return h('div', {
    style: {
      marginLeft: '8px',
      display: 'inline-block',
      lineHeight: '0',
      width: '16px',
      verticalAlign: '-0.15em'
    }
  }, [
    h(CaretUpOutline, {
      style: {
        ...chevronStyle,
        marginTop: '-4px',
        fill: order === 'ascend' ? normalTypedColor.normalSuccess : GRAY_COLOR_4
      }
    }),
    h(CaretDownOutline, {
      style: {
        ...chevronStyle,
        fill: order === 'descend' ? normalTypedColor.normalSuccess : GRAY_COLOR_4
      }
    })
  ])
}

export function renderFilter ({
  active,
  show
}) {
  const fill = (active || show) ? normalTypedColor.normalSuccess : GRAY_COLOR_4
  return h('div', {
    style: {
      display: 'inline-block',
      marginLeft: '8px',
      height: '20px',
      width: '20px',
      lineHeight: '0',
      verticalAlign: '-0.15em',
      cursor: 'pointer'
    }
  }, [
    h(FilterIcon, {
      style: {
        fill,
        height: '20px',
        width: '20px',
        transition: 'fill .3s cubic-bezier(.4, 0, .2, 1)'
      }
    })
  ])
}
