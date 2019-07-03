<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Select / n-select
      </n-gradient-text>
    </div>
    <div
      class="n-doc-body"
    >
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <div style="width: 30%; margin-right: 14px;">
            <n-select
              v-model="selectedValue"
              placeholder="Please Select Type"
              :items="items"
            />
          </div>
          <div style="width: 30%; margin-right: 14px;">
            <n-select
              v-model="selectedValue"
              size="small"
              placeholder="Please Select Type"
              :items="items"
            />
          </div>
          <div>selectedValue: {{ selectedValue }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea>
<div style="width: 40%; margin-right: 14px;">
  <n-select
    v-model="selectedValue"
    placeholder="Please Select Type"
    :items="items"
  />
</div>
<div style="width: 40%; margin-right: 14px;">
  <n-select
    v-model="selectedValue"
    size="small"
    placeholder="Please Select Type"
    :items="items"
  />
</div>
<script>
export default {
  data () {
    return {
      selectedValue: null,
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
      ]
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Multiple Select
        </div>
        <div class="n-doc-section__view">
          <n-select
            v-model="selectedArray"
            multiple
            placeholder="Please Select Type"
            :items="items"
          />
          <br><br>
          <n-select
            v-model="selectedArray"
            multiple
            size="small"
            placeholder="Please Select Type"
            :items="items"
          />
          <br><br>
          <div>selectedArray: {{ selectedArray }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-select
  v-model="selectedArray"
  multiple
  placeholder="Please Select Type"
  :items="items"
/>
<n-select
  v-model="selectedArray"
  multiple
  size="small"
  placeholder="Please Select Type"
  :items="items"
/>
<div>selectedArray: {{ selectedArray }}</div>
<script>
export default {
  data () {
    return {
      selectedArray: [],
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
      ]
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Verbose Transition of Multiple Select
        </div>
        <div class="n-doc-section__view">
          <n-select
            v-model="selectedArray"
            multiple
            placeholder="Please Select Type"
            :items="items"
            verbose-transition
          />
          <br><br>
          <n-select
            v-model="selectedArray"
            multiple
            size="small"
            placeholder="Please Select Type"
            :items="items"
            verbose-transition
          />
          <div>selectedArray: {{ selectedArray }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<n-select
  v-model="selectedArray"
  multiple
  placeholder="Please Select Type"
  :items="items"
  verbose-transition
/>
<n-select
  v-model="selectedArray"
  multiple
  size="small"
  placeholder="Please Select Type"
  :items="items"
  verbose-transition
/>
<div>selectedArray: {{ selectedArray }}</div>
<script>
export default {
  data () {
    return {
      selectedArray: [],
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
      ]
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Change Event
        </div>
        <div class="n-doc-section__view">
          <div style="flex-grow: 1;">
            selectedValue: {{ selectedValue }}
          </div>
          <div style="flex-grow: 1;">
            selectedArray: {{ selectedArray }}
          </div>
          <n-select
            v-model="selectedValue"
            placeholder="Please Select Type"
            :items="items"
            @change="handleChange"
          />
          <br><br>
          <n-select
            v-model="selectedArray"
            multiple
            size="small"
            placeholder="Please Select Type"
            :items="items"
            verbose-transition
            @change="handleChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<div>
  selectedValue: {{ selectedValue }}
</div>
<div>
  selectedArray: {{ selectedArray }}
</div>
<n-select
  v-model="selectedValue"
  placeholder="Please Select Type"
  :items="items"
  @change="handleChange"
/>
<br><br>
<n-select
  v-model="selectedArray"
  multiple
  size="small"
  placeholder="Please Select Type"
  :items="items"
  verbose-transition
  @change="handleChange"
/>
<script>
export default {
  data () {
    return {
      selectedValue: null,
      selectedArray: [],
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
      ]
    }
  },
  methods: {
    handleChange (newValue) {
      alert(String(newValue))
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Change Event(Emit Item)
        </div>
        <div class="n-doc-section__view">
          <div style="flex-grow: 1;">
            selectedValue: {{ selectedValue }}
          </div>
          <div style="flex-grow: 1;">
            selectedArray: {{ selectedArray }}
          </div>
          <n-select
            v-model="selectedValue"
            placeholder="Please Select Type"
            :items="items"
            emit-item
            @change="handleChange2"
          />
          <br><br>
          <n-select
            v-model="selectedArray"
            multiple
            size="small"
            placeholder="Please Select Type"
            :items="items"
            emit-item
            verbose-transition
            @change="handleChange2"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
<div>
  selectedValue: {{ selectedValue }}
</div>
<div>
  selectedArray: {{ selectedArray }}
</div>
<n-select
  v-model="selectedValue"
  placeholder="Please Select Type"
  :items="items"
  emit-item
  @change="handleChange2"
/>
<br><br>
<n-select
  v-model="selectedArray"
  multiple
  size="small"
  placeholder="Please Select Type"
  :items="items"
  verbose-transition
  emit-item
  @change="handleChange2"
/>
<script>
export default {
  data () {
    return {
      selectedValue: null,
      selectedArray: [],
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
      ]
    }
  },
  methods: {
     handleChange2 (newValue) {
      alert(JSON.stringify(newValue))
    }
  }
}
</script></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Search(Only for single select)
        </div>
        <div class="n-doc-section__view">
          <div style="width: 30%; margin-right: 14px;">
            <n-select
              v-model="selectedValue"
              placeholder="Please Select Type"
              filterable
              :items="items2"
            />
          </div>
          <div>selectedValue: {{ selectedValue }}</div>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-select
  v-model="selectedValue"
  placeholder="Please Select Type"
  filterable
  :items="[
    {
      label: 'Drive My Car',
      value: 'song1'
    },
    {
      label: 'Norwegian Wood',
      value: 'song2'
    },
    {
      label: 'You Won\'t See',
      value: 'song3'
    },
    {
      label: 'Nowhere Man',
      value: 'song4'
    },
    {
      label: 'hink For Yourseld',
      value: 'song5'
    },
    {
      label: 'The Word',
      value: 'song6'
    },
    {
      label: 'Michelle',
      value: 'song7'
    },
    {
      label: 'What goes on',
      value: 'song8'
    },
    {
      label: 'Girl',
      value: 'song9'
    },
    {
      label: 'I\'m looking through you',
      value: 'song10'
    },
    {
      label: 'In My Life',
      value: 'song11'
    },
    {
      label: 'Wait',
      value: 'song12'
    }
  ]"
/></textarea>
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
      selectedValue: null,
      selectedArray: [],
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
      items2: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'hink For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: 'I\'m looking through you',
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  },
  methods: {
    handleChange (newValue) {
      alert(String(newValue))
    },
    handleChange2 (newValue) {
      alert(JSON.stringify(newValue))
    }
  }
}
</script>
