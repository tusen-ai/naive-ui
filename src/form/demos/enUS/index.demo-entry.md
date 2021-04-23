# Form

<!--single-column-->

Collect & validate data.

## Demos

```demo
inline
custom-rule
custom-validation
top
left
item-only
async
```

## Props

### Form Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| inline | `boolean` | `false` |  |
| label-width | `number \| string` | `undefined` | The width of label. Can be useful when `label-placement` is `'left'`. |
| label-align | `'left' \| 'right'` | `'left'` | Text align in label. |
| label-placement | `'left' \| 'top'` | `'top'` |  |
| model | `Object` | `{}` | The object to get collected value from form items. |
| rules | `type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }` | `{}` | The rules to validate form items. |
| show-feedback | `boolean` | `true` |  |
| show-require-mark | `boolean` | `true` | Whether to show require mark when form item is required. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |

#### FormItemRule Type

| Property | Type | Description |
| --- | --- | --- |
| required | `boolean` |  |
| validator | `(rule: FormItemRule, value: any) => boolean \| Error` |  |
| asyncValidator | `(rule: FormItemRule, value: any, callback: boolean => void) => void` |  |
| trigger | `string \| Array<string>` |  |
| message | `string` |  |

### Form Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| feedback | `string` | `undefined` | The feedback message of the form item. If not set to `undefined`, it will take place of the result of rule-based validation. |
| first | `boolean` | `false` | Whether only to show the first validation error message. |
| ingore-path-change | `boolean` | `false` | Usually, the change of `path` will cause the data source's variation. So naive-ui will clear the validation result. If it is not expected, you can set it to `true` |
| label | `string` | `undefined` |  |
| label-align | `'left' \| 'right'` | `undefined` | Text align in label. If not set, use `label-align` from wrapper form. |
| label-placement | `'left' \| 'top'` | `undefined` | If not set, use `label-placement` from wrapper form. |
| label-style | `Object` | `{}` |  |
| label-width | `number \| string` | `undefined` | If not set, use `label-width` from the wrapper form. |
| path | `string` | `undefined` | The path to collect item value to wrapper form's model object. |
| required | `boolean` | `false` | Whether to show required mark. Note: a required rule has higher priority than this prop & this prop **won't** have any effect on validation. The validation still depends on the rules. |
| rule | `FormItemRule \| Array<FormItemRule>` | `undefined` | The rule to validate the form item. It will be merged with the rules acquired by `rule-path` from wrapper form's rules. It's recommend to set all rules on wrapper form. |
| rule-path | `string` | `undefined` | The path to get rule from wrapper form's rule object. If not set, use path of the form item instead. |
| show-feedback | `boolean` | `true` |  |
| show-require-mark | `boolean` | `true` | Whether to show require mark. If not set, use `show-require-mark` from wrapper form. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| validation-status | `'error' \| 'success' \| 'warning'` | `undefined` | The validation status of the form item. If not set to `undefined`, it will take place of the result of rule-based validation. |

### FormItemGi Props

Accept all props from FormItem & [GridItem](grid#GridItem-Props)

## Methods

### Form Methods

<n-alert type="warning" title="Caveat on Validate Method" style="margin-bottom: 16px;">
  By default, validation will use all rules regardless of the triggers of the rules.
</n-alert>

| Name | Type | Description |
| --- | --- | --- |
| validate | `(validateCallback?: (errors?: Array<ValidationError>) => void, shouldRuleBeApplied?: FormItemRule => boolean) => Promise<void>` | Validate the form. The rejection value type of returned promise is `Array<ValidationError>`. |
| clearValidationEffect | `() => void` |  |

### FormItem, FormItemGi Methods

| Name | Type | Description |
| --- | --- | --- |
| validate | `(options: { trigger?: string, callback?: (errors?: Array<ValidationError>) => void, shouldRuleBeApplied?: FormItemRule => boolean, options?: AsyncValidatorOptions }) => Promise<void>` | Validate the form item. The rejection value type of returned promise is `Array<ValidationError>`. If trigger is not set, all rules of the item will be applied. `shouldRuleBeApplied` can filter rules after they are filtered by the trigger. |
| clearValidationEffect | `() => void` |  |

About AsyncValidatorOptions, see <n-a href="https://github.com/yiminghe/async-validator">async-validator</n-a>.

## Slots

### Form, FormItem, FormItemGi Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### FormItem, FormItemGi Slots

| Name  | Parameters | Description |
| ----- | ---------- | ----------- |
| label | `()`       |             |
