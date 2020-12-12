# Scroll Event

My colleague said he want use scroll status to async load options.

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
export default {
  data() {
    return {
      value: null,
      array: null,
      scrollContentHeight: null,
      scrollContainerHeight: null,
      scrollContainerScrollTop: null,
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
      ]
    }
  },
  methods: {
    handleScroll(e) {
      this.scrollContentHeight = e.target.firstElementChild.offsetHeight
      this.scrollContainerScrollTop = e.target.scrollTop
      this.scrollContainerHeight = e.target.offsetHeight
    }
  }
}
```
