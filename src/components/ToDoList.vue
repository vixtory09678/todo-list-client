<template>
  <div class="row q-mt-xl justify-center">
    <q-card bordered class="my-card">

      <q-card-section >
        <div class="row items-center">
          <div class="col text-h6">
            ToDo List
          </div>
          <div class="col-auto">
            <q-btn color="green" icon="add" @click="clickAddItem"/>
          </div>
        </div>
      </q-card-section>

      <q-separator inset style="margin-bottom: 10px"/>
      <ToDoItem
        v-for="item in getTodoItems"
        :key="item.id"
        @onSelected="itemSelected"
        :todoId="item.id"
        :todoName="item.name"
        :todoPicturePath="item.picturePath"/>

    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, watch } from 'vue';
import ToDoItem from '@/components/ToDoItem.vue'
import { GetToDoList } from '../api/interfaces/todo-res.interface'

export default defineComponent({
  name: 'ToDoList',
  components: {
    ToDoItem
  },
  props: {
    todoItemsListProp: Object as PropType<Array<GetToDoList>>
  },
  setup (props, { emit }) {
    var { todoItemsListProp } = toRefs(props)
    
    const getTodoItems = computed(() => todoItemsListProp.value)

    const itemSelected = (id: string) => {
      emit('onItemSelected', id)
    }

    const clickAddItem = () => {
      emit('onClickAddItem')
    }

    return {
      getTodoItems,
      itemSelected,
      clickAddItem
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50%
</style>