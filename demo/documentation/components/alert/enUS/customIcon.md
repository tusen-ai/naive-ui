# Custom Icon
Use custom icon such as image.
```html
<n-alert>
  <template v-slot:icon>
    <img
      src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOS44IDE4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmOTJhNDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFsZXJ0IC0gSWNvbiAyPC90aXRsZT48ZyBpZD0iUGFnZS0xIj48ZyBpZD0iR3JvdXAtNC1Db3B5LTQiPjxnIGlkPSJHcm91cC01Ij48ZyBpZD0iTm90aWZpY2F0aW9uIj48cGF0aCBpZD0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTS43NSw1LjE5QTEuMzQsMS4zNCwwLDAsMCwwLDYuMzF2NS42MUExLjMsMS4zLDAsMCwwLC43NiwxM2wxMiw0LjkxYS41MS41MSwwLDAsMCwuNzYtLjQ5Vi41NGEuNDkuNDksMCwwLDAtLjc1LS40OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNS4zLDQuNWE0LjUsNC41LDAsMCwxLDAsOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
      style="height: 19px; width: 19px;"
    />
  </template>
  You don't know how lucky you are boy
</n-alert>
<n-alert title="Back in the U.S.S.R." type="error">
  <template v-slot:icon>
    <img
      src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOS44IDE4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmOTJhNDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFsZXJ0IC0gSWNvbiAyPC90aXRsZT48ZyBpZD0iUGFnZS0xIj48ZyBpZD0iR3JvdXAtNC1Db3B5LTQiPjxnIGlkPSJHcm91cC01Ij48ZyBpZD0iTm90aWZpY2F0aW9uIj48cGF0aCBpZD0iU2hhcGUiIGNsYXNzPSJjbHMtMSIgZD0iTS43NSw1LjE5QTEuMzQsMS4zNCwwLDAsMCwwLDYuMzF2NS42MUExLjMsMS4zLDAsMCwwLC43NiwxM2wxMiw0LjkxYS41MS41MSwwLDAsMCwuNzYtLjQ5Vi41NGEuNDkuNDksMCwwLDAtLjc1LS40OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNS4zLDQuNWE0LjUsNC41LDAsMCwxLDAsOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
      style="height: 19px; width: 19px;"
    />
  </template>
  Back in the U.S.<br />
  Back in the U.S.<br />
  Back in the U.S.S.R.
</n-alert>
```
```css
.n-alert {
  margin-bottom: 12px;
}
```