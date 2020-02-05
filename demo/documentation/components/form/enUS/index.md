# Form
<!--single-column-->
Collect & validate data.
## Demos
```demo
inline
custom-rule
top
left
```
## Props
### Form Props
|Name|Type|Default|Description|
|-|-|-|-|
|inline|`boolean`|`false`||
|label-width|`number`|`null`|The width of label. Can be useful when `label-placement` is `'left'`.|
|label-align|`'left' \| 'right'`|`'left'`|Text align in label.|
|label-placement|`'left' \| 'top'`|`'top'`||
|model|`object`||The object to get collected value from form items. **required**|
|rules|`type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }`|`{}`|The rules to validate form items.|
|show-require-mark|`boolean`|`true`|Whether to show require mark when form item is required.|

#### FormItemRule Type
|Property|Type|Description|
|-|-|-|
|required|`boolean`||
|validator|`(rule: FormItemRule, value: any) => boolean \| Error`||
|trigger|`string \| Array<string>`||
|message|`string`||


### Form Item Props
|Name|Type|Default|Description|
|-|-|-|-|
|label|`string`|`null`||
|label-width|`number`|`null`|If not set, use label-align from wrapper form.|
|label-style|`object`|`{}`||
|label-align|`'left' \| 'right'`|`null`|Text align in label. If not set, use label-align from wrapper form.|
|label-placement|`'left' \| 'top'`|`null`|If not set, use label-placement from wrapper form.|
|path|`string`|`null`|The path to collect item value to wrapper form's model object.|
|rule-path|`string`|`null`|The path to get rule from wrapper form's rule object. If not set, use path of the form item instead.|
|required|`boolean`|`false`|Whether to show required mark. Note: a required rule has higher priority than this props & this prop **won't** change the validation process. The validation still depends on the rules.|
|show-require-mark|`boolean`|`true`|Whether to show require mark when form item is required. If not set, use show-require-mark from wrapper form.|
|rule|`FormItemRule \| Array<FormItemRule>`|`null`|The rule to validate the form item. It will be merged with the rules acquired by rule-path from wrapper form's rules. It's recommend to set all rules on wrapper form.|
|first|`boolean`|`false`|Whether only to show the first validation error message.|

### Form Item Row Props
Accept all props from form-item & [Row](n-row#Row-Props)
### Form Item Col Props
Accept all props from form-item & [Col](n-row#Col-Props)

## Methods
### Form Methods
<n-alert type="warning" title="Caveat on Validate Method" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>Validation will only be executed on form items which have a `path`</n-li>
    <n-li>Validation will use the path to get collected value from form `model`, then use `path` or `rule-path`(if specified) to get validation rules</n-li>
    <n-li>Validation will use all rules regardless of the triggers of form items.</n-li>
  </n-ol>
</n-alert>

|Name|Type|Description|
|-|-|-|
|validate|`(validateCallback?: (errors?: Array<ValidationError>) => any) => Promise<void>`|Validate the form.The rejection value type of returned promise is `Array<ValidationError>`.|
|clearValidationEffect|`() => void`||

### Form Item, Form Item Row, Form Item Col Methods
|Name|Type|Description|
|-|-|-|
|validate|`(trigger?: string, validateCallback?: (errors?: Array<ValidationError>) => any, options?: AsyncValidatorOptions) => Promise<void>`|Validate the form item. The rejection value type of returned promise is `Array<ValidationError>`. If trigger is not passed, all rules of the item will be applied.|
|clearValidationEffect|`() => void`||

About AsyncValidatorOptions, see [async-validator](https://github.com/yiminghe/async-validator).

## Slots
### Form, Form Item, Form Item Row, Form Item Col Methods
|Name|Parameters|Description|
|-|-|-|
|default|`()`||