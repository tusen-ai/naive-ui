// import esbuild from 'esbuild'

const tsToJs = (content) => {
  if (!content) {
    return ''
  }
  // const { code } = esbuild.transformSync(content, {
  //   loader: 'js'
  // })
  return content
}

export default tsToJs
