<template>
  <q-card style="width: 700px">
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
            <q-btn color="red" icon="delete" @click="deleteItem"></q-btn>
            <q-btn color="positive" icon="save" @click="save">save</q-btn>
          </q-card-actions>
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

import { computed, defineComponent, onMounted, PropType, reactive, ref, toRefs, watch } from 'vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';

export default defineComponent({
  name: 'ToDoItemEdit',
  props: {
    todoItemList: Object as PropType<GetToDoList>
  },
  setup ( props, { emit } ) {
    let picture: {hasFile: boolean, files: Array<File>} = reactive({hasFile: false, files: []})
    const { todoItemList } = toRefs(props)
    let todoName = ref('')
    let detail = ref('')

    onMounted(() => {
      todoName.value = todoItemList.value?.name || ''
      detail.value = todoItemList.value?.detail || ''
    }),

    watch(todoItemList, (val) => {
      todoName.value = val?.name || ''
      detail.value = val?.detail || ''
    })

    const onFileAdded  = (inPutFiles: File[]) => {
      picture.hasFile = true
      picture.files = [...inPutFiles]
    }

    const onFileRemoved = (inPutFiles: File[]) => {
      picture.hasFile = true
      picture.files = []
    }

    const deleteItem = () => {
      emit('onDeleteTodoItem', todoItemList.value?.id)
    }

    const save = () => {
      if (todoName.value) {
        emit('onUpdateTodoItem', {
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
      save,
      deleteItem,
      onFileAdded,
      onFileRemoved
    }
  }
});
</script>