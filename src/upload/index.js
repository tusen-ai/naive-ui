import Upload from './src/Upload.vue'
import UploadDragger from './src/UploadDragger.vue'

Upload.install = function (app, naive) {
  app.component(naive.componentPrefix + Upload.name, Upload)
  app.component(naive.componentPrefix + UploadDragger.name, UploadDragger)
}

export default Upload
