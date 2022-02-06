<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="row no-wrap items-center">

        <div class="col-8">
          <q-input bottom-slots v-model="todoName" label="Todo Name">
            <template v-slot:before>
              <q-icon name="edit" />
            </template>
            <template v-slot:append>
              <q-icon v-if="todoName !== ''" name="close" @click="todoName = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <div class="col text-grey text-caption q-ml-md">
          <q-card-actions>
            <q-btn flat color="red" icon="image">upload</q-btn>
            <q-btn flat color="positive" icon="save" @click="save">save</q-btn>
          </q-card-actions>
          <div v-if="hasFile==true" style="margin-left: 15px">
            asdfasdf
          </div>
        </div>
      </div>

    </q-card-section>

    <div class="row q-pa-md items-center">
      <div class="col">
        <q-input
          v-model="detail"
          filled
          type="textarea"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ToDoItemAdd',
  setup (props, { emit }) {
    const hasFile = ref('false')
    const todoName = ref('')
    const detail = ref('')

    const save = () => {
      if (todoName.value) {
        emit('onAddTodoItem', {
          name: todoName.value,
          detail: detail.value
        })
      } else {
        alert('Name is empty')
      }
    }

    return {
      todoName,
      detail,
      hasFile,
      save
    }
  }
});
</script>