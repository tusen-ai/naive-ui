# 加载条 Loading Bar 
焦虑的安慰剂，疗效尚可。
## 演示
```demo
basic
```
## API
### $NLoadingBar
#### $NLoadingBar Methods
|名称|类型|说明|
|-|-|-|
|`start`|`(option: LoadingBarOption) => void`||
|`finish`|`(option: LoadingBarOption) => void`||
|`error`|`(option: LoadingBarOption) => void`||

#### $NLoadingBar Properties
|名称|类型|说明|
|-|-|-|
|theme|`'light' \| 'dark'`|如果设定会将 `$NLoadingBar` 的全局主题设为该主题，如果没有设定则全局主题则取决于调用位置（它工作起来和 <n-a to="n-message#about-theme">$NMessage 的主题</n-a>比较像，在大多数情况下你不用为此而操心）|

#### LoadingBarOption Properties
|名称|类型|说明|
|-|-|-|
|theme|`'light' \| 'dark'`|如果设定会将该加载条的主题设为该主题，如果没有设定则会使用 `$NLoadingBar` 的全局主题|