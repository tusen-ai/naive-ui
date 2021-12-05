# Form

<!--single-column-->

The element to collect and validate data.

## Demos

```demo
inline
custom-rule
custom-validation
top
left
item-only
async
disabled
show-label
partially-apply-rules
```

## API

### Form Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether to disable the form. |
| inline | `boolean` | `false` | Whether to display as an inline form. |
| label-width | `number \| string` | `undefined` | The width of label. Particularly useful when `label-placement` is set to `'left'`. |
| label-align | `'left' \| 'right'` | `-` | Label text alignment. |
| label-placement | `'left' \| 'top'` | `'top'` | Label placement. |
| model | `Object` | `{}` | The object to get/set form item values. |
| rules | `type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }` | `{}` | The rules to validate form items. |
| show-feedback | `boolean` | `true` | Whether to show the feedback area. |
| show-label | `boolean` | `true` | Whether to show the label. |
| show-require-mark | `boolean` | `-` | Whether to show a required symbol when a form item is required. |
| require-mark-placement | `'left' \| 'right'` | `'right'` | Require mark placement |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |

#### FormItemRule Type

<n-alert title="Caveat" type="warning" style="margin-bottom: 16px;">
  The follow table doesn't demostrate all props of rules. If you want to know all the usages, please see <n-a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</n-a>.
</n-alert>

| Property | Type | Description |
| --- | --- | --- |
| required | `boolean` | Is it required. |
| validator | `(rule: FormItemRule, value: any) => boolean \| Error` | Validation rule. |
| asyncValidator | `(rule: FormItemRule, value: any, callback: boolean => void) => void` | Asynchronous validation in the form of a callback. |
| trigger | `string \| Array<string>` | Trigger type. |
| message | `string` | Text to show when validation fails. |

### FormItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| feedback | `string` | `undefined` | The feedback message of the form item. If set, it will replace any result of rule-based validation. |
| first | `boolean` | `false` | Whether to only show the first validation error message. |
| ignore-path-change | `boolean` | `false` | Usually, changing `path` will cause a re-render and naive-ui will clear the validation result. Setting `ignore-path-change` to `true` will disable that behavior. |
| label | `string` | `undefined` | Label. |
| label-align | `'left' \| 'right'` | `undefined` | Text alignment inside the label. If not set, it will inherit the parent form's `label-align`. |
| label-placement | `'left' \| 'top'` | `undefined` | If not set, it will inherit the parent form's `label-placement`. |
| label-style | `Object` | `{}` | Label style. |
| label-width | `number \| string` | `undefined` | If not set, it will inherit the parent form's `label-width`. |
| path | `string` | `undefined` | The path to use in the parent form's model object. |
| required | `boolean` | `false` | Whether to show the "required" symbol. Note: a required rule has higher priority than this prop & this prop **won't** have any effect on validation. Validation still depends on rules. |
| rule | `FormItemRule \| Array<FormItemRule>` | `undefined` | The rule to validate this form item. It will be merged with the rules acquired by `rule-path` from the parent form's rules. It's recommended to set all rules on the parent form. |
| rule-path | `string` | `undefined` | The path to get rules from the parent form's rule object. If not set, it will use the path of the parent form item instead. |
| show-feedback | `boolean` | `true` | Whether to show the feedback area. |
| show-label | `boolean` | `true` | Whether to show a label. If not set, it will inherit `show-label` from the parent form. |
| show-require-mark | `boolean` | `-` | Whether to show required symbol. If not set, it will use `show-require-mark` from the parent form. |
| require-mark-placement | `'left' \| 'right'` | `'right'` | Require mark placement. If not set, it will use `require-mark-placement` from the parent form. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| validation-status | `'error' \| 'success' \| 'warning'` | `undefined` | The validation status of the form item. If set, it will replace the result of the rule-based validation. |

### FormItemGi Props

Accept all props from FormItem & [GridItem](grid#GridItem-Props)

### Form Methods

<n-alert type="warning" title="Caveat on Validate Method" style="margin-bottom: 16px;">
  By default, validation will use all rules regardless of the triggers of the rules.
</n-alert>

| Name | Type | Description |
| --- | --- | --- |
| validate | `(validateCallback?: (errors?: Array<FormValidationError>) => void, shouldRuleBeApplied?: FormItemRule => boolean) => Promise<void>` | Validate the form. The rejection value type of returned promise is `Array<FormValidationError>`. |
| restoreValidation | `() => void` | Restore validate. |

### FormItem, FormItemGi Methods

| Name | Type | Description |
| --- | --- | --- |
| validate | `(options: { trigger?: string, callback?: (errors?: Array<FormValidationError>) => void, shouldRuleBeApplied?: FormItemRule => boolean, options?: AsyncValidatorOptions }) => Promise<void>` | Validate the form item. The rejection value type of returned promise is `Array<FormValidationError>`. If trigger is not set, all rules of the item will be applied. `shouldRuleBeApplied` can filter rules after they are filtered by the trigger. |
| restoreValidation | `() => void` | Restore validate. |

To find out more about AsyncValidatorOptions, see <n-a href="https://github.com/yiminghe/async-validator" target="_blank">async-validator</n-a>.

### Form, FormItem, FormItemGi Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       | Content     |

### FormItem, FormItemGi Slots

| Name  | Parameters | Description   |
| ----- | ---------- | ------------- |
| label | `()`       | Label content |
