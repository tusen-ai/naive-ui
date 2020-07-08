<!--no-demo-->
# Experimental Features
<n-alert type="warning" title="Caveats">
  The following features are <n-text strong>unstable</n-text>. Use them if you really need and perpare to follow the API changes.
</n-alert>

## Customize Theme
It is a experimental feature, since naive-ui use both CSS-in-JS and Scss. I haven't find a solution to integrate them together in an elegant way.

I'm planning to rewrite all the styles using CSS-in-JS. Before it has been done, the following methods will only be a workaround.


Currently you can only change the primary color.

Firstly, you should create a `.scss` file. Insert getter functions first and then import the entry `.scss` of naive-ui. You may need to config sass-loader.

```scss
// customized-style.scss

@function get-primary-color ($theme) {
  @if $theme == 'light' {
    @return rgb(255, 0, 0);
  }
  @return null;
}

@function get-primary-hover-color ($theme) {
  @if $theme == 'light' {
    @return rgb(0, 255, 0);
  }
  @return null;
}

@function get-primary-active-color ($theme) {
  @if $theme == 'light' {
    @return rgb(0, 0, 255);
  }
  @return null;
}

// naive-ui will check the existence of getter functions and set the related
// variables properly
@import '~naive-ui/src/_styles/index.scss';
```

Then you need to import the `.scss` file to your app entry file.

```js
// index.js
// ...
import 'path/to/customized-style.scss'

// ... use naive-ui normally
```

Not done yet. You still need to set the primary color in the js environment. Since naive-ui use CSS-in-JS...

So let's continue, override the light theme on naive-ui instance.

```js
// ...

import naive from 'naive-ui'

naive.styles.light.override({
  derived: {
    primaryColor: 'rgb(255, 0, 0)',
    primaryHoverColor: 'rgb(0, 255, 0)',
    primaryActiveColor: 'rgb(0, 0, 255)'
  }
})

Vue.use(naive)
```

Done.