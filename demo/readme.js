export default `<div class="markdown-body"><h1 id="naiveui">naive-ui</h1>
<p>TuSimple Vue-Based Frontend Component Library</p>
<h2 id="documentation">Documentation</h2>
<p><a href="http://***REMOVED***/#/start">http://***REMOVED***/#/start</a></p>
<h2 id="repository">Repository</h2>
<p><a href="https://***REMOVED***/naive-ui/tree/develop">https://***REMOVED***/naive-ui/tree/develop</a></p>
<h2 id="developguidelines">Develop Guidelines</h2>
<h3 id="gitcommitmessagestyle">Git Commit Message Style</h3>
<p>You <strong>MUST</strong> follow <a href="https://gist.github.com/brianclements/841ea7bffdb01346392c">Angular Commit Format</a>.</p>
<p>If you want see some example, see <a href="https://github.com/angular/angular/commits/master">Angular Commits on Github</a>.</p>
<h3 id="codestyles">Code Styles</h3>
<h4 id="javascriptstyle">Javascript Style</h4>
<p>You <strong>MUST</strong> follow <a href="https://standardjs.com/">Standard JS</a>.</p>
<h4 id="scssstyle">SCSS Style</h4>
<p>Run <code>npm run lint-style</code> to check styles.</p>
<h4 id="checkboth">Check Both</h4>
<p>Run <code>npm run lint</code>
You <strong>MUST</strong> fix all lint warnings and errors before you push your branch.</p>
<h3 id="unittest">Unit test</h3>
<p>If you create a component, you <strong>MUST</strong> add unit test for it.</p>
<p>Run <code>npm run test</code> to test all components.
Run <code>npm run test-cov</code> to test all components and see detailed test coverage report.</p>
<h2 id="wanttoseehowcomponentworks">Want to see how component works</h2>
<ol>
<li>Run <code>npm run dev</code></li>
<li>Open <code>http://localhost:8086/</code> in browser.</li>
</ol>
<h2 id="wanttoaddyourowncomponent">Want to add your own component</h2>
<p>There is no guideline for now. If you want to know how to do it, you can explore by yourself or ask <code>lecong.zhang@tusimple.ai</code>.</p>
<h2 id="publishanewversion">Publish a new version</h2>
<ol>
<li>You <strong>MUST</strong> change your version according to <a href="https://semver.org/">semver</a></li>
<li><code>npm run release</code></li>
<li>You <strong>MAY</strong> publish documentation by running <code>npm run release-doc</code></li>
</ol>
<h2 id="installationusage">Installation &amp; Usage</h2>
<p>First install it.</p>
<pre><code>npm install --save-dev naive-ui
</code></pre>
<p>Then add the following lines in you entry point js file.</p>
<pre><code>...
import naiveUi from 'naive-ui'
import 'naive-ui/dist/lib/index.css

Vue.use(naiveUi)
...
</code></pre>
<h2 id="componentdevelopstatus">Component Develop Status</h2>
<table>
<thead>
<tr>
<th>Component</th>
<th style="text-align:center;">Develop status</th>
<th style="text-align:center;">Unit Test</th>
<th>Note</th>
</tr>
</thead>
<tbody>
<tr>
<td>Alert</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>Button</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td></td>
</tr>
<tr>
<td>Checkbox</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td></td>
</tr>
<tr>
<td>DatePicker</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>GradientText</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td></td>
</tr>
<tr>
<td>Icon</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td></td>
</tr>
<tr>
<td>Input</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td></td>
</tr>
<tr>
<td>Message</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td>Code clean in need</td>
</tr>
<tr>
<td>Modal</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td>Code clean in need</td>
</tr>
<tr>
<td>Notification</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td>Code clean in need</td>
</tr>
<tr>
<td>Pagination</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td>Unit test is not enough</td>
</tr>
<tr>
<td>Select</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">🆗</td>
<td>Multiple search is not done</td>
</tr>
<tr>
<td>Switch</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>FormItem</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>Form</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>Table</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;">❌</td>
<td>Function is not fulfilled</td>
</tr>
<tr>
<td>Tooltip</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>Popover</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>InputNumber</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;">❌</td>
<td></td>
</tr>
<tr>
<td>Radio</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Tab</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Breadcrumb</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Badge</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Steps</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Tag</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Divider</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Statistic</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Popconfirm</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Anchor</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>BackTop</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Progress</td>
<td style="text-align:center;">😍</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Timeline</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Card</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Collapse</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
<tr>
<td>Cascader</td>
<td style="text-align:center;">🚧</td>
<td style="text-align:center;"></td>
<td></td>
</tr>
</tbody>
</table>
<ol>
<li>Z-index management on <code>Select</code> &amp; <code>Tooltip</code> &amp; <code>Modal</code>(Low Priority)</li>
<li>Full featured table component(Medium Priority)</li>
<li>Form component(Medium Priority)</li>
<li>FormItem component(High Priority)</li>
<li>Complete unit test for all existing components(High Priority)</li>
<li>Create a Markdown webpack loader to convert documentation(Low Priority)</li>
<li>Refactor documentation page(for code clairity)</li>
<li>Code refactor for some 😢  messy code(which is my bad…)</li>
<li>Refactor CSS use mixins(which means I should learn SCSS hard…)</li>
</ol></div>`
