import type { CSSProperties, PropType, VNode, VNodeChild } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { useConfig } from '../../_mixins'
import { splitAndMarkByRegex } from './utils'

export const highlightProps = {
  highlightTag: {
    type: String,
    default: 'mark'
  },
  caseSensitive: Boolean,
  autoEscape: {
    type: Boolean,
    default: true
  },
  text: String,
  patterns: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  highlightClass: String,
  highlightStyle: [Object, String] as PropType<CSSProperties | string>
} as const

export default defineComponent({
  name: 'Highlight',
  props: highlightProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig()

    const escapeRegExp = (text: string): string =>
      text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const highlightedNodeRef = computed<VNode>(() => {
      const mergedClsPrefix = mergedClsPrefixRef.value

      let children: VNodeChild[] = []

      const { patterns, text } = props

      if (patterns.length === 0 || !text) {
        children = [text]
      }
      else {
        const {
          highlightTag,
          caseSensitive,
          autoEscape,
          highlightClass,
          highlightStyle
        } = props

        const pattern = patterns
          .map(word => (autoEscape ? escapeRegExp(word) : word))
          .join('|')
        const regex = new RegExp(`(${pattern})`, caseSensitive ? 'g' : 'gi')

        const splitItems = splitAndMarkByRegex(text, regex)

        children = splitItems.map(({ text, isMatch }) => {
          if (isMatch) {
            return h(
              highlightTag,
              {
                class: [`${mergedClsPrefix}-highlight__mark`, highlightClass],
                style: highlightStyle
              },
              text
            )
          }
          return text
        })
      }

      return h(
        'span',
        {
          class: `${mergedClsPrefix}-highlight`
        },
        children
      )
    })

    return {
      highlightedNode: highlightedNodeRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render() {
    return this.highlightedNode
  }
})
