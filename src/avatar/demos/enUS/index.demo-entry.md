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
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| src | `string` | `undefined` | Avatar's source. |
| color | `string` | `undefined` | The background color of the avatar. |
| round | `boolean` | `false` | Whether to display a rounded avatar. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the avatar image fails to load. |

## Slots

| Name    | Parameters | Description                       |
| ------- | ---------- | --------------------------------- |
| default | `()`       | The content filled in the avatar. |
