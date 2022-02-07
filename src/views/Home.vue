<template>
  <q-page>
    <ToDoList 
      v-if="getItemList.length > 0"
      :todoItemsListProp="getItemList"
      @onItemSelected="onItemSelected"
      @onClickAddItem="isShowAddDialog = true"/>

    <q-dialog v-model="isShowAddDialog">
      <ToDoItemAdd @onAddTodoItem="onAddTodoItem"/>
    </q-dialog>

    <q-dialog v-model="isShowEditDialog">
      <ToDoItemEdit/>
    </q-dialog>

    <q-dialog v-model="isItemShow" >
      <ToDoItemShow
        @onItemNeedToEdit="onItemEdit"
        :item="getToDoItem"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import ToDoList from '@/components/ToDoList.vue';
import ToDoItemAdd from '@/components/ToDoItemAdd.vue';
import ToDoItemEdit from '@/components/ToDoItemEdit.vue';
import ToDoItemShow from '@/components/ToDoItemShow.vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';
import { ToDoApi } from '../api';

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
      const res = await ToDoApi.getTodoList();
      if (res.getToDoList.length) {
        todoItemsList.value = res.getToDoList
      }
    }

    const onItemEdit = (item: GetToDoList) => {
      console.log('item to edit',item.id);
    }

    const onItemSelected = (id: string) => {
      todoItem.value = findItemById(id)
      isItemShow.value = true
    }

    const onAddTodoItem = async ({ name, detail }: any) => {
      console.log('on item add', name, detail);
      const resp = await ToDoApi.addToDo(name, detail)
      if (resp.isCompleted) {
        getAllItems()
        isShowAddDialog.value = false
      } else {
        console.log('fail')
      }
    }

    return {
      isShowAddDialog,
      isShowEditDialog,
      isItemShow,
      getItemList,
      getToDoItem,

      onItemSelected,
      onItemEdit,
      onAddTodoItem
    }
  }
});
</script>
