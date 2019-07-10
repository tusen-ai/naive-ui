# naive-ui
TuSimple Vue-Based Frontend Component Library
# Documentation
http://***REMOVED***/#/start
# Start Develop
- packages
- packages/commons
- packages/nimbus
- styles
- test
- demo
- build
# Want to see how component works
Run `npm run build`, then open `http://localhost:8086/` in browser.
# Want to add your own component?
1. add some thing in packages
2. add some thing in demo/index.js demo/components
3. add some thing to index.js
# Publish a new version
`npm run release`
# Want to use this ui?
`npm install --save-dev naive-ui`
```
...
import naiveUi from 'naive-ui'
import 'naive-ui/dist/lib/index.css

Vue.use(naiveUi)
...
```
# Component Develop Status
|Component|Unit Test|
|-|-|
|Alert|not done|
|Button|done|
|Checkbox|done|
|DatePicker|not done|
|GradientText|done|
|Icon|done|
|Input|done|
|Message|not done|
|Modal|not done|
|Notification|not done|
|Pagination|not done|
|Popup|not done|
|Select|done|
|Switch|not done|
|Tooltip|not done|

# Todo
Z-index management on `Select` & `Tooltip` & `Modal`! 这几个东西的顺序管理实在是有点麻烦，放在之后完善吧...