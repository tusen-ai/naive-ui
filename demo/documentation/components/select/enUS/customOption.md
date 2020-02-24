# Custom Option Render
After a long time of consideration, I decide to drop slot API. However, there is still a way to render options as you like.
```html
<n-select
  v-model="value"
  :options="options"
/>
```
```js
import mdMusicalNote from 'naive-ui/lib/icons/md-musical-note'

function render (h, option, selected) {
  return [
    h('n-config-consumer', {
      props: {
        abstract: true
      },
      scopedSlots: {
        default ({ styleScheme }) {
          return h('n-icon', {
            style: {
              fill: selected ? styleScheme.primaryColor : styleScheme.tertiaryTextColor,
              verticalAlign: 'middle',
              marginRight: '4px',
            }
          }, [h(mdMusicalNote)])
        }
      }
    }),
    option.label
  ]
}

export default {
  data () {
    return {
      value: null,
      options: [
        {
          type: 'group',
          name: 'Rubber Soul',
          render: (h, data) => h('span', [ data.name, '(Cool!)']),
          children: [
            {
              label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
              value: 'song0',
              disabled: true
            },
            {
              label: 'Drive My Car',
              value: 'song1'
            },
            {
              label: 'Norwegian Wood',
              value: 'song2'
            },
            {
              label: 'You Won\'t See',
              value: 'song3',
              disabled: true
            },
            {
              label: 'Nowhere Man',
              value: 'song4'
            },
            {
              label: 'Think For Yourself',
              value: 'song5'
            },
            {
              label: 'The Word',
              value: 'song6'
            },
            {
              label: 'Michelle',
              value: 'song7',
              disabled: true
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
              label: 'I\'m looking through you',
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
          ].map(v => {
            v.render = render
            return v
          })
        },
        {
          type: 'group',
          name: 'Let It Be',
          render: (h, data) => h('span', [ data.name, '(Cool!)']),
          children: [
            {
              label: 'Two Of Us',
              value: 'Two Of Us'
            },
            {
              label: 'Dig A Pony',
              value: 'Dig A Pony'
            },
            {
              label: 'Across The Universe',
              value: 'Across The Universe'
            },
            {
              label: 'I Me Mine',
              value: 'I Me Mine'
            },
            {
              label: 'Dig It',
              value: 'Dig It'
            },
            {
              label: 'Let It Be',
              value: 'Let It Be'
            },
            {
              label: 'Maggie Mae',
              value: 'Maggie Mae'
            },
            {
              label: 'I\'ve Got A Feeling',
              value: 'I\'ve Got A Feeling'
            },
            {
              label: 'One After 909',
              value: 'One After 909'
            },
            {
              label: 'The Long And Winding Road',
              value: 'The Long And Winding Road'
            },
            {
              label: 'For You Blue',
              value: 'For You Blue'
            },
            {
              label: 'Get Back',
              value: 'Get Back'
            }
          ].map(v => {
            v.render = render
            return v
          })
        }
      ]
    }
  }
}
```
```css
.n-select {
  width: 180px;
  margin: 0 12px 8px 0;
}
```