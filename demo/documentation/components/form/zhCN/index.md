# 表单 Form
<!--single-column-->
收集、验证信息

## 演示
```demo
inline
custom-rule
top
left
async
custom-validation
validator-debug
```
## Props
### Form Props
|名称|类型|默认值|说明|
|-|-|-|-|
|inline|`boolean`|`false`||
|label-width|`number \| string`|`null`|标签的宽度，在 `label-placement` 是 `'left'` 的时候可能会有用|
|label-align|`'left' \| 'right'`|`'left'`|标签的文本对齐方式|
|label-placement|`'left' \| 'top'`|`'top'`||
|model|`object`|`{}`|获取表项中收集到的值的对象|
|rules|`type FormRules = { [itemValidatePath: string]: FormItemRule \| Array<FormItemRule> \| FormRules }`|`{}`|验证表项的规则|
|show-require-mark|`boolean`|`true`|在表项是必填的时候是不是展示星号|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||

#### FormItemRule Type
|属性|类型|说明|
|-|-|-|
|required|`boolean`||
|validator|`(rule: FormItemRule, value: any) => boolean \| Error`||
|asyncValidator|`(rule: FormItemRule, value: any, callback: boolean => void) => void`||
|trigger|`string \| Array<string>`||
|message|`string`||

### Form Item Props
|名称|类型|默认值|说明|
|-|-|-|-|
|feedback|`string`|`null`|表项的反馈信息。不设为 `null` 时，会覆盖规则验证的结果|
|first|`boolean`|`false`|是否只展示首个出错信息|
|ingore-path-change|`boolean`|`false`|通常 `path` 的改变会导致数据来源的变化，所以 naive-ui 会清空验证信息。如果不期望这个行为，可以将其置为 `true`|
|label|`string`|`null`||
|label-align|`'left' \| 'right'`|`null`|标签的文本对齐方式。如果没有被设定，使用外层表单的 `label-align`|
|label-placement|`'left' \| 'top'`|`null`|如果没有被设定，使用外层表单的 `label-placement`|
|label-style|`object`|`{}`||
|label-width|`number \| string`|`null`|如果没有被设定，使用外层表单的 `label-width`|
|path|`string`|`null`|将值收集到外层表单 `model` 对象的路径|
|required|`boolean`|`false`|是否展示必填的星号。注意：一个 `required: true` 的规则比这个属性有更高的优先级 & 这个属性不会影响表单的验证。验证完全依赖于规则|
|rule|`FormItemRule \| Array<FormItemRule>`|`null`|验证表项的规则，它会被通过 `rule-path` 从外层表单获取的规则合并来作为表项的验证规则。推荐还是在外层表单设置所有规则|
|rule-path|`string`|`null`|从外层表单的 `rules` 对象获取规则的路径。如果没有设定，使用表项的 `path` 代替|
|show-require-mark|`boolean`|`true`|在表项是必填的时候是不是展示星号。如果没有被设定，使用外层 `n-form` 的 `show-require-mark`|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|validation-status|`'error' \| 'success' \| 'warning' \| null`|`null`|表单的验证状态。不设为 `null`时，会覆盖规则验证的结果|

### Form Item Row Props
接受 Form Item & [Row](n-row#Row-Props) 所有的 Props。
### Form Item Col Props
接受 Form Item & [Col](n-row#Col-Props) 所有的 Props。

## Methods
### Form Methods
<n-alert type="warning" title="Validate 方法的注意事项" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>验证只会在有 <n-text code>path</n-text> 属性的表项上执行</n-li>
    <n-li>默认情况下，验证将会在合法表项的所有规则上进行，不管规则的 trigger 是什么</n-li>
  </n-ol>
</n-alert>

|名称|类型|说明|
|-|-|-|
|validate|`(validateCallback?: (errors?: Array<ValidationError>) => any, shouldRuleBeApplied?: FormItemRule => boolean) => Promise<void>`|验证表单。Promise rejection 的返回值类型是 `Array<ValidationError>`。|
|clearValidationEffect|`() => void`||

### Form Item, Form Item Row, Form Item Col Methods
|名称|类型|说明|
|-|-|-|
|validate|`({ trigger?: string, callback?: (errors?: Array<ValidationError>) => any, shouldRuleBeApplied?: FormItemRule => boolean, options?: AsyncValidatorOptions }) => Promise<void>`|验证表项，Promise rejection 的返回值类型是 `Array<ValidationError>`。如果设定 `trigger`，这一个表项全部的规则都会被使用。`shouldRuleBeApplied` 可以用来进一步过滤已经经过 `trigger` 筛选的规则|
|clearValidationEffect|`() => void`||

关于 AsyncValidatorOptions，参考 <n-a href="https://github.com/yiminghe/async-validator">async-validator</n-a>。

## Slots
### Form, Form Item, Form Item Row, Form Item Col Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

### Form Item, Form Item Row, Form Item Col Slots
|名称|参数|说明|
|-|-|-|
|label|`()`||