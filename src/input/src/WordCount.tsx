/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, inject, h } from 'vue'
import { inputInjectionKey } from './interface'

export default defineComponent({
  name: 'InputWordCount',
  setup () {
    const { wordCountRef, maxlengthRef, mergedClsPrefixRef } =
      inject(inputInjectionKey)!
    return () => {
      const { value: maxlength } = maxlengthRef
      return (
        <span class={`${mergedClsPrefixRef.value}-input-word-count`}>
          {maxlength === undefined
            ? wordCountRef.value
            : `${wordCountRef.value} / ${maxlength}`}
        </span>
      )
    }
  }
})
