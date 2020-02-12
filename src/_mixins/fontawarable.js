export default {
  mounted () {
    const fontsReady = document.fonts.ready
    fontsReady.then(() => {
      this.handleFontReady()
    })
  }
}
