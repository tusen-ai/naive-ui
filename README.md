# naive-ui
TuSimple Vue-Based Frontend Component Library
# Start Develop / 开始开发
- packages
- packages/commons
- packages/nimbus
- styles
- test
- demo
- build
# Want to see how component works / 想看看组件效果？
`npm run dev` @ port 8086
# Want to add your own component?
1. add some thing in packages
2. add some thing in demo/index.js demo/components
3. add some thing to index.js
# Publish a new version / 想发布一个新的版本
`npm run build`
# Want to use this ui?
`npm install --save-dev naive-ui`
```
...
import installNaiveUiTo from 'naive-ui'
installNaiveUiTo(Vue)
import 'naive-ui/dist/lib/index.css'
...
```
