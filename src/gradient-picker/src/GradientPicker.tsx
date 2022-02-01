import {
  h,
  defineComponent,
  ref,
  reactive,
  computed,
  PropType,
  toRef,
  watchEffect,
  VNode,
  withDirectives,
  Transition,
  CSSProperties,
  provide,
  Ref,
  watch,
  nextTick
} from 'vue'
import {
  hsv2rgb,
  rgb2hsv,
  rgba,
  hsva,
  hsla,
  hsl2hsv,
  hsv2hsl,
  rgb2hsl,
  hsl2rgb,
  toRgbaString,
  toHsvaString,
  toHslaString,
  HSVA,
  RGBA,
  HSLA,
  toHexaString,
  toHsvString,
  toRgbString,
  toHexString,
  toHslString
} from 'seemly'
import { useIsMounted, useMergedState } from 'vooks'
import { VBinder, VFollower, VTarget } from 'vueuc'
import { clickoutside } from 'vdirs'
import { gradientPickerLight } from '../styles'
import type { GradientPickerTheme } from '../styles'
import {
  ThemeProps,
  useFormItem,
  useConfig,
  useTheme,
  useLocale
} from '../../_mixins'
import { call, createKey, useAdjustedTo } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { NButton } from '../../button'
import HueSlider from './HueSlider'
import AlphaSlider from './AlphaSlider'
import Pallete from './Pallete'
import ColorInput from './ColorInput'
import GradientPickerTrigger from './GradientPickerTrigger'
import {
  deriveDefaultValue,
  getModeFromValue,
  parseGradientColor,
  getGradientColorText
} from './utils'
import type { ColorPickerMode, ActionType } from './utils'
import {
  OnUpdateValue,
  OnUpdateValueImpl,
  RenderLabel,
  GradientType
} from './interface'
import ColorPickerSwatches from './ColorPickerSwatches'
import ColorPreview from './ColorPreview'
import TypeSelector from './TypeSelector'
import GradientSlider from './GradientSlider'
import { gradientPickerInjectionKey } from './context'
import style from './styles/index.cssr'

