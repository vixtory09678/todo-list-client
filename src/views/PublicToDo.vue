<template>
  <q-page>
    <div class="row q-mt-xl justify-center">
      <q-card flat class="my-card" v-if="todoItem">
        <q-card-section>
          <div v-if="todoItem.picturePath">
            <q-img
              :src="getImageByPath(todoItem.picturePath)"
              style="height: 500px; padding">
              <div class="absolute-bottom text-h3">
                <div v-if="todoItem.isDone">
                  <s>{{todoItem.name}}</s> completed!
                </div>
                <div v-else>
                  {{todoItem.name}}
                </div>
              </div>
            </q-img>

          </div>
          <div v-else>
            <div class="row no-wrap items-center q-pa-md">
              <div class="col-8">
                <div class="text-h3">
                  <div v-if="todoItem.isDone">
                    <s>{{todoItem.name}}</s> completed!
                  </div>
                  <div v-else>
                    {{todoItem.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator inset style="margin-bottom: 10px"/>
        <q-card-section>
          <div class="text-subtitle2">{{todoItem.detail}}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter} from 'vue-router'
import { ToDoApi } from '../api';
import { ToDoPublicResponse } from '../api/interfaces/todo-res.interface';
import { getImageByPath } from '../utils'

export default defineComponent({
  name: 'PublicToDO',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const pubKey = ref<string>(route.params.publicKey as string)
    let todoItem = ref<ToDoPublicResponse>()

    onMounted(async () => {
      const resp = await ToDoApi.getPublicTodo(pubKey.value)
      if (resp.getTodoPublic) {
        todoItem.value = resp.getTodoPublic
      } else {
        router.replace({name: 'PageNotFound'})
      }
    })

    return {
      todoItem,
      getImageByPath
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50%
</style>