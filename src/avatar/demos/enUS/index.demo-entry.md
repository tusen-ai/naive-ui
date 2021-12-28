# Avatar

On the Internet, nobody knows you're a dog.

## Demos

```demo
size
shape
color
badge
icon
name-size
fallback
group.vue
v-show-debug
```

## API

### Avatar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display a avatar with border. |
| color | `string` | `undefined` | The background color of the avatar. |
| fallback-src | `string` | `undefined` | Image URL to show when avatar fails to load. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| src | `string` | `undefined` | Avatar's image source. |
| round | `boolean` | `false` | Whether to display a rounded avatar. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the avatar image fails to load. |

### AvatarGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| max | `number` | `undefined` | Max avatar count in the group. |
| max-style | `Object \| string` | `undefined` | The style of the overflow placeholder. |
| options | `Array<AvatarOption>` | `[]` | Avatar group options. |
| vertical | `boolean` | `false` | Whether display a vertical avatar group. |

see [Avatar Props](avatar#Props)

### Avatar Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the avatar. |

### AvatarGroup Slots

| Name | Parameters | Description |
| --- | --- | --- |
| avatar | `(info: { option: { src: string } })` | Avatar of the avatar group. |
| default | `()` | The content of the avatar group. |
| rest | `(info: { options: Array<{ src: string }>, rest: number })` | Overflow indicator of the avatar group. |
