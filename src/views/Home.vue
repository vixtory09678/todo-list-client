<template>
  <q-page>
    <ToDoList 
      :todoItemsListProp="getItemList"
      @onItemSelected="onItemSelected"
      @onClickAddItem="isShowAddDialog = true"/>

    <q-dialog v-model="isShowAddDialog">
      <ToDoItemAdd @onAddTodoItem="onAddTodoItem"/>
    </q-dialog>

    <q-dialog v-model="isShowEditDialog">
      <ToDoItemEdit
        :todoItemList="getToDoItem"
        @onUpdateTodoItem="onUpdateTodoItem"
        @onDeleteTodoItem="onItemDelete"/>
    </q-dialog>

    <q-dialog v-model="isItemShow" >
      <ToDoItemShow
        @onItemNeedToEdit="onItemEdit"
        :item="getToDoItem"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import ToDoList from '@/components/ToDoList.vue';
import ToDoItemAdd from '@/components/ToDoItemAdd.vue';
import ToDoItemEdit from '@/components/ToDoItemEdit.vue';
import ToDoItemShow from '@/components/ToDoItemShow.vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';
import { ToDoApi } from '../api';
import { UpdateToDoItem } from '../api/interfaces/todo-req.interface';
import { UpdateItem } from '../interfaces/todo.interface'

export default defineComponent({
  name: 'Home',
  components: {
    ToDoList,
    ToDoItemAdd,
    ToDoItemEdit,
    ToDoItemShow
  },
  setup () {
    let todoItemsList = ref<Array<GetToDoList>>([])
    let todoItem = ref<GetToDoList>()
    const isShowAddDialog = ref(false)
    const isShowEditDialog = ref(false)
    const isItemShow = ref(false)

    onMounted(() => {
      getAllItems()
    })

    const findItemById = (id: string) => {
      return todoItemsList.value.find(item => item.id === id)
    }

    const getItemList = computed(() => {
        return [...todoItemsList.value].reverse()
    })

    const getToDoItem = computed(()=>{
      return {...todoItem.value}
    })

    const getAllItems = async () => {
      const res = await ToDoApi.getTodoList()
      if (res.getToDoList.length) {
        todoItemsList.value = res.getToDoList
      }
    }

    const onItemEdit = (item: GetToDoList) => {
      todoItem.value = item
      console.log('item to edit',todoItem.value)
      isItemShow.value = false
      isShowEditDialog.value = true
    }

    const onItemSelected = (id: string) => {
      todoItem.value = findItemById(id)
      isItemShow.value = true
    }

    const onAddTodoItem = async ({ name, detail, file }: any) => {
      console.log('on item add', name, detail, file);

      let fileName = ''
      if (file) {
        fileName = await ToDoApi.uploadFile(file)
        if (!fileName) {
          alert('Upload fail')
          return
        }
      }
      
      const resp = await ToDoApi.addToDo(name, detail, fileName)
      if (resp.isCompleted) {
        getAllItems()
        isShowAddDialog.value = false
      } else {
        console.log('fail')
      }
    }

    const onUpdateTodoItem = async (data: UpdateItem) => {

      const payload: UpdateToDoItem = {
        id : data.id,
        name : data.name,
        detail : data.detail,
        isDone : data.isDone
      };

      let picturePath = findItemById(data.id)?.picturePath
      if (picturePath) {
        payload.pictureName = picturePath.slice(1)
      }

      if (data.file) {
        const fileName = await ToDoApi.uploadFile(data.file)
        if (!fileName) {
          alert('Upload fail')
          return
        }
        payload.pictureName = fileName
      }

      const resp = await ToDoApi.updateTodo(payload)
      if (resp.isCompleted) {
        await getAllItems()
        isShowEditDialog.value = false
      } else {
        console.log('fail')
      }
    }

    const onItemDelete = async (id: string) => {
      console.log('delete', findItemById(id))
    }

    return {
      isShowAddDialog,
      isShowEditDialog,
      isItemShow,
      getItemList,
      getToDoItem,

      onItemSelected,
      onItemDelete,
      onItemEdit,
      onAddTodoItem,
      onUpdateTodoItem
    }
  }
});
</script>
