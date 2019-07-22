<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Form / n-form
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Inline Form 
        </div>
        <div class="n-doc-section__view">
          <n-form inline :label-width="200">
            <n-form-item label="name">
              <n-input placeholder="Input your name"/>
            </n-form-item>
            <n-form-item label="age">
              <n-input placeholder="Input your age"/>
            </n-form-item>
            <n-form-item label="phone">
              <n-input placeholder="Input your phone number"/>
            </n-form-item>
          </n-form>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Form Item
        </div>
        <div class="n-doc-section__view">
          <n-form>
            <n-form-item label="Input">
              <n-input placeholder="Enter sth"/>
            </n-form-item>
            <n-form-item label="Select">
              <n-select
                size="small"
                placeholder="Please Select Type"
                :items="items"
              />
            </n-form-item>
            <n-form-item label="Switch">
             <n-switch v-model="isActive" />
            </n-form-item>
            <n-form-item label="DatePicker">
              <n-date-picker
                v-model="dateTimeTimestamp"
                type="datetime"
              />
            </n-form-item>
            <n-form-item label="Switch">
              <n-radio
                v-model="radio"
                value="Definitely Maybe"
              >
                Definitely Maybe
              </n-radio>
              <n-radio
                v-model="radio"
                value="Be Here Now"
              >
                Be Here Now
              </n-radio>
              <n-radio
                v-model="radio"
                value="Be Here Now"
                disabled
              >
                Be Here Now
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-button>Submit</n-button>
              <n-button>Cancel</n-button>
            </n-form-item>
          </n-form>
          <div class="n-doc-section__source">
            <textarea v-pre>
            </textarea>
          </div>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Demo Form 
        </div>
        <div class="n-doc-section__view">
          <n-form :model="form" ref="form3" :rules="ruleValidate" label-position="top">
            <n-form-item prop="name" label="abc">
              <n-input v-model="form.name" placeholder="lalal"/>
            </n-form-item>
            <n-form-item prop="desc" label-position="right" label="hahahaha">
              <n-input v-model="form.desc"/>
            </n-form-item>
            <n-form-item label-position="right" label="hahahaha">
              <n-button @click="formValidate">Ceshi</n-button>
              <n-button @click="resetForm">resetForm</n-button>
            </n-form-item>
          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      isActive: false,
      dateTimeTimestamp: 666666666,
      radio: '',
      form: {
        name: 'abc',
        mail: '',
        desc: '',
        select: ''
      },
      items: [
        {
          label: 'ArtifactoryLabel',
          value: 'Artifactory'
        },
        {
          label: 'Registry',
          value: 'Registry'
        },
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Custom',
          value: 'Custom'
        }
      ],
      ruleValidate: {
          name: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          mail: [
              { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
              { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          city: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          gender: [
              { required: true, message: 'Please select gender', trigger: 'change' }
          ],
          interest: [
              { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
              { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
          ],
          date: [
              { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
          ],
          time: [
              { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
          ],
          desc: [
              { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
              { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    formValidate () {
      this.$refs['form3'].validate(flag => {
        console.log('validate all result', flag)
      })
    },
    resetForm () {
      this.$refs['form3'].resetForm()
    }
  }
}
</script>