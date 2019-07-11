# develop
```
npm run dev
```
@port 8086

# git problem...
我的锅...远程分支没设定好，推得哪个自己都不知道。
# test 时候 vue v-model 产生的效果必须在 $nextTick() 之后才会产生，虽然它声称自己是同步的...
我的锅，忘了为啥了。确实是同步的，是我没有考虑到v-model这东西应该用什么方法测试。