<template>
  <q-page>
    <ToDoList @onToDoItemAdded="getAllItems" :todoItemsListProp="getToDoItemsList"/>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import ToDoList from '@/components/ToDoList.vue'
import { ToDoApi } from '../api'
import { GetToDoList } from '../api/interfaces/todo-res.interface';

export default defineComponent({
  name: 'Home',
  components: {
    ToDoList
  },
  setup () {
    let todoItemsList = ref<Array<GetToDoList>>([])

    onMounted(() => {
      getAllItems()
    })

    const getToDoItemsList = computed(() => todoItemsList)

    const getAllItems = async () => {
      const res = await ToDoApi.getTodoList();
      if (res.getToDoList.length) {
        todoItemsList.value = res.getToDoList
        console.log(todoItemsList.value)
      }
    }

    return {
      getAllItems,
      todoItemsList,
      getToDoItemsList
    }
  }
});
</script>
