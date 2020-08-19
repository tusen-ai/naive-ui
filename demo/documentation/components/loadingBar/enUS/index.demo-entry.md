# Loading Bar
A kind of good placebo for anxiety.
## Demos
```demo
basic
```
## API
### $NLoadingBar
#### $NLoadingBar Methods
|Name|Type|Description|
|-|-|-|
|`start`|`(option: LoadingBarOption) => void`||
|`finish`|`(option: LoadingBarOption) => void`||
|`error`|`(option: LoadingBarOption) => void`||

#### $NLoadingBar Properties
|Name|Type|Description|
|-|-|-|
|theme|`'light' \| 'dark'`|If set, it will be used as the global theme of `$NLoadingBar`. If not set, the global theme of `$NLoadingBar` will depends on where it is called. (It works nearly the same as <n-a to="n-message#about-theme">$NMessage's theme</n-a>, and in most cases you don't need to set the property.)|

#### LoadingBarOption Properties
|Name|Type|Description|
|-|-|-|
|theme|`'light' \| 'dark'`|If set it will be used as the theme of loading bar. If not the global theme of `$NLoadingBar` will be used.|