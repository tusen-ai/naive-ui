1. Dark theme 的 color-theme，github theme 要跟进，其他的无所谓
2. github 的 heatmap 不会有多余的块，应该补全所有的块，是个完美的长方形
3. indicator 的 indicator-leading-text 和 indicator-trailing-text 应该允许用 slot 配置（就是 less text 和 large text）
4. colors 应该拆成两个，一个是 minimumColor，默认 undefined，然后 light 和 dark 都走 naive 的主题配置，另一个应该是 activeColors，然后和 minimumColor 拼成 colors，再执行内部的逻辑
5. info slot => footer
