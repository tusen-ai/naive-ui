import type { FunctionalComponent, PropType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { SegmentTheme } from '../styles'
import type {
  OnUpdateValue,
  OnUpdateValueImpl,
  SegmentItemType,
  SegmentSize
} from './interface'
import { useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  toRef,
  watch
} from 'vue'
import {
  useConfig,
  useFormItem,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  call,
  createKey,
  type MaybeArray,
  resolveSlotWithTypedProps
} from '../../_utils'
import { segmentLight } from '../styles'
import style from './styles/index.cssr'

export type segmentValueType = string | number | boolean | null

export const segmentProps = {
  ...(useTheme.props as ThemeProps<SegmentTheme>),
  options: {
    type: Array<SegmentItemType>,
    default: []
  },
  value: {
    type: [String, Number, Boolean] as PropType<segmentValueType>,
    default: undefined
  },
  defaultValue: {
    type: [String, Number, Boolean] as PropType<segmentValueType>,
    default: null
  },
  size: String as PropType<SegmentSize>,
  vertical: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  block: {
    type: Boolean,
    default: false
  },
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const

export default defineComponent({
  name: 'Segment',
  props: segmentProps,
  setup(props) {
    const groupRef = ref<HTMLDivElement | null>(null)
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef }
      = useConfig(props)
    const themeRef = useTheme(
      'Segment',
      '-segment',
      style,
      segmentLight,
      props,
      mergedClsPrefixRef
    )

    const formItem = useFormItem(props)
    const {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormChange,
      nTriggerFormInput,
      nTriggerFormBlur,
      nTriggerFormFocus
    } = formItem

    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          color,
          textColor,
          textColorDisabled,
          segmentHoverBg,
          lineHeight,
          segmentCapsuleColorSegment,
          segmentPadding,
          [createKey('segmentPaddingVertical', `${size}`)]:
            segmentPaddingVertical,
          [createKey('height', size)]: height,
          [createKey('borderRadius', size)]: borderRadius,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value
      return {
        '--n-padding': segmentPadding,
        '--n-color': color,
        '--n-font-size': fontSize,
        '--n-height': height,
        '--n-line-height': lineHeight,
        '--n-border-radius': borderRadius,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-segment-capsule-color': segmentCapsuleColorSegment,
        '--n-segment-item-hover': segmentHoverBg,
        '--n-segment-item-padding': segmentPaddingVertical
      }
    })

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    function doUpdateValue(value: string | number | boolean): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }

    function handleFocusin(e: FocusEvent): void {
      const { value: selfEl } = groupRef
      if (!selfEl)
        return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null))
        return
      nTriggerFormFocus()
    }
    function handleFocusout(e: FocusEvent): void {
      const { value: selfEl } = groupRef
      if (!selfEl)
        return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null))
        return
      nTriggerFormBlur()
    }

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('segment', mergedSizeRef, cssVarsRef, props)
      : undefined

    const rtlEnabledRef = useRtl('Segment', mergedRtlRef, mergedClsPrefixRef)

    const segmentCapsuleElRef = ref<HTMLElement | null>(null)

    function getCurrentEl(): HTMLElement | null {
      const { value } = mergedValueRef
      if (value === null)
        return null
      const tabEl = groupRef.value?.querySelector(`[data-name="${value}"]`)
      return tabEl as HTMLElement | null
    }

    function updateSegmentPosition({
      transitionDisabled
    }: {
      transitionDisabled: boolean
    }): void {
      const tabsEl = groupRef.value
      if (!tabsEl)
        return
      if (transitionDisabled)
        tabsEl.classList.add('transition-disabled')
      const activeTabEl = getCurrentEl()
      if (activeTabEl && segmentCapsuleElRef.value) {
        segmentCapsuleElRef.value.style.width = `${activeTabEl.offsetWidth}px`
        segmentCapsuleElRef.value.style.height = `${activeTabEl.offsetHeight}px`

        if (props.vertical) {
          segmentCapsuleElRef.value.style.transform = `translateY(${
            activeTabEl.offsetTop
          }px)`
        }
        else {
          if (rtlEnabledRef?.value) {
            const parentWidth = tabsEl.offsetWidth
            const rightOffset
              = parentWidth - activeTabEl.offsetLeft - activeTabEl.offsetWidth
            segmentCapsuleElRef.value.style.transform = `translateX(${-rightOffset}px)`
          }
          else {
            segmentCapsuleElRef.value.style.transform = `translateX(${
              activeTabEl.offsetLeft
            }px)`
          }
        }

        if (transitionDisabled) {
          void segmentCapsuleElRef.value.offsetWidth
        }
      }
      if (transitionDisabled) {
        tabsEl.classList.remove('transition-disabled')
      }
    }

    watch([mergedValueRef], () => {
      void nextTick(() => {
        updateSegmentPosition({
          transitionDisabled: false
        })
      })
    })

    onMounted(() => {
      updateSegmentPosition({
        transitionDisabled: true
      })
    })

    return {
      groupRef,
      segmentCapsuleElRef,
      mergedDisabled: mergedDisabledRef,
      mergedValue: mergedValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      doUpdateValue,
      handleFocusout,
      handleFocusin
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedValue,
      mergedDisabled,
      block,
      rtlEnabled,
      vertical,
      cssVars,
      themeClass,
      doUpdateValue,
      handleFocusin,
      handleFocusout
    } = this

    const SegmentOption: FunctionalComponent<
      SegmentItemType & {
        checked?: boolean
      }
    > = (props) => {
      const { value, label, checked, disabled } = props
      const handleChange = () => {
        if (disabled) {
          return
        }
        doUpdateValue(value)
      }

      return (
        <label
          key={value}
          data-name={value}
          class={[
            `${mergedClsPrefix}-segment-item`,
            checked && `${mergedClsPrefix}-segment-item--checked`,
            disabled && `${mergedClsPrefix}-segment-item--disabled`
          ]}
        >
          <input
            class={[`${mergedClsPrefix}-segment-item-input`]}
            type="radio"
            disabled={disabled}
            checked={checked}
            onChange={handleChange}
          />

          <div class={[`${mergedClsPrefix}-segment-item-label`]} title={label}>
            {resolveSlotWithTypedProps(
              this.$slots.label,
              {
                value,
                label
              },
              () => [label]
            )}
          </div>
        </label>
      )
    }
    return (
      <div
        class={[
          `${mergedClsPrefix}-segment`,
          block && `${mergedClsPrefix}-segment--block`,
          rtlEnabled && `${mergedClsPrefix}-segment--rtl`,
          vertical && `${mergedClsPrefix}-segment--vertical`
        ]}
        style={cssVars}
      >
        <div
          ref="groupRef"
          class={[`${mergedClsPrefix}-segment-group`, themeClass]}
          onFocusin={handleFocusin}
          onFocusout={handleFocusout}
        >
          <div
            class={`${mergedClsPrefix}-segment-capsule`}
            ref="segmentCapsuleElRef"
          >
            <div class={`${mergedClsPrefix}-segment-wrapper`}>
              <div class={`${mergedClsPrefix}-segment-thumb`} />
            </div>
          </div>
          {this.options.map(segmentOption => (
            <SegmentOption
              key={segmentOption.value}
              {...segmentOption}
              checked={mergedValue === segmentOption.value}
              disabled={mergedDisabled || !!segmentOption.disabled}
            >
            </SegmentOption>
          ))}
        </div>
      </div>
    )
  }
})
