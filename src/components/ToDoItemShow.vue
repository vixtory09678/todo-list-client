<template>
  <q-card flat class="my-card">
    <q-card-section>
      <div v-if="todoItem.picturePath">
        <q-img
          :src="getImageByPath(todoItem.picturePath)"
          style="height: 200px; padding">
          <div class="absolute-bottom text-h6">
            <div v-if="todoItem.isDone">
              <s>{{todoItem.name}}</s> completed!
            </div>
            <div v-else>
              {{todoItem.name}}
            </div>
          </div>
        </q-img>

        <q-btn
          @click="genLink"
          flat
          color="white"
          class="absolute"
          style="bottom: 5px; right: 20px; transform: translateY(-50%);"
        >Get Link</q-btn>
        <q-btn
          @click="edit"
          fab
          color="primary"
          icon="edit"
          class="absolute"
          style="top: 0; right: 20px; transform: translateY(50%);"
        />
      </div>
      <div v-else>
        <div class="row no-wrap items-center q-pa-md">
          <div class="col-8">
            <div class="text-h5">
              <div v-if="todoItem.isDone">
                <s>{{todoItem.name}}</s> completed!
              </div>
              <div v-else>
                {{todoItem.name}}
              </div>
            </div>
          </div>

          <div class="col text-grey text-caption q-ml-md">
            <q-card-actions align="right">
              <q-btn
                @click="edit"
                fab
                color="primary"
                icon="edit"
                class="absolute"
              />
            </q-card-actions>
          </div>

        </div>
      <q-btn
        @click="genLink"
        flat
        color="primary"
        class="absolute"
        style="bottom: 0px; transform: translateY(5%);"
      >Get Link</q-btn>
      </div>
    </q-card-section>

    <div v-if="todoItem.detail">
      <q-separator inset style="margin-bottom: 10px"/>
      <q-card-section>
        <div class="text-subtitle2">{{todoItem.detail}}</div>
      </q-card-section>
    </div>
    

  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { GetToDoList } from '../api/interfaces/todo-res.interface';
import { getImageByPath } from '../utils'

export default defineComponent({
  name: 'ToDoItemShow',
  props:{
    item: Object as PropType<GetToDoList>
  },
  setup (props, { emit }) {
    const todoItem = ref(props.item);

    const edit = () => {
      emit('onItemNeedToEdit', todoItem.value)
    }

    const genLink = () => {
      emit('onPublicToDoGenerateURL', todoItem.value?.id)
    }

    return { 
      todoItem,
      getImageByPath,
      edit,
      genLink
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 600px
</style>