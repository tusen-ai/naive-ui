import {
  defineComponent,
  PropType,
  h,
  ref,
  onMounted,
  computed,
  toRef
} from 'vue'
import { NInput } from '../../../input'
import { NTag } from '../../../tag'
import { VOverflow } from 'vueuc'
import { call, MaybeArray } from '../../../_utils'
import { useStyle, useTheme } from '../../../_mixins'
import { InputTheme } from '../../../input/styles'
import style from './styles/index.cssr'
import type { InputInst } from '../../../input'
import type { ThemeProps } from '../../../_mixins'

export default defineComponent({
  name: 'InternalMultipleInput',
  inheritAttrs: false,
  props: {
    ...(useTheme.props as ThemeProps<InputTheme>),
    focus: Boolean,
    size: {
      type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array as PropType<Array<string | number>>,
      default: []
    },
    maxTagCount: [String, Number] as PropType<number | 'responsive'>,
    onTagClose: Function as PropType<(tagIndex: number) => void>,
    onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>
  },
  setup (props, { expose, slots }) {
    const counter = ref(0)
    const inputRef = ref<InputInst | null>(null)
    const counterWrapperRef = ref<HTMLElement | null>(null)
    const maxTagCountNumeric = typeof props.maxTagCount === 'number'

    useStyle('-multiple-input', style, toRef(props, 'clsPrefix'))

    const cssVarsRef = computed(() => {
      const tagPaddingMap = {
        tiny: '0 7px 2px 0',
        small: '0 7px 2px 0',
        medium: '0 7px 3px 0',
        large: '0 7px 3px 0'
      }
      const heightMap = {
        tiny: '28px',
        small: '28px',
        medium: '34px',
        large: '40px'
      }
      const tagsWrapperPaddingMap = {
        tiny: '2px 12px 0',
        small: '2px 12px 0',
        medium: '3px 12px 0',
        large: '3px 12px 0'
      }
      return {
        '--n-height': heightMap[props.size],
        '--n-tag-padding': tagPaddingMap[props.size],
        '--n-tags-wrapper-padding': tagsWrapperPaddingMap[props.size]
      }
    })

    const tagsData = computed(() => {
      if (maxTagCountNumeric) {
        counter.value = props.data.length - props.maxTagCount
        return props.data.slice(0, props.maxTagCount)
      } else {
        return props.data
      }
    })

    const handleTagClose = (index: number): void => {
      const { onTagClose } = props
      if (onTagClose) call(onTagClose, index)
    }

    const renderCounter = (): JSX.Element | undefined => {
      return (
        <div
          class={`${props.clsPrefix}-multiple-input__tag-wrapper`}
          ref="counterWrapperRef"
        >
          <NTag size={props.size} ref="counterRef" disabled={props.disabled}>
            {{
              default: () => `+${counter.value}`
            }}
          </NTag>
        </div>
      )
    }

    const renderTags = (): JSX.Element[] => {
      const tags = tagsData.value.map((tagLabel, index) => (
        <div class={`${props.clsPrefix}-multiple-input__tag-wrapper`}>
          {slots.tag?.({ label: tagLabel, index }) || (
            <NTag
              disabled={props.disabled}
              closable
              size={props.size}
              internalCloseFocusable={false}
              onClose={() => handleTagClose(index)}
            >
              {{
                default: () => tagLabel
              }}
            </NTag>
          )}
        </div>
      ))
      if (maxTagCountNumeric && counter.value > 0) {
        tags.push(renderCounter() as JSX.Element)
      }
      return tags
    }

    const updateCounter = (value: number): void => {
      counter.value = value
    }

    const getCounter = (): HTMLElement | null => {
      const { value } = counterWrapperRef
      return value
    }

    const showPlaceholderRef = computed(() => {
      return props.data.length === 0
    })

    const handleOnClick = (e: MouseEvent): void => {
      if (props.disabled) return
      const { onClick } = props
      if (onClick) call(onClick, e)
    }

    onMounted(() => {
      expose({
        focus: inputRef.value?.focus,
        deactivate: inputRef.value?.deactivate,
        blur: inputRef.value?.blur
      })
    })

    return {
      handleTagClose,
      inputRef,
      cssVarsRef,
      renderTags,
      renderCounter,
      updateCounter,
      getCounter,
      counterWrapperRef,
      showPlaceholderRef,
      handleOnClick
    }
  },
  render () {
    const {
      clsPrefix,
      updateCounter,
      getCounter,
      $attrs,
      maxTagCount,
      renderTags,
      renderCounter,
      showPlaceholderRef,
      handleOnClick,
      size,
      disabled,
      cssVarsRef,
      focus
    } = this

    return (
      <div
        class={`${clsPrefix}-multiple-input`}
        onClick={handleOnClick}
        style={cssVarsRef}
      >
        <NInput
          ref="inputRef"
          {...$attrs}
          readonly
          size={size}
          disabled={disabled}
          internalDeactivateOnEnter
          internalForceFocus={focus}
          placeholder={showPlaceholderRef ? ($attrs.placeholder as string) : ''}
          class={`${clsPrefix}-multiple-input__inner`}
        />
        <div class={`${clsPrefix}-multiple-input__tags`}>
          {maxTagCount === 'responsive' ? (
            <VOverflow
              updateCounter={updateCounter}
              getCounter={getCounter}
              style={{
                width: '100%',
                display: 'flex',
                overflow: 'hidden'
              }}
            >
              {{
                default: renderTags,
                counter: renderCounter
              }}
            </VOverflow>
          ) : (
            renderTags()
          )}
        </div>
      </div>
    )
  }
})