export const gradientPickerPanelProps = {
  ...(useTheme.props as ThemeProps<GradientPickerTheme>),
  value: String,
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultShow: {
    type: Boolean,
    default: false
  },
  defaultValue: String as PropType<string | null>,
  modes: {
    type: Array as PropType<ColorPickerMode[]>,
    // no hsva by default since browser doesn't support it
    default: () => ['rgb', 'hex', 'hsl']
  },
  to: useAdjustedTo.propTo,
  showAlpha: {
    type: Boolean,
    default: true
  },
  showPreview: Boolean,
  swatches: Array as PropType<string[]>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  actions: {
    type: Array as PropType<ActionType[]>,
    default: null
  },
  internalActions: Array as PropType<ReadonlyArray<'redo' | 'undo'>>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  renderLabel: Function as PropType<RenderLabel>,
  onComplete: Function as PropType<OnUpdateValue>,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const

export type GradientPickerProps = ExtractPublicPropTypes<
  typeof gradientPickerPanelProps
>

export default defineComponent({
  name: 'GradientPicker',
  props: gradientPickerPanelProps,
  setup (props, { slots }) {
    const selfRef = ref<HTMLElement | null>(null)
    let upcomingValue: string | null = null

    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const { localeRef } = useLocale('global')
    const { mergedClsPrefixRef, namespaceRef } = useConfig(props)

    const themeRef = useTheme(
      'GradientPicker',
      'GradientPicker',
      style,
      gradientPickerLight,
      props,
      mergedClsPrefixRef
    )

    provide(gradientPickerInjectionKey, {
      themeRef,
      renderLabelRef: toRef(props, 'renderLabel'),
      gradientPickerSlots: slots
    })

    const uncontrolledShowRef = ref(props.defaultShow)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    function doUpdateShow (value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
      uncontrolledShowRef.value = value
    }

    const { defaultValue } = props
    const uncontrolledValueRef = ref(
      defaultValue === undefined
        ? deriveDefaultValue(props.modes, props.showAlpha)
        : defaultValue
    )
    const mergedValueRef = useMergedState(
      toRef(props, 'value'),
      uncontrolledValueRef
    ) as Ref<string>

    // 转换成 GradientColor
    const gradientState = reactive(parseGradientColor(mergedValueRef.value))
    // 当前激活渐变选择点
    const activeStopRef = ref(gradientState.gradient.stops.length - 1)
    // 当前选中颜色
    const colorRef = computed<string>(() => {
      const { type, color, gradient } = gradientState
      return type === 'flat'
        ? (color as string)
        : gradient.stops[activeStopRef.value].color
    })

    const undoStackRef: Ref<Array<string | null>> = ref([colorRef.value])
    const valueIndexRef = ref(0)

    const valueModeRef = computed(() => getModeFromValue(colorRef.value))

    const { modes } = props
    const displayedModeRef = ref<ColorPickerMode>(
      getModeFromValue(colorRef.value) || modes[0] || 'rgb'
    )

    function handleUpdateDisplayedMode (): void {
      const { modes } = props
      const { value: displayedMode } = displayedModeRef
      const currentModeIndex = modes.findIndex((mode) => mode === displayedMode)
      if (~currentModeIndex) {
        displayedModeRef.value = modes[(currentModeIndex + 1) % modes.length]
      } else {
        displayedModeRef.value = 'rgb'
      }
    }

    let _h: number, // avoid conflict with render function's h
      s: number,
      l: number,
      v: number,
      r: number,
      g: number,
      b: number,
      a: number

    const hsvaRef = computed<HSVA | null>(() => {
      const { value: color } = colorRef
      if (!color) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'hsv':
          return hsva(color)
        case 'hsl':
          ;[_h, s, l, a] = hsla(color)
          return [...hsl2hsv(_h, s, l), a]
        case 'rgb':
        case 'hex':
          ;[r, g, b, a] = rgba(color)
          return [...rgb2hsv(r, g, b), a]
      }
    })

    const rgbaRef = computed<RGBA | null>(() => {
      const { value: color } = colorRef
      if (!color) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'rgb':
        case 'hex':
          return rgba(color)
        case 'hsv':
          ;[_h, s, v, a] = hsva(color)
          return [...hsv2rgb(_h, s, v), a]
        case 'hsl':
          ;[_h, s, l, a] = hsla(color)
          return [...hsl2rgb(_h, s, l), a]
      }
    })

    const hslaRef = computed<HSLA | null>(() => {
      const { value: color } = colorRef
      if (!color) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'hsl':
          return hsla(color)
        case 'hsv':
          ;[_h, s, v, a] = hsva(color)
          return [...hsv2hsl(_h, s, v), a]
        case 'rgb':
        case 'hex':
          ;[r, g, b, a] = rgba(color)
          return [...rgb2hsl(r, g, b), a]
      }
    })

    // 用于显示结果
    const mergedValueArrRef = computed(() => {
      switch (displayedModeRef.value) {
        case 'rgb':
        case 'hex':
          return rgbaRef.value
        case 'hsv':
          return hsvaRef.value
        case 'hsl':
          return hslaRef.value
      }
    })

    // 更新颜色
    const displayedHueRef = ref<number>(0)
    const displayedAlphaRef = ref<number>(1)
    const displayedSvRef = ref<[number, number]>([0, 0])

    function handleUpdateSv (s: number, v: number): void {
      const { value: hsvaArr } = hsvaRef
      const hue = displayedHueRef.value
      const alpha = hsvaArr ? hsvaArr[3] : 1
      displayedSvRef.value = [s, v]
      const { showAlpha } = props
      switch (displayedModeRef.value) {
        case 'hsv':
          doUpdateColor(
            (showAlpha ? toHsvaString : toHsvString)([hue, s, v, alpha]),
            'cursor'
          )
          break
        case 'hsl':
          doUpdateColor(
            (showAlpha ? toHslaString : toHslString)([
              ...hsv2hsl(hue, s, v),
              alpha
            ]),
            'cursor'
          )
          break
        case 'rgb':
          doUpdateColor(
            (showAlpha ? toRgbaString : toRgbString)([
              ...hsv2rgb(hue, s, v),
              alpha
            ]),
            'cursor'
          )
          break
        case 'hex':
          doUpdateColor(
            (showAlpha ? toHexaString : toHexString)([
              ...hsv2rgb(hue, s, v),
              alpha
            ]),
            'cursor'
          )
          break
      }
    }

    function handleUpdateHue (hue: number): void {
      displayedHueRef.value = hue
      const { value: hsvaArr } = hsvaRef
      if (!hsvaArr) {
        return
      }
      const [, s, v, a] = hsvaArr
      const { showAlpha } = props
      switch (displayedModeRef.value) {
        case 'hsv':
          doUpdateColor(
            (showAlpha ? toHsvaString : toHsvString)([hue, s, v, a]),
            'cursor'
          )
          break
        case 'rgb':
          doUpdateColor(
            (showAlpha ? toRgbaString : toRgbString)([
              ...hsv2rgb(hue, s, v),
              a
            ]),
            'cursor'
          )
          break
        case 'hex':
          doUpdateColor(
            (showAlpha ? toHexaString : toHexString)([
              ...hsv2rgb(hue, s, v),
              a
            ]),
            'cursor'
          )
          break
        case 'hsl':
          doUpdateColor(
            (showAlpha ? toHslaString : toHslString)([
              ...hsv2hsl(hue, s, v),
              a
            ]),
            'cursor'
          )
          break
      }
    }

    function handleUpdateAlpha (alpha: number): void {
      switch (displayedModeRef.value) {
        case 'hsv':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[_h, s, v] = hsvaRef.value!
          doUpdateColor(toHsvaString([_h, s, v, alpha]), 'cursor')
          break
        case 'rgb':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[r, g, b] = rgbaRef.value!
          doUpdateColor(toRgbaString([r, g, b, alpha]), 'cursor')
          break
        case 'hex':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[r, g, b] = rgbaRef.value!
          doUpdateColor(toHexaString([r, g, b, alpha]), 'cursor')
          break
        case 'hsl':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[_h, s, l] = hslaRef.value!
          doUpdateColor(toHslaString([_h, s, l, alpha]), 'cursor')
          break
      }
      displayedAlphaRef.value = alpha
    }

    function doUpdateColor (
      value: string | null,
      updateSource: 'cursor' | 'input'
    ): void {
      if (updateSource === 'cursor') {
        upcomingValue = value
      } else {
        upcomingValue = null
      }

      if (gradientState.type === 'flat') {
        gradientState.color = value
      } else {
        gradientState.gradient.stops[activeStopRef.value].color =
          value as string
      }

      emitUpdateValue()
    }

    function emitUpdateValue (): void {
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      const value = getGradientColorText(gradientState)
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)

      nTriggerFormChange()
      nTriggerFormInput()

      uncontrolledValueRef.value = value
    }

    function handleInputUpdateValue (value: string): void {
      doUpdateColor(value, 'input')
      void nextTick(handleComplete)
    }

    function handleComplete (pushStack: boolean = true): void {
      const { value: color } = colorRef
      // no value & only hue changes will complete with no value
      if (color) {
        const { value: undoStack } = undoStackRef
        const { value: valueIndex } = valueIndexRef
        if (pushStack) {
          undoStack.splice(valueIndex + 1, undoStack.length, color)
          valueIndexRef.value = valueIndex + 1
        }

        emitComplete()
      }
    }

    function emitComplete (): void {
      const { value } = mergedValueRef
      if (value) {
        const { nTriggerFormChange, nTriggerFormInput } = formItem
        const { onComplete } = props
        if (onComplete) {
          ;(onComplete as OnUpdateValueImpl)(value)
        }
        nTriggerFormChange()
        nTriggerFormInput()
      }
    }

    function undo (): void {
      const { value: valueIndex } = valueIndexRef
      if (valueIndex - 1 < 0) return
      doUpdateColor(undoStackRef.value[valueIndex - 1], 'input')
      handleComplete(false)
      valueIndexRef.value = valueIndex - 1
    }

    function redo (): void {
      const { value: valueIndex } = valueIndexRef
      if (valueIndex < 0 || valueIndex + 1 >= undoStackRef.value.length) return
      doUpdateColor(undoStackRef.value[valueIndex + 1], 'input')
      handleComplete(false)
      valueIndexRef.value = valueIndex + 1
    }

    function handleConfirm (): void {
      doUpdateShow(false)
    }

    const undoableRef = computed(() => valueIndexRef.value >= 1)
    const redoableRef = computed(() => {
      const { value: undoStack } = undoStackRef
      return undoStack.length > 1 && valueIndexRef.value < undoStack.length - 1
    })

    // 更新渐变
    function handleUpdateType (type: GradientType): void {
      gradientState.type = type
      emitUpdateValue()
    }
    function handleUpdateDegree (value: number): void {
      gradientState.gradient.degree = value
      emitUpdateValue()
    }

    // 当前选中节点
    function handleUpdateActiveStop (index: number): void {
      activeStopRef.value = index
      emitUpdateValue()
    }
    function handleUpdateStopOffset (offset: number): void {
      if (offset > 100 || offset < 0) {
        console.log(offset)
      }
      gradientState.gradient.stops[activeStopRef.value].offset = offset
      emitUpdateValue()
    }
    function handleAddStop (offset: number): void {
      const { stops } = gradientState.gradient
      stops.push({ offset: offset, color: colorRef.value })
      activeStopRef.value = stops.length - 1
      emitUpdateValue()
    }
    function handleRemoveStop (index: number): void {
      const { stops } = gradientState.gradient
      if (stops.length <= 2) return
      stops.splice(index, 1)
      activeStopRef.value = stops.length - 1
      emitUpdateValue()
    }

    watch(mergedShowRef, (value) => {
      if (!value) {
        undoStackRef.value = [colorRef.value]
        valueIndexRef.value = 0
      }
    })

    watchEffect(() => {
      if (upcomingValue && upcomingValue === colorRef.value) {
        // let it works in uncontrolled mode
      } else {
        const { value } = hsvaRef
        if (value) {
          displayedHueRef.value = value[0]
          displayedAlphaRef.value = value[3]
          displayedSvRef.value = [value[1], value[2]]
        }
      }
      upcomingValue = null
    })

    const cssVarsRef = computed(() => {
      const { value: mergedSize } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          textColor,
          color,
          panelFontSize,
          boxShadow,
          border,
          borderRadius,
          dividerColor,
          [createKey('height', mergedSize)]: height,
          [createKey('fontSize', mergedSize)]: fontSize
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-color': color,
        '--n-panel-font-size': panelFontSize,
        '--n-font-size': fontSize,
        '--n-box-shadow': boxShadow,
        '--n-border': border,
        '--n-border-radius': borderRadius,
        '--n-height': height,
        '--n-divider-color': dividerColor
      }
    })

    function renderPanel (): VNode {
      const { value: rgba } = rgbaRef
      const { value: displayedHue } = displayedHueRef
      const { internalActions, modes, actions } = props
      const { value: mergedTheme } = themeRef
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <div
          class={`${mergedClsPrefix}-gradient-picker-panel`}
          onDragstart={(e) => {
            e.preventDefault()
          }}
          style={cssVarsRef.value as CSSProperties}
        >
          <div class={`${mergedClsPrefix}-gradient-picker-control`}>
            <TypeSelector
              clsPrefix={mergedClsPrefix}
              value={gradientState}
              onUpdateType={handleUpdateType}
              onUpdateDegree={handleUpdateDegree}
            />
            {gradientState.type !== 'flat' ? (
              <GradientSlider
                clsPrefix={mergedClsPrefix}
                value={gradientState}
                activeStop={activeStopRef.value}
                onUpdateActiveStop={handleUpdateActiveStop}
                onUpdateStopOffset={handleUpdateStopOffset}
                onAddStop={handleAddStop}
                onRemoveStop={handleRemoveStop}
              />
            ) : null}
            <Pallete
              clsPrefix={mergedClsPrefix}
              rgba={rgba}
              displayedHue={displayedHue}
              displayedSv={displayedSvRef.value}
              onUpdateSV={handleUpdateSv}
              onComplete={handleComplete}
            />
            <div class={`${mergedClsPrefix}-gradient-picker-preview`}>
              <div
                class={`${mergedClsPrefix}-gradient-picker-preview__sliders`}
              >
                <HueSlider
                  clsPrefix={mergedClsPrefix}
                  hue={displayedHue}
                  onUpdateHue={handleUpdateHue}
                  onComplete={handleComplete}
                />
                {props.showAlpha ? (
                  <AlphaSlider
                    clsPrefix={mergedClsPrefix}
                    rgba={rgba}
                    alpha={displayedAlphaRef.value}
                    onUpdateAlpha={handleUpdateAlpha}
                    onComplete={handleComplete}
                  />
                ) : null}
              </div>
              {props.showPreview ? (
                <ColorPreview
                  clsPrefix={mergedClsPrefix}
                  mode={displayedModeRef.value}
                  color={rgbaRef.value && toHexString(rgbaRef.value)}
                  onUpdateColor={(color) => doUpdateColor(color, 'input')}
                />
              ) : null}
            </div>
            <ColorInput
              clsPrefix={mergedClsPrefix}
              showAlpha={props.showAlpha}
              mode={displayedModeRef.value}
              modes={modes}
              onUpdateMode={handleUpdateDisplayedMode}
              value={colorRef.value}
              valueArr={mergedValueArrRef.value}
              onUpdateValue={handleInputUpdateValue}
            />
            {props.swatches?.length && (
              <ColorPickerSwatches
                clsPrefix={mergedClsPrefix}
                mode={displayedModeRef.value}
                swatches={props.swatches}
                onUpdateColor={(color) => doUpdateColor(color, 'input')}
              />
            )}
          </div>
          {actions?.length ? (
            <div class={`${mergedClsPrefix}-gradient-picker-action`}>
              {actions.includes('confirm') && (
                <NButton
                  size="small"
                  onClick={handleConfirm}
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                >
                  {{ default: () => localeRef.value.confirm }}
                </NButton>
              )}
            </div>
          ) : null}
          {slots.action ? (
            <div class={`${mergedClsPrefix}-gradient-picker-action`}>
              {{ default: slots.action }}
            </div>
          ) : internalActions ? (
            <div class={`${mergedClsPrefix}-gradient-picker-action`}>
              {internalActions.includes('undo') && (
                <NButton
                  size="small"
                  onClick={undo}
                  disabled={!undoableRef.value}
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                >
                  {{ default: () => localeRef.value.undo }}
                </NButton>
              )}
              {internalActions.includes('redo') && (
                <NButton
                  size="small"
                  onClick={redo}
                  disabled={!redoableRef.value}
                  theme={mergedTheme.peers.Button}
                  themeOverrides={mergedTheme.peerOverrides.Button}
                >
                  {{ default: () => localeRef.value.redo }}
                </NButton>
              )}
            </div>
          ) : null}
        </div>
      )
    }

    return {
      gradientState,
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      selfRef,
      hsla: hslaRef,
      rgba: rgbaRef,
      mergedShow: mergedShowRef,
      mergedDisabled: mergedDisabledRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      mergedValue: mergedValueRef,
      handleTriggerClick () {
        doUpdateShow(true)
      },
      handleClickOutside (e: MouseEvent) {
        if (selfRef.value?.contains(e.target as Node)) return
        doUpdateShow(false)
      },
      renderPanel,
      cssVars: cssVarsRef
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-gradient-picker`}
        ref="selfRef"
        style={this.cssVars as CSSProperties}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <GradientPickerTrigger
                      clsPrefix={mergedClsPrefix}
                      value={this.mergedValue}
                      flat={this.gradientState.type === 'flat'}
                      hsla={this.hsla}
                      disabled={this.mergedDisabled}
                      onClick={this.handleTriggerClick}
                    >
                      {{
                        label: $slots.label
                      }}
                    </GradientPickerTrigger>
                  )
                }}
              </VTarget>,
              <VFollower
                placement="bottom-start"
                show={this.mergedShow}
                containerClass={this.namespace}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                to={this.adjustedTo}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () =>
                          this.mergedShow
                            ? withDirectives(this.renderPanel(), [
                              [clickoutside, this.handleClickOutside]
                            ])
                            : null
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
