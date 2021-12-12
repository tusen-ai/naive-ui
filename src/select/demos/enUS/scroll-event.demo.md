# Scroll event

A colleague of mine wanted to use a scroll event for loading options asynchronously. Here's that example.

```html
<n-select v-model:value="value" :options="options" @scroll="handleScroll" />
<pre>
{{
  JSON.stringify({
    scrollContentHeight,
    scrollContainerScrollTop,
    scrollContainerHeight
  }, 0, 2)
}}</pre
>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const scrollContentHeightRef = ref(null)
    const scrollContainerHeightRef = ref(null)
    const scrollContainerScrollTopRef = ref(null)

    return {
      value: ref(null),
      scrollContentHeight: scrollContentHeightRef,
      scrollContainerHeight: scrollContainerHeightRef,
      scrollContainerScrollTop: scrollContainerScrollTopRef,
      options: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: "I'm looking through you",
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ],
      handleScroll (e) {
        scrollContentHeightRef.value = e.target.firstElementChild.offsetHeight
        scrollContainerScrollTopRef.value = e.target.scrollTop
        scrollContainerHeightRef.value = e.target.offsetHeight
      }
    }
  }
})
```
