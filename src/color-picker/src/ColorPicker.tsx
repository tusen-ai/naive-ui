import { h, defineComponent, ref, computed, PropType, toRef } from 'vue'
import {
  hsv2rgb,
  rgb2hsv,
  rgba,
  hsva,
  hsla,
  hsl2hsv,
  hsv2hsl,
  rgb2hsl,
  toRgbaString,
  toHsvaString,
  toHslaString,
  HSVA,
  RGBA,
  HSLA
} from 'seemly'
import HueSlider from './HueSlider'
import Pallete from './Pallete'
import ColorInput from './ColorInput'
import style from './styles/index.cssr'
import { useStyle } from '../../_mixins'
import { useMergedState } from 'vooks'
import { call, MaybeArray } from '../../_utils'
import { getModeFromValue } from './utils'
import type { ColorPickerMode } from './utils'

export default defineComponent({
  name: 'ColorPicker',
  props: {
    value: String,
    defaultValue: {
      type: String as PropType<string | null>,
      default: null
    },
    'onUpdate:value': [Function, Array] as PropType<
    MaybeArray<(value: string) => void>
    >,
    onUpdateValue: [Function, Array] as PropType<
    MaybeArray<(value: string) => void>
    >
  },
  setup (props) {
    useStyle('ColorPicker', style)
    const uncontrolledValueRef = ref(props.defaultValue)
    const mergedValueRef = useMergedState(
      toRef(props, 'value'),
      uncontrolledValueRef
    )

    const valueModeRef = computed(() => getModeFromValue(mergedValueRef.value))

    const displayedModeRef = ref<ColorPickerMode>(
      getModeFromValue(mergedValueRef.value) || 'rgba'
    )

    function handleUpdateDisplayedMode (mode: ColorPickerMode): void {
      displayedModeRef.value = mode
    }

    let h: number,
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
        case 'hsva':
          return hsva(mergedValue)
        case 'hsla':
          ;[h, s, l, a] = hsla(mergedValue)
          return [...hsl2hsv(h, s, l), a]
        case 'rgba':
          ;[r, g, b, a] = rgba(mergedValue)
          return [...rgb2hsv(r, g, b), a]
      }
    })

    const rgbaRef = computed<RGBA | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!mergedValue) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'rgba':
          return rgba(mergedValue)
        case 'hsva':
          ;[h, s, v, a] = hsva(mergedValue)
          return [...hsv2rgb(h, s, v), a]
        case 'hsla':
          ;[h, s, l, a] = hsla(mergedValue)
          return [...hsl2hsv(h, s, l), a]
      }
    })

    const hslaRef = computed<HSLA | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!mergedValue) return null
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switch (valueModeRef.value!) {
        case 'hsla':
          return hsla(mergedValue)
        case 'hsva':
          ;[h, s, v, a] = hsva(mergedValue)
          return [...hsv2hsl(h, s, v), a]
        case 'rgba':
          ;[r, g, b, a] = rgba(mergedValue)
          return [...rgb2hsl(r, g, b), a]
      }
    })

    const mergedValueArrRef = computed(() => {
      switch (valueModeRef.value) {
        case 'rgba':
          return rgbaRef.value
        case 'hsva':
          return hsvaRef.value
        case 'hsla':
          return hslaRef.value
      }
      return null
    })

    const uncontrolledHueRef = ref<number>(0)
    const displayedHueRef = computed(() => {
      if (hsvaRef.value) return hsvaRef.value[0]
      return uncontrolledHueRef.value
    })

    // const uncontrolledLvRef = ref<number>(0) // v, l in hsv, hsl

    function handleUpdateSv (s: number, v: number): void {
      const { value: hsvaArr } = hsvaRef
      const hue = displayedHueRef.value
      const alpha = hsvaArr ? hsvaArr[3] : 1
      switch (displayedModeRef.value) {
        case 'hsva':
          doUpdateValue(toHsvaString([hue, s, v, alpha]))
          break
        case 'rgba':
          doUpdateValue(toRgbaString([...hsv2rgb(hue, s, v), alpha]))
          break
        case 'hsla':
          doUpdateValue(toHslaString([...hsv2hsl(hue, s, v), alpha]))
          break
      }
    }

    function handleUpdateHue (hue: number): void {
      const { value: hsvaArr } = hsvaRef
      if (!hsvaArr) {
        uncontrolledHueRef.value = hue
        return
      }
      const [, s, v, a] = hsvaArr
      switch (displayedModeRef.value) {
        case 'hsva':
          doUpdateValue(toHsvaString([hue, s, v, a]))
          break
        case 'rgba':
          doUpdateValue(toRgbaString([...hsv2rgb(hue, s, v), a]))
          break
        case 'hsla':
          doUpdateValue(toRgbaString([...hsv2hsl(hue, s, v), a]))
          break
      }
    }

    function doUpdateValue (value: string): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) call(onUpdateValue, value)
      if (_onUpdateValue) call(_onUpdateValue, value)
      uncontrolledValueRef.value = value
    }

    function handleInputUpdateValue (value: string): void {
      doUpdateValue(value)
    }

    return {
      mergedValue: mergedValueRef, // debug
      hsva: hsvaRef,
      displayedHue: displayedHueRef,
      displayedMode: displayedModeRef,
      mergedValueArr: mergedValueArrRef,
      handleUpdateDisplayedMode,
      handleUpdateHue,
      handleUpdateSv,
      handleInputUpdateValue
    }
  },
  render () {
    return (
      <div>
        <div>value: {this.mergedValue}</div>
        <Pallete
          hsva={this.hsva}
          displayedHue={this.displayedHue}
          onUpdateSV={this.handleUpdateSv}
        />
        <HueSlider hue={this.displayedHue} onUpdateHue={this.handleUpdateHue} />
        <ColorInput
          mode={this.displayedMode}
          onUpdateMode={this.handleUpdateDisplayedMode}
          value={this.mergedValueArr}
          onUpdateValue={this.handleInputUpdateValue}
        />
      </div>
    )
  }
})
