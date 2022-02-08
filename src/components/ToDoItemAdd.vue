<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>

      <q-uploader
        flat
        style="width: 100%"
        label="Upload your cover image"
        accept=".jpg, image/*"
        hide-upload-btn
        max-files="1"
        @added="onFileAdded"
        @removed="onFileRemoved"
      />

      <div class="row no-wrap items-center">
        <div class="col-8">
          <q-input bottom-slots v-model="todoName" label="Todo Name">
            <template v-slot:before>
              <q-icon name="edit" />
            </template>
            <template v-slot:append>
              <q-icon v-if="todoName !== ''" name="close" @click="todoName = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="col text-grey text-caption q-ml-md">
          <q-card-actions align="right">
            <q-btn color="positive" icon="save" @click="save">save</q-btn>
          </q-card-actions>
          <div v-if="hasFile==true" style="margin-left: 15px">
            asdfasdf
          </div>
        </div>
      </div>

    </q-card-section>

    <div class="row q-pa-md items-center">
      <div class="col">
        <q-input
          v-model="detail"
          filled
          type="textarea"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ToDoItemAdd',
  setup (props, { emit }) {
    let picture: {hasFile: boolean, files: Array<File>} = reactive({hasFile: false, files: []})
    const hasFile = ref(false)
    const todoName = ref('')
    const detail = ref('')

    const onFileAdded  = (inPutFiles: File[]) => {
      picture.hasFile = true
      picture.files = [...inPutFiles]
    }

    const onFileRemoved = (inPutFiles: File[]) => {
      picture.hasFile = true
      picture.files = []
    }

    const save = () => {

      if (todoName.value) {
        emit('onAddTodoItem', {
          name: todoName.value,
          detail: detail.value,
          file: picture.hasFile ? picture.files[0] : undefined
        })
      } else {
        alert('Name is empty')
      }
    }

    return {
      todoName,
      detail,
      hasFile,
      save,
      onFileAdded,
      onFileRemoved
    }
  }
});
</script>