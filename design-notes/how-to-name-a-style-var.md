# How to Name a Style Var

For example, you have a button, which has `default` and `error` type. How will you name the background color of the button.

```
buttonColor
errorButtonColor
```

or

```
buttonColor
buttonColorError
```

The second is the better (The second is easy to extend and read. Also it follow the css pattern for example `padding-right` and `padding-left`).

When it comes to hover style?

```
buttonColor
buttonColorHover
buttonColorError
buttonColorErrorHover <-
```

or

```
buttonColor
buttonColorHover
buttonColorError
buttonColorHoverError <-
```

The second is the better since if you want write a map entity, you always loop on types. For example:

```js
// better
;['Default', 'Error'].map((type) => [
  'buttonColor' + type,
  'buttonColorHover' + type
])
// worse, hard to maintain
;['Default', 'Error'].map((type) => [
  'button' + type + 'Color',
  'buttonHover' + type + 'Color'
])
```
