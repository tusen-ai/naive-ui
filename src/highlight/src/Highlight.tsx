import {
  h,
  defineComponent,
  type PropType,
  type CSSProperties,
  computed
} from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'

export const highlightProps = {
  component: {
    type: String,
    default: 'mark'
  },
  caseSensitive: {
    type: Boolean,
    default: false
  },
  autoEscape: {
    type: Boolean,
    default: true
  },
  text: String,
  words: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  highlightClass: String,
  highlightStyle: [Object, String] as PropType<CSSProperties | string>
} as const

export type HighlightProps = ExtractPublicPropTypes<typeof highlightProps>

export default defineComponent({
  name: 'Highlight',
  props: highlightProps,
  setup (props) {
    const escapeRegExp = (text: string): string =>
      text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const highlightedText = computed(() => {
      const {
        component,
        text,
        words,
        highlightStyle,
        caseSensitive,
        autoEscape,
        highlightClass
      } = props

      if (words.length === 0) {
        return text
      }

      let modifiedText = text

      const pattern = words
        .map((word) => (autoEscape ? escapeRegExp(word) : word))
        .join('|')
      const regex = new RegExp(`(${pattern})`, caseSensitive ? 'g' : 'gi')

      const style = highlightStyle
        ? Object.entries(highlightStyle)
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ')
        : ''

      const classes = highlightClass ? ` class="${highlightClass}"` : ''

      const wrap = `<${component}${classes}${
        style ? ` style="${style}"` : ''
      }>$1</${component}>`

      modifiedText = modifiedText?.replace(regex, wrap)

      return modifiedText
    })

    return { highlightedText }
  },
  render () {
    return h('span', {
      innerHTML: this.highlightedText
    })
  }
})
