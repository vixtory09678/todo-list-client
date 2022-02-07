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
        <div class="col-7">
          <q-input bottom-slots v-model="todoName" label="Todo Name">
            <template v-slot:before>
              <q-icon name="edit" />
            </template>
            <template v-slot:append>
              <q-icon v-if="todoName !== ''" name="close" @click="todoName = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="col text-grey text-caption">            
          <q-card-actions align="right">
            <q-checkbox align="left" size="xl" v-model="isDone"/>
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

import { defineComponent, onMounted, PropType, reactive, ref, toRefs, watch } from 'vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';
import { UpdateItem } from '../interfaces/todo.interface';

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
    let isDone = ref(false)

    onMounted(() => {
      todoName.value = todoItemList.value?.name || ''
      detail.value = todoItemList.value?.detail || ''
      isDone.value = todoItemList.value?.isDone || false
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

        const data: UpdateItem = {
          id: todoItemList.value?.id || '',
          name: todoName.value,
          detail: detail.value,
          isDone: isDone.value,
          file: picture.hasFile ? picture.files[0] : undefined
        }

        emit('onUpdateTodoItem', data)
      } else {
        alert('Name is empty')
      }
    }

    return {
      isDone,
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