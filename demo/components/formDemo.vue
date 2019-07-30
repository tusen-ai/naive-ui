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
          <n-form
            inline
            :label-width="80"
          >
            <n-form-item label="name">
              <n-input placeholder="Input your name" />
            </n-form-item>
            <n-form-item label="age">
              <n-input placeholder="Input your age" />
            </n-form-item>
            <n-form-item label="phone">
              <n-input placeholder="Input your phone number" />
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea>
          <n-form inline
          :label-width="80">
            <n-form-item :model="form" label="name">
              <n-input v-model="form.name" placeholder="Input your name" />
            </n-form-item>
            <n-form-item label="age">
              <n-input v-model="form.age" placeholder="Input your age" />
            </n-form-item>
            <n-form-item label="phone">
              <n-input v-model="form.phone" placeholder="Input your phone number" />
            </n-form-item>
          </n-form>
          <script>
          export default {
            data () {
              return {
                form: {
                  name: '',
                  age: '',
                  phone: ''
                }
              }
            }
          }
          </script>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Form Item
        </div>
        <div class="n-doc-section__view">
          <n-form :model="form">
            <n-form-item label="Input">
              <n-input
                v-model="form.input"
                placeholder="Enter sth"
              />
            </n-form-item>
            <n-form-item label="Select">
              <n-select
                v-model="form.select"
                size="small"
                placeholder="Please Select Type"
                :items="items"
              />
            </n-form-item>
            <n-form-item label="Switch">
              <n-switch v-model="form.switch" />
            </n-form-item>
            <n-form-item label="DatePicker">
              <n-date-picker
                v-model="form.dateTimeTimestamp"
                type="datetime"
              />
            </n-form-item>
            <n-form-item label="Switch">
              <n-radio
                v-model="form.radio"
                value="Definitely Maybe"
              >
                Definitely Maybe
              </n-radio>
              <n-radio
                v-model="form.radio"
                value="Be Here Now"
              >
                Be Here Now
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-button>Submit</n-button>
              <n-button>Cancel</n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea>
            <n-form :model="form">
              <n-form-item label="Input">
                <n-input v-model="form.input" placeholder="Enter sth" />
              </n-form-item>
              <n-form-item label="Select">
                <n-select size="small" v-model="form.select"
                  placeholder="Please Select Type" :items="items" />
              </n-form-item>
              <n-form-item label="Switch">
                <n-switch v-model="form.switch" />
              </n-form-item>
              <n-form-item label="DatePicker">
                <n-date-picker v-model="form.dateTimeTimestamp"
                  type="datetime" />
              </n-form-item>
              <n-form-item label="Switch">
                <n-radio v-model="form.radio" value="Definitely Maybe">
                  Definitely Maybe</n-radio>
                <n-radio v-model="form.radio" value="Be Here Now">
                  Be Here Now</n-radio>
              </n-form-item>
              <n-form-item>
                <n-button>Submit</n-button>
                <n-button>Cancel</n-button>
              </n-form-item>
            </n-form>
            <script>
            export default {
              data () {
                return {
                  items: [
                    {
                      label: "ArtifactoryLabel",
                      value: "Artifactory"
                    },
                    {
                      label: "Registry",
                      value: "Registry"
                    },
                    {
                      label: "Public",
                      value: "Public"
                    },
                    {
                      label: "Custom",
                      value: "Custom"
                    }
                  ],
                  form: {
                    input: '',
                    select: '',
                    datepicker: 0,
                    switch: false,
                    radio: ''
                  }
                }
              }
            }
            </script>

            </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Form of Label Position
        </div>
        <div class="n-doc-section__view">
          <n-form
            :label-width="200"
            label-position="top"
          >
            <n-form-item
              required
              label="Top1"
            >
              <n-input />
            </n-form-item>
            <n-form-item
              required
              :label-width="80"
              label="Top2"
            >
              <n-input />
            </n-form-item>
            <n-form-item
              required
              label-position="left"
              label="Left"
            >
              <n-input />
            </n-form-item>
            <n-form-item
              label-position="center"
              required
              label="Center"
            >
              <n-input />
            </n-form-item>
            <n-form-item
              label-position="right"
              required
              label="Right"
            >
              <n-input />
            </n-form-item>
            <n-form-item>
              <n-button>Submit</n-button>
              <n-button>Cancel</n-button>
            </n-form-item>
            <n-form-item
              label="Action"
              label-position="right"
            >
              <n-button>Submit</n-button>
              <n-button>Cancel</n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea>
            <n-form
              :label-width="200"
              label-position="top"
            >
              <n-form-item label="Top1">
                <n-input/>
              </n-form-item>
              <n-form-item label="Top2">
                <n-input/>
              </n-form-item>
              <n-form-item label-position="left" label="Left">
                <n-input/>
              </n-form-item>
              <n-form-item label-position="center" label="Center">
                <n-input/>
              </n-form-item>
              <n-form-item label-position="right" label="Right">
                <n-input/>
              </n-form-item>
              <n-form-item>
                <n-button>Submit</n-button>
                <n-button>Cancel</n-button>
              </n-form-item>
              <n-form-item label="Action" label-position="right">
                <n-button>Submit</n-button>
                <n-button>Cancel</n-button>
              </n-form-item>
            </n-form>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Validate Form
        </div>
        <div class="n-doc-section__view">
          <n-form
            ref="form-validate"
            :model="validateForm"
            :rules="validateRules"
          >
            <n-form-item
              label="Warning"
              label-position="top"
            >
              The key in form-model does not support the form with ' . '.<br>
              And does not init the value of parameters with 'undefined'.<br>
              ResetForm Method: only can reset the item with prop.<br>
              ValidateForm Method: support validate specified items by the second parameter in form of array.<br>
            </n-form-item>
            <n-form-item
              :required-logo="false"
              prop="input"
              label="Input"
            >
              <n-input
                v-model="validateForm.input"
                placeholder="Enter string"
              />
            </n-form-item>
            <n-form-item
              prop="muti.deep.select"
              label="Select"
            >
              <n-select
                v-model="validateForm.muti.deep.select"
                placeholder="Please Select Type"
                :items="items"
              />
            </n-form-item>
            <n-form-item
              label="Switch"
              prop="switch"
            >
              <n-switch v-model="validateForm.switch" />
            </n-form-item>
            <n-form-item
              label="DatePicker"
              prop="datepicker"
            >
              <n-date-picker
                v-model="validateForm.datepicker"
                type="date"
              />
            </n-form-item>
            <n-form-item
              prop="radio"
              label="Radio"
            >
              <n-radio
                v-model="validateForm.radio"
                value="Definitely Maybe"
              >
                Definitely Maybe
              </n-radio>
              <n-radio
                v-model="validateForm.radio"
                value="Be Here Now"
              >
                Be Here Now
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-button @click="formValidate('form-validate')">
                Submit
              </n-button>
              <n-button @click="formReset('form-validate')">
                Reset
              </n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
            <n-form ref="form-validate" disabled :model="validateForm" :rules="validateRules">
              <n-form-item prop="input" label="Input">
                <n-input v-model="validateForm.input" placeholder="Enter string" />
              </n-form-item>
              <n-form-item prop="muti.deep.select" label="Select">
                <n-select
                  size="small"
                  v-model="validateForm.muti.deep.select"
                  placeholder="Please Select Type"
                  :items="items"
                />
              </n-form-item>
              <n-form-item label="Switch" prop="switch">
                <n-switch v-model="validateForm.switch" />
              </n-form-item>
              <n-form-item label="DatePicker" prop="datepicker">
                <n-date-picker v-model="validateForm.datepicker" type="date" />
              </n-form-item>
              <n-form-item
                prop="radio"
                label="Radio">
                <n-radio v-model="validateForm.radio" value="Definitely Maybe">
                  Definitely Maybe
                </n-radio>
                <n-radio v-model="validateForm.radio" value="Be Here Now">
                  Be Here Now
                </n-radio>
              </n-form-item>
              <n-form-item>
                <n-button @click="formValidate('form-validate')">
                  Submit
                </n-button>
                <n-button @click="formReset('form-validate')">
                  Reset
                </n-button>
              </n-form-item>
            </n-form>
            <script>
              export default {
                data () {
                  return {
                    validateForm: {
                      input: "",
                      muti: {
                        deep: {
                          select: ""
                        }
                      },
                      datepicker: "",
                      switch: false,
                      radio: ""
                    },
                    validateRules: {
                      input: [
                        { required: true, message: "input cannot be empty", trigger: "blur" }
                      ],
                      "muti.deep.select": [
                        {
                          required: true,
                          message: "select cannot be empty",
                          trigger: "change"
                        }
                      ],
                      radio: [
                        {
                          required: true,
                          message: "radio please choose some",
                          trigger: "change"
                        }
                      ],
                      datepicker: [
                        {
                          required: true,
                          type: "date",
                          message: "Please select the date",
                          trigger: "change"
                        }
                      ]
                    }
                  }
                },
                methods: {
                  formValidate(ref) {
                    // two ways to use, the first used most
                    // this.$refs[ref].validate((flag, res) => {
                    //   console.log("validate all result", flag, res);
                    // });
                    new Promise((resolve, reject) => {
                      this.$refs[ref].validate((valid, filed) => {
                        if (valid) {
                          resolve(filed);
                        } else {
                          reject(filed);
                        }
                      });
                    })
                      .then(f => {
                        console.log("pass", f);
                      })
                      .catch(e => {
                        console.log("unpass", e);
                      });
                  },
                  formReset (ref) {
                    this.$refs[ref].resetForm();
                  },
                }
              }
            </script>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Form of Custom validate rules
        </div>
        <div class="n-doc-section__view">
          <n-form
            ref="custom"
            :model="custom"
            :rules="customRules"
            :label-width="80"
          >
            <n-form-item
              prop="age"
              label="Age"
            >
              <n-input v-model.number="custom.age" />
            </n-form-item>
            <n-form-item
              prop="pass"
              label="Password"
            >
              <n-input
                v-model="custom.pass"
              />
            </n-form-item>
            <n-form-item
              prop="checkPass"
              label="CheckPass"
            >
              <n-input v-model="custom.checkPass" />
            </n-form-item>
            <n-form-item>
              <n-button @click="formValidate('custom')">
                Commit
              </n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
            <n-form ref="custom" :model="custom" :rules="customRules" :label-width="80">
            <n-form-item prop="age" label="Age">
              <n-input v-model.number="custom.age"></n-input>
            </n-form-item>
            <n-form-item prop="pass" label="Password">
              <n-input v-model="custom.pass"></n-input>
            </n-form-item>
            <n-form-item prop="checkPass" label="CheckPass">
              <n-input v-model="custom.checkPass"></n-input>
            </n-form-item>
            <n-form-item>
              <n-button @click="formValidate('custom')">Commit</n-button>
            </n-form-item>
          </n-form>
          <script>
          export default {
            data() {
              return {
                var checkAge = (rule, value, callback) => {
                  if (!value) {
                    return callback(new Error("Input age"));
                  }
                  setTimeout(() => {
                    if (!Number.isInteger(value)) {
                      callback(new Error("Number required"));
                    } else {
                      if (value < 18) {
                        callback(new Error("Age should over 18"));
                      } else {
                        callback();
                      }
                    }
                  }, 1000);
                };
                var validatePass = (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("Input password"));
                  } else {
                    if (this.custom.checkPass !== "") {
                      this.$refs.custom.validate("", ["checkPass"]);
                    }
                    callback();
                  }
                };
                var validatePass2 = (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("Input password again"));
                  } else if (value !== this.custom.pass) {
                    callback(new Error("ent input password twice!"));
                  } else {
                    callback();
                  }
                };
                custom: {
                  pass: "",
                  checkPass: "",
                  age: ""
                },
                customRules: {
                  pass: [{ validator: validatePass, trigger: "blur" }],
                  checkPass: [{ validator: validatePass2, trigger: "blur" }],
                  age: [{ validator: checkAge, trigger: "blur" }]
                }
              }
            }
          }
          </script>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Form of Dynamic
        </div>
        <div class="n-doc-section__view">
          <n-form
            ref="custom"
            :model="dynamic"
            :rules="dynamicRules"
            :label-width="80"
          >
            <n-form-item
              v-for="(item, k) in dynamic.email"
              :key="k"
              :prop="'email.' + k"
              :label="k"
            >
              <n-input v-model="dynamic['email'][k]" />
            </n-form-item>
            <n-form-item>
              <n-button @click="dynamicAddItem">
                Add
              </n-button>
              <n-button @click="dynamicPopItem">
                Delete
              </n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
            <n-form ref="dynamic" :model="dynamic" :rules="dynamicRules" :label-width="80">
            <n-form-item
              :key="k"
              :prop="'email.' + k"
              :label="k"
              v-for="(item, k) in dynamic.email"
            >
              <n-input v-model="dynamic['email'][k]"></n-input>
            </n-form-item>
            <n-form-item>
              <n-button @click="dynamicAddItem">Add item</n-button>
              <n-button @click="dynamicPopItem">Delete</n-button>
            </n-form-item>
          </n-form>
          <script>
          export default {
            data () {
              return {
                dynamic: {
                  name: "",
                  email: {
                    email0: ""
                  }
                },
                dynamicRules: {
                  "email.email0": [
                    {
                      required: true,
                      message: "Mailbox cannot be empty",
                      trigger: "blur"
                    },
                    { type: "email", message: "Incorrect email format", trigger: "blur" }
                  ]
                }
              }
            },
            methods: {
              dynamicAddItem() {
                let i = Object.keys(this.dynamic.email).length;
                this.$set(this.dynamic.email, "email" + i, "");
                // 依据自己的情况在dynamicRules里去增加验证对象
                this.$set(
                  this.dynamicRules,
                  "email.email" + i,
                  this.dynamicRules["email.email0"]
                );
              },
              dynamicPopItem () {
                let keys = Object.keys(this.dynamic.email)
                let k = keys[keys.length - 1]
                if (k) {
                  delete this.dynamic.email[k]
                }
              }
            }
          }
          </script>
          </textarea>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Input age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Number required'))
        } else {
          if (value < 18) {
            callback(new Error('Age should over 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Input password'))
      } else {
        if (this.custom.checkPass !== '') {
          this.$refs.custom.validate('', ['checkPass'])
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Input password again'))
      } else if (value !== this.custom.pass) {
        callback(new Error('ent input password twice!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        age: '',
        phone: '',
        // second form
        input: '',
        select: '',
        datepicker: '',
        switch: false,
        radio: ''
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
      validateForm: {
        input: 'input',
        muti: {
          deep: {
            select: 'Public'
          }
        },
        datepicker: 0,
        switch: false,
        radio: ''
      },
      validateRules: {
        input: [
          { required: true, message: 'input cannot be empty', trigger: 'blur' }
        ],
        'muti.deep.select': [
          {
            required: true,
            message: 'select cannot be empty',
            trigger: 'change'
          }
        ],
        radio: [
          {
            required: true,
            message: 'radio please choose some',
            trigger: 'change'
          }
        ],
        datepicker: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date',
            trigger: 'change'
          }
        ]
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          {
            required: true,
            message: 'Please select the city',
            trigger: 'change'
          }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: 'Choose at least one hobby',
            trigger: 'change'
          },
          {
            type: 'array',
            max: 2,
            message: 'Choose two hobbies at best',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            type: 'date',
            message: 'Please select the date',
            trigger: 'change'
          }
        ],
        time: [
          {
            required: true,
            type: 'string',
            message: 'Please select time',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      },
      custom: {
        pass: '',
        checkPass: '',
        age: ''
      },
      customRules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      },
      dynamic: {
        name: '',
        email: {
          email0: ''
        }
      },
      dynamicRules: {
        'email.email0': [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    formValidate (ref) {
      // this.$refs[ref].validate((flag, res) => {
      //   console.log('validate all result', flag, res);
      // })
      new Promise((resolve, reject) => {
        this.$refs[ref].validate((valid, filed) => {
          if (valid) {
            resolve(filed)
          } else {
            reject(filed)
          }
        })
      })
        .then(f => {
          console.log('pass', f)
        })
        .catch(e => {
          console.log('unpass', e)
        })
    },

    formReset (ref) {
      this.$refs[ref].resetForm()
    },
    dynamicAddItem () {
      let i = Object.keys(this.dynamic.email).length
      this.$set(this.dynamic.email, 'email' + i, '')
      // 依据自己的情况在dynamicRules里去增加验证对象
      this.$set(
        this.dynamicRules,
        'email.email' + i,
        this.dynamicRules['email.email0']
      )
    },
    dynamicPopItem () {
      let keys = Object.keys(this.dynamic.email)
      let k = keys.pop()
      if (k) {
        this.$delete(this.dynamic.email, k)
      }
    }
  }
}
</script>
