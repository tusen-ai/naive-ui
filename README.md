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
1. Run `npm run build`
2. Open `http://localhost:8086/` in browser.
# Want to add your own component
1. add some thing in packages
2. add some thing in demo/index.js demo/components
3. add some thing to index.js
# Publish a new version
1. First change your version according to [semver](https://semver.org/)
2. `npm run release`
# Want to use this ui
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
|Alert|❌|
|Button|🆗|
|Checkbox|🆗|
|DatePicker|❌|
|GradientText|🆗|
|Icon|🆗|
|Input|🆗|
|Message|❌|
|Modal|❌|
|Notification|❌|
|Pagination|❌|
|Popup|❌|
|Select|🆗|
|Switch|❌|
|Tooltip|❌|

# Todo
1. Z-index management on `Select` & `Tooltip` & `Modal`(Low Priority)
2. Full featured table component(Medium Priority)
3. Form component(Medium Priority)
4. Complete unit test for all existing components(High Priority)
