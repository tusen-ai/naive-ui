<!--no-demo-->
# Develop Guidelines
## Git Commit Message Style
You **MUST** follow [Angular Commit Format](https://gist.github.com/brianclements/841ea7bffdb01346392c).

If you want see some example, see [Angular Commits on Github](https://github.com/angular/angular/commits/master).
## Coding Style
### Javascript Style
You **MUST** follow [Standard JS](https://standardjs.com/).
### SCSS Style
Run `npm run lint-style` to check styles.
### Check Both
Run `npm run lint`
You **MUST** fix all lint warnings and errors before you push your branch.
## Unit test
If you create a component, you **MUST** add unit test for it.

Run `npm run test` to test all components.
Run `npm run test-cov` to test all components and see detailed test coverage report.

## See How Component Works
1. Run `npm run dev`
2. Open `http://localhost:8086/` in browser.

## Add Your Own Component
There is no guideline for now. If you want to know how to do it, you can explore by yourself or ask `lecong.zhang@tusimple.ai`.

## Publish a New Version
1. You **MUST** change your version according to [semver](https://semver.org/)
2. `npm run release`
3. You **MAY** publish documentation by running `npm run release-doc`