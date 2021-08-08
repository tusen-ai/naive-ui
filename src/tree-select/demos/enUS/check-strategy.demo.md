# Set Check Strategy

# all: show all checked node; parent: show all checked parent node when all child node are checked; child: show all child node

```html
<n-tree-select
  multiple
  cascade
  checkable
  checkStrategy="parent"
  :options="options"
  :default-value="['Dig It', 'go']"
  @update:value="updateValue"
/>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label:
                "Everybody's Got Something to Hide Except Me and My Monkey",
              key: "Everybody's Got Something to Hide Except Me and My Monkey"
            },
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
              disabled: true
            },
            {
              label: 'Norwegian Wood',
              key: 'Norwegian Wood'
            },
            {
              label: "You Won't See",
              key: "You Won't See",
              disabled: true
            },
            {
              label: 'Nowhere Man',
              key: 'Nowhere Man'
            },
            {
              label: 'Think For Yourself',
              key: 'Think For Yourself'
            },
            {
              label: 'The Word',
              key: 'The Word'
            },
            {
              label: 'Michelle',
              key: 'Michelle',
              disabled: true
            },
            {
              label: 'What goes on',
              key: 'What goes on'
            },
            {
              label: 'Girl',
              key: 'Girl'
            },
            {
              label: "I'm looking through you",
              key: "I'm looking through you"
            },
            {
              label: 'In My Life',
              key: 'In My Life'
            },
            {
              label: 'Wait',
              key: 'Wait'
            }
          ]
        },
        {
          label: 'Let It Be',
          key: 'Let It Be Album',
          children: [
            {
              label: 'Two Of Us',
              key: 'Two Of Us'
            },
            {
              label: 'Dig A Pony',
              key: 'Dig A Pony'
            },
            {
              label: 'Across The Universe',
              key: 'Across The Universe',
              children: [
                {
                  label: 'Dig It',
                  key: 'Dig It'
                },
                {
                  label: 'go',
                  key: 'go'
                }
              ]
            }
          ]
        }
      ],
      updateValue: (values) => {
        console.log(values)
      }
    }
  }
})
```
