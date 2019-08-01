## git problem...
我的锅...远程分支没设定好，推得哪个自己都不知道。
## test 时候 vue v-model 产生的效果必须在 $nextTick() 之后才会产生，虽然它声称自己是同步的...
我的锅，忘了为啥了。确实是同步的，是我没有考虑到v-model这东西应该用什么方法测试。
## Vue loader 编译深度选择器出了问题
a >>> b 被编译成了 a > > > b
## input 的 change 不随外界 props value 的改变改变
其他的我还没想好
## 2019.7.17 There may be a bug of chrome
在一个 single filterable select 中，会出现一个 bug...，这个 bug 会让溢出屏幕的 item 不再显示。感觉可能是 Chrome 为了性能优化没有渲染一些在屏幕外面的东西，暂时通过 translateZ(0) 解决了。
## 2019.7.17 Popover
popover 的 hover 有问题，哎...一大堆东西闪来闪去就可能 mouseleave 没触发就一直留在那了
## 2019.7.31 Margin 没有撑开元素
overflow: hidden 可以解决，这是 BFC 的问题

## TODO
issue fix, add delay prop
add trigger to tooltip
outside click delegate select
DatePicker range Bug
Scrollbar Firefox...
scrollbar 在 resize 之后滚动会有问题