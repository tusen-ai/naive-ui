# Grid
<!--single-column-->
A basic grid system. The grid is not responsive, for I have not enough time, ha...

However, I think it is wired that when grid is responsive but nearly all other components is not responsive. It is not a good idea to put all responsibility to ui-framework for building a responsive layout.

Developers always say that no silver bullet. I agree with it. So far as I know, nothing can make you write code once without handling any corner case of the whole user interface. I don't always try to find a perfect way to solving a problem. If thing itself is complicate (after your carefully thinking), accepting it (and start to solving it case by case) would always be a nice way.

## Demos
```demo
basic
gutter
offset
push-pull
```
## Props

### Row
|Name|Type|Default|Description|
|-|-|-|-|
|gutter|`number \| Array`| `0` | `horizontal gutter` or `[horizontal gutter, vertical gutter]`|

### Col
|Name|Type|Default|Description|
|-|-|-|-|
|span|`number`|1||
|offset|`number`|0||
|push|`number`|0||
|pull|`number`|0||