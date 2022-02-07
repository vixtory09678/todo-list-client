<template>
  <div class="q-pa-md" @click="onItemSelected">
    <q-card flat class="my-card">

      <div v-if="todoPicturePath">
        <q-img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          style="height: 150px">
          <div class="absolute-bottom text-h6">
            {{todoName}}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-subtitle2">{{todoId}}</div>
        </q-card-section>
      </div>

      <div v-else>
        <q-card-section>
          <div class="text-h6">{{todoName}}</div>
          <div class="text-subtitle2">{{todoId}}</div>
        </q-card-section>
      </div>
      

    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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

    const onItemSelected = () => {
      emit('onSelected', id.value)
    }

    return {
      id,
      name,
      picturePath,
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