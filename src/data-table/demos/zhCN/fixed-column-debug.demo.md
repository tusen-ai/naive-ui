# Fixed Column Debug

```html
<n-data-table
  bordered
  :scroll-x="2000"
  :max-height="200"
  :data="data"
  :columns="columns"
  :single-line="false"
  :pagination="pagination"
/>
```

```js
import { defineComponent, ref } from 'vue'

function createCols () {
  return [
    {
      title: 'Name',
      key: 'name',
      fixed: 'left',
      children: [
        {
          title: '1',
          key: '1',
          fixed: 'left',
          width: 100
        },
        {
          title: '2',
          key: '2',
          fixed: 'left',
          width: 100
        },
        {
          title: '3',
          key: '3',
          fixed: 'left',
          width: 100
        },
        {
          title: '4',
          key: '4',
          fixed: 'left',
          width: 100
        },
        {
          title: '5',
          key: '5',
          fixed: 'left',
          width: 100
        },
        {
          title: '6',
          key: '6',
          fixed: 'left',
          width: 100
        }
      ]
    },
    { title: 'Name2', key: 'name1', fixed: 'left', width: 100 },
    { title: 'Name3', key: 'name2', fixed: 'left', width: 100 },
    {
      title: 'Attrs',
      key: 'attrs',
      children: [
        {
          title: 'Attack',
          key: 'attack',
          children: [
            {
              title: 'Physics Attack',
              key: 'physicsAttack'
            },
            {
              title: 'Magic Attack',
              key: 'magicAttack'
            }
          ]
        },
        {
          title: 'Defend',
          key: 'defend'
        },
        {
          title: 'Speed',
          key: 'speed'
        },
        {
          title: 'Defend1',
          key: 'defend1'
        },
        {
          title: 'Speed2',
          key: 'speed2'
        }
      ]
    }
  ]
}

function createData () {
  return Array.apply(null, { length: 50 }).map((_, i) => {
    return {
      key: i,
      name: `name_${i}`,
      physicsAttack: `physicsAttack_${i}`,
      magicAttack: `magicAttack_${i}`,
      defend: `defend_${i}`,
      speed: `speed_${i}`
    }
  })
}

export default defineComponent({
  setup () {
    return {
      data: ref(createData()),
      columns: ref(createCols()),
      pagination: ref({
        pageSize: 10
      })
    }
  }
})
```
