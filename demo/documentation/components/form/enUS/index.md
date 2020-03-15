# Form
<!--single-column-->
Collect & validate data.
## Demos
```demo
inline
custom-rule
top
left
async
```
## Props
### Form Props
|Name|Type|Default|Description|
|-|-|-|-|
|inline|`boolean`|`false`||
|label-width|`number \| string`|`null`|The width of label. Can be useful when `label-placement` is `'left'`.|
|label-align|`'left' \| 'right'`|`'left'`|Text align in label.|
|label-placement|`'left' \| 'top'`|`'top'`||
|model|`object`|`{}`|The object to get collected value from form items.|
|rules|`type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }`|`{}`|The rules to validate form items.|
|show-require-mark|`boolean`|`true`|Whether to show require mark when form item is required.|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||

#### FormItemRule Type
|Property|Type|Description|
|-|-|-|
|required|`boolean`||
|validator|`(rule: FormItemRule, value: any) => boolean \| Error`||
|asyncValidator|`(rule: FormItemRule, value: any, callback: boolean => void) => void`||
|trigger|`string \| Array<string>`||
|message|`string`||


### Form Item Props
|Name|Type|Default|Description|
|-|-|-|-|
|label|`string`|`null`||
|label-width|`number \| string`|`null`|If not set, use `label-width` from the wrapper form.|
|label-style|`object`|`{}`||
|label-align|`'left' \| 'right'`|`null`|Text align in label. If not set, use `label-align` from wrapper form.|
|label-placement|`'left' \| 'top'`|`null`|If not set, use `label-placement` from wrapper form.|
|path|`string`|`null`|The path to collect item value to wrapper form's model object.|
|rule-path|`string`|`null`|The path to get rule from wrapper form's rule object. If not set, use path of the form item instead.|
|required|`boolean`|`false`|Whether to show required mark. Note: a required rule has higher priority than this prop & this prop **won't** have any effect on validation. The validation still depends on the rules.|
|show-require-mark|`boolean`|`true`|Whether to show require mark when form item is required. If not set, use `show-require-mark` from wrapper form.|
|rule|`FormItemRule \| Array<FormItemRule>`|`null`|The rule to validate the form item. It will be merged with the rules acquired by `rule-path` from wrapper form's rules. It's recommend to set all rules on wrapper form.|
|first|`boolean`|`false`|Whether only to show the first validation error message.|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|ingore-path-change|`boolean`|`false`|Usually, the change of `path` will cause the data source's variation. So naive-ui will clear the validation result. If it is not expected, you can set it to `true`|


### Form Item Row Props
Accept all props from form-item & [Row](n-row#Row-Props)
### Form Item Col Props
Accept all props from form-item & [Col](n-row#Col-Props)

## Methods
### Form Methods
<n-alert type="warning" title="Caveat on Validate Method" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>Validation will only be executed on form items which have a <n-text code>path</n-text></n-li>
    <n-li>By default, validation will use all rules regardless of the triggers of the rules.</n-li>
  </n-ol>
</n-alert>

|Name|Type|Description|
|-|-|-|
|validate|`(validateCallback?: (errors?: Array<ValidationError>) => any, shouldRuleBeApplied?: FormItemRule => boolean) => Promise<void>`|Validate the form. The rejection value type of returned promise is `Array<ValidationError>`.|
|clearValidationEffect|`() => void`||

### Form Item, Form Item Row, Form Item Col Methods
|Name|Type|Description|
|-|-|-|
|validate|`({ trigger?: string, callback?: (errors?: Array<ValidationError>) => any, shouldRuleBeApplied?: FormItemRule => boolean, options?: AsyncValidatorOptions }) => Promise<void>`|Validate the form item. The rejection value type of returned promise is `Array<ValidationError>`. If trigger is not set, all rules of the item will be applied. `shouldRuleBeApplied` can filter rules after they are filtered by the trigger.|
|clearValidationEffect|`() => void`||

About AsyncValidatorOptions, see <n-a href="https://github.com/yiminghe/async-validator">async-validator</n-a>.

## Slots
### Form, Form Item, Form Item Row, Form Item Col Methods
|Name|Parameters|Description|
|-|-|-|
|default|`()`||