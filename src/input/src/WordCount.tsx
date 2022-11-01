import { defineComponent, inject, h, computed } from 'vue'
import { resolveSlotWithProps } from '../../_utils'
import { inputInjectionKey } from './interface'
import { len } from './utils'

export default defineComponent({
  name: 'InputWordCount',
  setup (_, { slots }) {
    const {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef,
      countGraphemesRef
    } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject(inputInjectionKey)!
    const wordCountRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (mergedValue === null || Array.isArray(mergedValue)) return 0
      return (countGraphemesRef.value || len)(mergedValue)
    })
    return () => {
      const { value: maxlength } = maxlengthRef
      const { value: mergedValue } = mergedValueRef
      return (
        <span class={`${mergedClsPrefixRef.value}-input-word-count`}>
          {resolveSlotWithProps(
            slots.default,
            {
              value:
                mergedValue === null || Array.isArray(mergedValue)
                  ? ''
                  : mergedValue
            },
            () => [
              maxlength === undefined
                ? wordCountRef.value
                : `${wordCountRef.value} / ${maxlength}`
            ]
          )}
        </span>
      )
    }
  }
})
