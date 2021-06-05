import {
  computed,
  h,
  defineComponent,
  PropType,
  provide,
  ref,
  InjectionKey,
  Ref,
  ExtractPropTypes,
  CSSProperties,
  Slots
} from 'vue'
import { intersection } from 'lodash-es'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, ExtractPublicPropTypes, warn } from '../../_utils'
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

const collapseProps = {
  ...(useTheme.props as ThemeProps<CollapseTheme>),
  defaultExpandedNames: {
    type: [Array, String] as PropType<
    string | number | Array<string | number> | null
    >,
    default: null
  },
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
} as const

export type CollapseProps = ExtractPublicPropTypes<typeof collapseProps>

export interface NCollapseInjection {
  props: ExtractPropTypes<typeof collapseProps>
  expandedNamesRef: Ref<string | number | Array<string | number> | null>
  mergedClsPrefixRef: Ref<string>
  collectedItemNames: Array<string | number>
  slots: Slots
  toggleItem: (
    collapse: boolean,
    name: string | number,
    event: MouseEvent
  ) => void
}

export const collapseInjectionKey: InjectionKey<NCollapseInjection> =
  Symbol('collapse')

export default defineComponent({
  name: 'Collapse',
  props: collapseProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const uncontrolledExpandedNamesRef = ref<
    string | number | Array<string | number> | null
    >(props.defaultExpandedNames)
    const controlledExpandedNamesRef = computed(() => props.expandedNames)
    const mergedExpandedNamesRef = useMergedState(
      controlledExpandedNamesRef,
      uncontrolledExpandedNamesRef
    )
    const collectedItemNames: string[] = []
    const themeRef = useTheme(
      'Collapse',
      'Collapse',
      style,
      collapseLight,
      props,
      mergedClsPrefixRef
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
      const { value: expandedNames } = mergedExpandedNamesRef
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
    provide(collapseInjectionKey, {
      props,
      mergedClsPrefixRef,
      expandedNamesRef: mergedExpandedNamesRef,
      collectedItemNames,
      slots,
      toggleItem
    })
    return {
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
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
    return (
      <div
        class={`${this.mergedClsPrefix}-collapse`}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
