import Upload from './src/Upload.vue'
import UploadDragger from './src/UploadDragger.vue'

Upload.install = function (app, naive) {
  app.component(Upload.name + naive.componentPrefix, Upload)
  app.component(UploadDragger.name + naive.componentPrefix, UploadDragger)
}

export default Upload
