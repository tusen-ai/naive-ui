import {
  computed,
  h,
  defineComponent,
  PropType,
  toRef,
  reactive,
  provide,
  ref
} from 'vue'
import { intersection } from 'lodash-es'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warn } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { collapseLight, CollapseTheme } from '../styles'
import style from './styles/index.cssr'
import { useMergedState } from 'vooks'
import {
  OnItemHeaderClick,
  OnUpdateExpandedNames,
  OnUpdateExpandedNamesImpl,
  HeaderClickInfo,
  OnItemHeaderClickImpl
} from './interface'

export interface NCollapseInjection {
  arrowPlacement: 'left' | 'right'
  displayDirective: 'if' | 'show'
  expandedNames: string | number | Array<string | number> | null
  collectedItemNames: Array<string | number>
  toggleItem: (
    collapse: boolean,
    name: string | number,
    event: MouseEvent
  ) => void
}

export default defineComponent({
  name: 'Collapse',
  props: {
    ...(useTheme.props as ThemeProps<CollapseTheme>),
    defaultExpandesNames: [Array, String] as PropType<
    string | number | Array<string | number> | null
    >,
    expandedNames: [Array, String] as PropType<
    string | number | Array<string | number> | null
    >,
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
    onItemHeaderClick: [Function, Array] as PropType<
    MaybeArray<OnItemHeaderClick>
    >,
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:expandedNames': [Function, Array] as PropType<
    MaybeArray<OnUpdateExpandedNames>
    >,
    onUpdateExpandedNames: [Function, Array] as PropType<
    MaybeArray<OnUpdateExpandedNames>
    >,
    // deprecated
    onExpandedNamesChange: {
      type: [Function, Array] as PropType<
      MaybeArray<OnUpdateExpandedNames> | undefined
      >,
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
    const uncontrolledExpandedNamesRef = ref<
    string | number | Array<string | number> | null
    >(null)
    const controlledExpandedNamesRef = computed(() => props.expandedNames)
    const mergedExpandedNames = useMergedState(
      controlledExpandedNamesRef,
      uncontrolledExpandedNamesRef
    )
    const collectedItemNames: string[] = []
    const themeRef = useTheme(
      'Collapse',
      'Collapse',
      style,
      collapseLight,
      props
    )
    function doUpdateExpandedNames (
      names: Array<string | number> | string | number
    ): void {
      const {
        'onUpdate:expandedNames': _onUpdateExpandedNames,
        onUpdateExpandedNames,
        onExpandedNamesChange
      } = props
      if (onUpdateExpandedNames) {
        call(onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (_onUpdateExpandedNames) {
        call(_onUpdateExpandedNames as OnUpdateExpandedNamesImpl, names)
      }
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange as OnUpdateExpandedNamesImpl, names)
      }
      uncontrolledExpandedNamesRef.value = names
    }
    function doItemHeaderClick<T extends string | number> (
      info: HeaderClickInfo<T>
    ): void {
      const { onItemHeaderClick } = props
      if (onItemHeaderClick) {
        call(onItemHeaderClick as OnItemHeaderClickImpl, info)
      }
    }
    function toggleItem (
      collapse: boolean,
      name: string | number,
      event: MouseEvent
    ): void {
      const { accordion } = props
      const { value: expandedNames } = mergedExpandedNames
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
        expandedNames: mergedExpandedNames,
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
