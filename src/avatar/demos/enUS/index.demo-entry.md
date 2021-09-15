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
group
```

## API

### Avatar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | The background color of the avatar. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| src | `string` | `undefined` | Avatar's image source. |
| round | `boolean` | `false` | Whether to display a rounded avatar. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the avatar image fails to load. |

### Avatar Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| vertical | `boolean` | `false` | Directions of avatars in the group. |
| maxAvatarCount | `number` | `undefined` | Max avatar count in the group. |
| maxAvatarStyle | `Object \| string` | `undefined` | The style to trigger the hidden avatars. |

see [Avatar Props](avatar#Props)

### Avatar Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the avatar. |

### Avatar Group Slots

| Name    | Parameters | Description                      |
| ------- | ---------- | -------------------------------- |
| default | `()`       | The content of the avatar group. |
