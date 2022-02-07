<template>
  <div class="q-pa-md">
    <q-card flat class="my-card" @click="onItemSelected">
    
      <div v-if="picturePath">
        
        <q-img
          :src="urlCover"
          style="height: 150px">
          <div class="absolute-bottom text-h6">
            {{name}}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-subtitle2">{{id}}</div>
        </q-card-section>
      </div>

      <div v-else>
        <q-card-section>
          <div class="text-h6">{{name}}</div>
          <div class="text-subtitle2">{{id}}</div>
        </q-card-section>
      </div>
      

    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { getImageByPath } from '../utils'

export default defineComponent({
  name: 'ToDoItem',
  props: {
    todoId: String,
    todoName: String,
    todoPicturePath: String
  },
  setup (props, { emit }) {
    const id = ref(props.todoId)
    const name = ref(props.todoName)
    const picturePath = ref(props.todoPicturePath)

    const urlCover = computed(() => {
      let path = picturePath?.value || ''
      return getImageByPath(path)
    })



    const onItemSelected = () => {
      emit('onSelected', id.value)
    }

    return {
      id,
      name,
      picturePath,
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