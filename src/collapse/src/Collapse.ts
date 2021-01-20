import {
  computed,
  h,
  defineComponent,
  PropType,
  toRef,
  reactive,
  provide
} from 'vue'
import { intersection } from 'lodash-es'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warn } from '../../_utils'
import { collapseLight, CollapseTheme } from '../styles'
import style from './styles/index.cssr'

export interface NCollapseInjection {
  arrowPlacement: 'left' | 'right'
  displayDirective: 'if' | 'show'
  expandedNames: string | string[]
  collectedItemNames: string[]
  toggleItem: (collapse: boolean, name: string, event: MouseEvent) => void
}

export default defineComponent({
  name: 'Collapse',
  props: {
    ...(useTheme.props as ThemeProps<CollapseTheme>),
    expandedNames: {
      type: [Array, String] as PropType<string | string[]>,
      default: undefined
    },
    arrowPlacement: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      type: String as PropType<'if' | 'show'>,
      default: 'if'
    },
    onItemHeaderClick: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:expandedNames': {
      type: Function as PropType<(expandedNames: string[]) => void>,
      default: undefined
    },
    // deprecated
    onExpandedNamesChange: {
      type: Function,
      validator: () => {
        if (__DEV__) {
          warn(
            'collapse',
            '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const collectedItemNames: string[] = []
    const themeRef = useTheme(
      'Collapse',
      'Collapse',
      style,
      collapseLight,
      props
    )
    function doUpdateExpandedNames (names: string[]): void {
      const {
        'onUpdate:expandedNames': updateExpandedNames,
        onExpandedNamesChange
      } = props
      if (updateExpandedNames) call(updateExpandedNames, names)
      if (onExpandedNamesChange) call(onExpandedNamesChange, names)
    }
    function doItemHeaderClick (info: {
      name: string
      expanded: boolean
      event: MouseEvent
    }): void {
      const { onItemHeaderClick } = props
      if (onItemHeaderClick) call(onItemHeaderClick, info)
    }
    function toggleItem (
      collapse: boolean,
      name: string,
      event: MouseEvent
    ): void {
      const { accordion, expandedNames } = props
      if (accordion) {
        if (collapse) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        } else {
          doUpdateExpandedNames([])
          doItemHeaderClick({ name, expanded: false, event })
        }
      } else {
        if (!Array.isArray(expandedNames)) {
          doUpdateExpandedNames([name])
          doItemHeaderClick({ name, expanded: true, event })
        } else {
          const activeNames = intersection(expandedNames, collectedItemNames)
          const index = activeNames.findIndex(
            (activeName) => name === activeName
          )
          if (~index) {
            activeNames.splice(index, 1)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: false, event })
          } else {
            activeNames.push(name)
            doUpdateExpandedNames(activeNames)
            doItemHeaderClick({ name, expanded: true, event })
          }
        }
      }
    }
    provide<NCollapseInjection>(
      'NCollapse',
      reactive({
        arrowPlacement: toRef(props, 'arrowPlacement'),
        displayDirective: toRef(props, 'displayDirective'),
        expandedNames: toRef(props, 'expandedNames'),
        collectedItemNames,
        toggleItem
      })
    )
    return {
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            titleFontWeight,
            dividerColor,
            titleTextColor,
            textColor,
            arrowColor,
            fontSize,
            titleFontSize
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--divider-color': dividerColor,
          '--title-font-size': titleFontSize,
          '--title-text-color': titleTextColor,
          '--title-font-weight': titleFontWeight,
          '--arrow-color': arrowColor
        }
      })
    }
  },
  render () {
    return h(
      'div',
      {
        class: 'n-collapse',
        style: this.cssVars
      },
      this.$slots
    )
  }
})
