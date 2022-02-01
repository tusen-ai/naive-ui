import {
  computed,
  defineComponent,
  h,
  inject,
  CSSProperties,
  PropType,
  ref,
  watchEffect
} from 'vue'
import type { GradientColor, GradientType } from './interface'
import { NInput } from '../../input'
import { gradientPickerInjectionKey } from './context'
import { off, on } from 'evtd'
import { normalizeUnit } from './utils'

const HANDLE_SIZE_NUM = 8
const HANDLE_SIZE_NUM_HALF = HANDLE_SIZE_NUM / 2
const gradientTypes: GradientType[] = [
  'flat',
  'linear-gradient',
  'radial-gradient'
]

export default defineComponent({
  name: 'TypeSelector',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: Object as PropType<GradientColor>,
      required: true
    },
    onUpdateType: {
      type: Function as PropType<(value: GradientType) => void>,
      required: true
    },
    onUpdateDegree: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
  },
  setup (props) {
    const railRef = ref<HTMLElement | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { themeRef } = inject(gradientPickerInjectionKey, null)!

    // 角度版样式
    const getDegreeStyle = computed<CSSProperties>(() => {
      return {
        transform: `rotate(${props.value.gradient.degree}deg)`
      }
    })

    // 切换颜色类型
    function handleChangeType (type: GradientType): void {
      if (props.value.type !== type) props.onUpdateType(type)
    }

    // 鼠标修改角度盘
    function calculateDegree (
      x: number,
      y: number,
      centerX: number,
      centerY: number
    ): number {
      const radians = Math.atan2(
        x - centerX - HANDLE_SIZE_NUM_HALF,
        y - centerY - HANDLE_SIZE_NUM_HALF
      )
      return radians * (180 / Math.PI) * -1 + 180
    }

    function handleMouseDown (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return

      on('mousemove', document, handleMouseMove)
      on('mouseup', document, handleMouseUp)

      handleMouseMove(e)
    }

    function handleMouseMove (e: MouseEvent): void {
      const { value: railEl } = railRef
      if (!railEl) return

      const { top, left } = railEl.getBoundingClientRect()
      const centerY = top + HANDLE_SIZE_NUM
      const centerX = left + HANDLE_SIZE_NUM

      const newDegree = calculateDegree(e.clientX, e.clientY, centerX, centerY)
      props.onUpdateDegree(Math.floor(newDegree))
    }

    function handleMouseUp (e: MouseEvent): void {
      // const pointer = e.target as HTMLElement
      // const targetClasses = pointer.classList
      // if (targetClasses.contains(`${props.clsPrefix}-gradient-degree-dial`))
      //   return
      off('mousemove', document, handleMouseMove)
      off('mouseup', document, handleMouseUp)
    }

    // 角度输入框
    const inputValueRef = ref<string>()

    watchEffect(() => {
      inputValueRef.value = props.value.gradient.degree.toString()
    })

    function handleInputUpdate (value: string): void {
      inputValueRef.value = value
    }

    function handleInputChange (value: string): void {
      const unit = normalizeUnit(value, 0, 360)
      if (unit === false) {
        inputValueRef.value = props.value.gradient.degree.toString()
      } else {
        props.onUpdateDegree(unit)
      }
    }

    return {
      railRef,
      mergedTheme: themeRef,
      degreeStyle: getDegreeStyle,
      inputValue: inputValueRef,
      handleChangeType,
      handleMouseDown,
      handleInputUpdate,
      handleInputChange
    }
  },
  render () {
    const { clsPrefix, mergedTheme, degreeStyle } = this
    const { inputValue } = this
    const { type } = this.value

    return (
      <div class={`${clsPrefix}-gradient-type-picker`}>
        <div class={`${clsPrefix}-gradient-type`}>
          {gradientTypes.map((item) => (
            <div
              class={`${clsPrefix}-gradient-type-item ${item} ${
                type === item ? `${clsPrefix}-gradient-type-item--active` : ''
              }`}
              onClick={() => this.handleChangeType(item)}
            />
          ))}
        </div>
        {type === 'linear-gradient' ? (
          <div class={`${clsPrefix}-gradient-degree`}>
            <div
              class={`${clsPrefix}-gradient-degree-dial`}
              ref="railRef"
              onMousedown={this.handleMouseDown}
            >
              <div
                class={`${clsPrefix}-gradient-degree-center`}
                style={degreeStyle}
              >
                <div class={`${clsPrefix}-gradient-degree-handler`} />
              </div>
            </div>
            <div class={`${clsPrefix}-gradient-degree-value`}>
              <NInput
                size="small"
                placeholder=""
                value={inputValue}
                onUpdateValue={this.handleInputUpdate}
                onChange={this.handleInputChange}
                theme={mergedTheme.peers.Input}
                themeOverrides={mergedTheme.peerOverrides.Input}
              >
                {{ suffix: () => '°' }}
              </NInput>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
})
