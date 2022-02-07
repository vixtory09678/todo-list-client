<template>
  <div class="q-pa-md">
    <q-card flat class="my-card" @click="onItemSelected">
      <div v-if="todoItem.picturePath">
        <q-img
          :src="urlCover"
          style="height: 150px">
          <div class="absolute-bottom text-h6">
            <div v-if="!isDone">
              <s>{{todoItem.name}}</s>
            </div>
            <div v-else>
              {{todoItem.name}}
            </div>
          </div>
        </q-img>
        <q-card-section>
          <div class="text-subtitle2">{{todoItem.id}}</div>
        </q-card-section>
      </div>

      <div v-else>
        <q-card-section>
          
          <div class="text-h6">
            <div v-if="todoItem.isDone">
              <s>{{name}}</s>
            </div>
            <div v-else>
              {{todoItem.name}}
            </div>
          </div>
          <div class="text-subtitle2">{{todoItem.id}}</div>
        </q-card-section>
      </div>
      

    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';
import { getImageByPath } from '../utils'

export default defineComponent({
  name: 'ToDoItem',
  props: {
    todoItem: Object as PropType<GetToDoList>
  },
  setup (props, { emit }) {

    const urlCover = computed(() => {
      let path = props.todoItem?.picturePath || ''
      return getImageByPath(path)
    })

    const onItemSelected = () => {
      emit('onSelected', props.todoItem?.id)
    }

    return {
      urlCover,
      onItemSelected
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  background-color: rgba(0,0,0,0)
  width: 100%
.my-card:hover
  transition: background-color 0.2s
  cursor: pointer
  background-color: rgba(0,0,0,0.03)
  width: 100%
</style>