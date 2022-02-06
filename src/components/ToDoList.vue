<template>
  <div class="row q-mt-xl justify-center">
    <q-card bordered class="my-card">
      <q-card-section >
        <div class="row items-center">
          <div class="col text-h6">
            ToDo List
          </div>
          <div class="col-auto">
            <q-btn color="green" icon="add" @click="addToDoItem"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator inset style="margin-bottom: 10px"/>
      <div v-for="item in todoItemsList" :key="item.id">
      {{item}}
      </div>
    </q-card>

    <q-dialog v-model="isShowAddDialog">
      <ToDoItemAdd @onAddTodoItem="onAddTodoItem"/>
    </q-dialog>

    <q-dialog v-model="isShowEditDialog">
      <ToDoItemEdit/>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';
import ToDoItemAdd from '@/components/ToDoItemAdd.vue';
import ToDoItemEdit from '@/components/ToDoItemEdit.vue';
import { ToDoApi } from '../api'

export default defineComponent({
  name: 'ToDoList',
  components: {
    ToDoItemAdd,
    ToDoItemEdit
  },
  props: {
    todoItemsListProp: Array
  },
  setup (props, { emit }) {
    const todoItemsList = ref(props.todoItemsListProp)
    let isShowAddDialog = ref(false)
    let isShowEditDialog = ref(false)

    const onAddTodoItem = async ({ name, detail }: any) => {
      console.log('on item add', name, detail);
      const resp = await ToDoApi.addToDo(name, detail)
      if (resp.isCompleted) {
        emit('onToDoItemAdded', {})
      }
    }

    const addToDoItem = () => {
      showDialogAdd()
    }

    const showDialogAdd = () => {
      isShowAddDialog.value = true
    }

    return {
      isShowAddDialog,
      isShowEditDialog,
      todoItemsList,
      addToDoItem,
      onAddTodoItem
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50%
</style>