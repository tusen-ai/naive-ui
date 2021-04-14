import {
  h,
  defineComponent,
  ref,
  computed,
  PropType,
  toRef,
  watchEffect,
  VNode,
  withDirectives,
  Transition,
  CSSProperties,
  provide,
  InjectionKey,
  ComputedRef,
  ExtractPropTypes,
  Ref,
  watch
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
import { colorPickerLight } from '../styles'
import type { ColorPickerTheme } from '../styles'
import {
  MergedTheme,
  ThemeProps,
  useFormItem,
  useConfig,
  useTheme,
  useLocale
} from '../../_mixins'
import { call, createKey, MaybeArray, useAdjustedTo } from '../../_utils'
import HueSlider from './HueSlider'
import AlphaSlider from './AlphaSlider'
import Pallete from './Pallete'
import ColorInput from './ColorInput'
import ColorPickerTrigger from './ColorPickerTrigger'
import { getModeFromValue } from './utils'
import type { ColorPickerMode } from './utils'
import style from './styles/index.cssr'
import { OnUpdateValue, OnUpdateValueImpl } from './interface'
import { NButton } from '../../button'

export const colorPickerPanelProps = {
  ...(useTheme.props as ThemeProps<ColorPickerTheme>),
  value: String,
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: {
    type: Boolean,
    default: false
  },
  defaultValue: {
    type: String as PropType<string | null>,
    default: '#000000'
  },
  modes: {
    type: Array as PropType<ColorPickerMode[]>,
    // no hsva by default since browser doesn't support it
    default: ['rgb', 'hex', 'hsl']
  },
  to: useAdjustedTo.propTo,
  showAlpha: {
    type: Boolean,
    default: true
  },
  internalActions: Array as PropType<ReadonlyArray<'redo' | 'undo'>>,
  size: String as PropType<'small' | 'medium' | 'large'>,
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

export type ColorPickerProps = Partial<
ExtractPropTypes<typeof colorPickerPanelProps>
>

export const colorPickerThemeInjectionKey: InjectionKey<
ComputedRef<MergedTheme<ColorPickerTheme>>
> = Symbol('colorPickerThemeInjection')

export default defineComponent({
  name: 'ColorPicker',
  props: colorPickerPanelProps,
  setup (props, { slots }) {
    const selfRef = ref<HTMLElement | null>(null)
    let upcomingValue: string | null = null

    const formItemRef = useFormItem(props)
    const { locale: localeRef } = useLocale('global')

    const themeRef = useTheme(
      'ColorPicker',
      'ColorPicker',
      style,
      colorPickerLight,
      props
    )

    provide(colorPickerThemeInjectionKey, themeRef)

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

    const uncontrolledValueRef = ref(props.defaultValue)
    const mergedValueRef = useMergedState(
      toRef(props, 'value'),
      uncontrolledValueRef
    )

    const undoStackRef: Ref<Array<string | null>> = ref([mergedValueRef.value])
    const valueIndexRef = ref(0)

    const valueModeRef = computed(() => getModeFromValue(mergedValueRef.value))

    const displayedModeRef = ref<ColorPickerMode>(
      getModeFromValue(mergedValueRef.value) || 'rgb'
    )

    function handleUpdateDisplayedMode (): void {
      const { modes } = props
      const { value: displayedMode } = displayedModeRef
      switch (displayedMode) {
        case 'rgb':
          if (modes.includes('hex')) {
            displayedModeRef.value = 'hex'
            break
          }
        // eslint-disable-next-line no-fallthrough
        case 'hex':
          if (modes.includes('hsv')) {
            displayedModeRef.value = 'hsv'
            break
          }
        // eslint-disable-next-line no-fallthrough
        case 'hsv':
          if (modes.includes('hsl')) {
            displayedModeRef.value = 'hsl'
            break
          }
        // eslint-disable-next-line no-fallthrough
        case 'hsl':
          if (modes.includes('rgb')) {
            displayedModeRef.value = 'rgb'
            break
          }
        // eslint-disable-next-line no-fallthrough
        default:
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
      const { value: mergedValue } = mergedValueRef
      if (!mergedValue) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'hsv':
          return hsva(mergedValue)
        case 'hsl':
          ;[_h, s, l, a] = hsla(mergedValue)
          return [...hsl2hsv(_h, s, l), a]
        case 'rgb':
        case 'hex':
          ;[r, g, b, a] = rgba(mergedValue)
          return [...rgb2hsv(r, g, b), a]
      }
    })

    const rgbaRef = computed<RGBA | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!mergedValue) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'rgb':
        case 'hex':
          return rgba(mergedValue)
        case 'hsv':
          ;[_h, s, v, a] = hsva(mergedValue)
          return [...hsv2rgb(_h, s, v), a]
        case 'hsl':
          ;[_h, s, l, a] = hsla(mergedValue)
          return [...hsl2rgb(_h, s, l), a]
      }
    })

    const hslaRef = computed<HSLA | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!mergedValue) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'hsl':
          return hsla(mergedValue)
        case 'hsv':
          ;[_h, s, v, a] = hsva(mergedValue)
          return [...hsv2hsl(_h, s, v), a]
        case 'rgb':
        case 'hex':
          ;[r, g, b, a] = rgba(mergedValue)
          return [...rgb2hsl(r, g, b), a]
      }
    })

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
          doUpdateValue(
            (showAlpha ? toHsvaString : toHsvString)([hue, s, v, alpha]),
            'cursor'
          )
          break
        case 'hsl':
          doUpdateValue(
            (showAlpha ? toHslaString : toHslString)([
              ...hsv2hsl(hue, s, v),
              alpha
            ]),
            'cursor'
          )
          break
        case 'rgb':
          doUpdateValue(
            (showAlpha ? toRgbaString : toRgbString)([
              ...hsv2rgb(hue, s, v),
              alpha
            ]),
            'cursor'
          )
          break
        case 'hex':
          doUpdateValue(
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
          doUpdateValue(
            (showAlpha ? toHsvaString : toHsvString)([hue, s, v, a]),
            'cursor'
          )
          break
        case 'rgb':
          doUpdateValue(
            (showAlpha ? toRgbaString : toRgbString)([
              ...hsv2rgb(hue, s, v),
              a
            ]),
            'cursor'
          )
          break
        case 'hex':
          doUpdateValue(
            (showAlpha ? toHexaString : toHexString)([
              ...hsv2rgb(hue, s, v),
              a
            ]),
            'cursor'
          )
          break
        case 'hsl':
          doUpdateValue(
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
          doUpdateValue(toHsvaString([_h, s, v, alpha]), 'cursor')
          break
        case 'rgb':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[r, g, b] = rgbaRef.value!
          doUpdateValue(toRgbaString([r, g, b, alpha]), 'cursor')
          break
        case 'hex':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[r, g, b] = rgbaRef.value!
          doUpdateValue(toHexaString([r, g, b, alpha]), 'cursor')
          break
        case 'hsl':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ;[_h, s, l] = hslaRef.value!
          doUpdateValue(toHslaString([_h, s, l, alpha]), 'cursor')
          break
      }
      displayedAlphaRef.value = alpha
    }

    function doUpdateValue (
      value: string | null,
      updateSource: 'cursor' | 'input'
    ): void {
      if (updateSource === 'cursor') {
        upcomingValue = value
      } else {
        upcomingValue = null
      }
      const { nTriggerFormChange, nTriggerFormInput } = formItemRef
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      nTriggerFormChange()
      nTriggerFormInput()
      uncontrolledValueRef.value = value
    }

    function handleInputUpdateValue (value: string): void {
      doUpdateValue(value, 'input')
      handleComplete()
    }

    function handleComplete (pushStack: boolean = true): void {
      const { value } = mergedValueRef
      // no value & only hue changes will complete with no value
      if (value) {
        const { nTriggerFormChange, nTriggerFormInput } = formItemRef
        const { onComplete } = props
        if (onComplete) {
          ;(onComplete as OnUpdateValueImpl)(value)
        }
        const { value: undoStack } = undoStackRef
        const { value: valueIndex } = valueIndexRef
        if (pushStack) {
          undoStack.splice(valueIndex + 1, undoStack.length, value)
          valueIndexRef.value = valueIndex + 1
        }
        nTriggerFormChange()
        nTriggerFormInput()
      }
    }

    function undo (): void {
      const { value: valueIndex } = valueIndexRef
      if (valueIndex - 1 < 0) return
      doUpdateValue(undoStackRef.value[valueIndex - 1], 'input')
      handleComplete(false)
      valueIndexRef.value = valueIndex - 1
    }

    function redo (): void {
      const { value: valueIndex } = valueIndexRef
      if (valueIndex < 0 || valueIndex + 1 >= undoStackRef.value.length) return
      doUpdateValue(undoStackRef.value[valueIndex + 1], 'input')
      handleComplete(false)
      valueIndexRef.value = valueIndex + 1
    }
    const undoableRef = computed(() => valueIndexRef.value >= 1)
    const redoableRef = computed(() => {
      const { value: undoStack } = undoStackRef
      return undoStack.length > 1 && valueIndexRef.value < undoStack.length - 1
    })

    watch(mergedShowRef, (value) => {
      if (!value) {
        undoStackRef.value = [mergedValueRef.value]
        valueIndexRef.value = 0
      }
    })

    watchEffect(() => {
      if (upcomingValue && upcomingValue === mergedValueRef.value) {
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
      const { value: mergedSize } = formItemRef.mergedSize
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
        '--bezier': cubicBezierEaseInOut,
        '--text-color': textColor,
        '--color': color,
        '--panel-font-size': panelFontSize,
        '--font-size': fontSize,
        '--box-shadow': boxShadow,
        '--border': border,
        '--border-radius': borderRadius,
        '--height': height,
        '--divider-color': dividerColor
      }
    })

    function renderPanel (): VNode {
      const { value: rgba } = rgbaRef
      const { value: displayedHue } = displayedHueRef
      const { internalActions } = props
      const { value: mergedTheme } = themeRef
      return (
        <div
          class="n-color-picker-panel"
          onDragstart={(e) => {
            e.preventDefault()
          }}
          style={cssVarsRef.value as CSSProperties}
        >
          <div class="n-color-picker-control">
            <Pallete
              rgba={rgba}
              displayedHue={displayedHue}
              displayedSv={displayedSvRef.value}
              onUpdateSV={handleUpdateSv}
              onComplete={handleComplete}
            />
            <HueSlider
              hue={displayedHue}
              onUpdateHue={handleUpdateHue}
              onComplete={handleComplete}
            />
            {props.showAlpha ? (
              <AlphaSlider
                rgba={rgba}
                alpha={displayedAlphaRef.value}
                onUpdateAlpha={handleUpdateAlpha}
                onComplete={handleComplete}
              />
            ) : null}
            <ColorInput
              showAlpha={props.showAlpha}
              mode={displayedModeRef.value}
              onUpdateMode={handleUpdateDisplayedMode}
              value={mergedValueArrRef.value}
              onUpdateValue={handleInputUpdateValue}
            />
          </div>
          {slots.action ? (
            <div class="n-color-picker-action">{{ default: slots.action }}</div>
          ) : internalActions ? (
            <div class="n-color-picker-action">
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
      ...useConfig(props),
      selfRef,
      hsla: hslaRef,
      rgba: rgbaRef,
      mergedShow: mergedShowRef,
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
    return (
      <div
        class="n-color-picker"
        ref="selfRef"
        style={this.cssVars as CSSProperties}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <ColorPickerTrigger
                      value={this.mergedValue}
                      hsla={this.hsla}
                      onClick={this.handleTriggerClick}
                    />
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
                      name="n-fade-in-scale-up-transition"
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
