# Highlight

If you've used a search engine, you should know what it is.

Available since `NEXT_VERSION`.

## Demos

```demo
basic.vue
style.vue
case-sensitive.vue
component.vue
```

## API

### Highlight Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| auto-espace | `boolean` | `true` | Whether to escape patterns automatically. By default, elements in patterns will be converted into regular expressions for matching, and this process includes automatic escaping, so that the regular expressions will match the literal content of the elements. For example, `\(` will match `\(`. If you need the n-highlight component to match using regular expressions constructed from the elements in patterns themselves (e.g., `\(` matches `(`), you can set this to false. If you do not understand these details, do not change this setting. | NEXT_VERSION |
| case-sensitive | `boolean` | `false` | Case sensitive or not. | NEXT_VERSION |
| highlight-class | `string` | `undefined` | Class name of the highlight content. | NEXT_VERSION |
| highlight-style | `Object \| string` | `undefined` | Style of the highlight content. | NEXT_VERSION |
| highlight-tag | `string` | `'mark'` | HTML element tag of the highlight content. | NEXT_VERSION |
| patterns | `string[]` | `undefined` | Highlight text. | NEXT_VERSION |
| text | `string` | `undefined` | Text. | NEXT_VERSION |
