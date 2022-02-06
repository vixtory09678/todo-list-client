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
      <q-separator inset />
    </q-card>

    <q-dialog v-model="isShowAddDialog">
      <ToDoItemAdd/>
    </q-dialog>

    <q-dialog v-model="isShowEditDialog">
      <ToDoItemEdit/>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ToDoItemAdd from '@/components/ToDoItemAdd.vue';
import ToDoItemEdit from '@/components/ToDoItemEdit.vue';

export default defineComponent({
  name: 'ToDoList',
  components: {
    ToDoItemAdd,
    ToDoItemEdit
  },
  setup () {
    let isShowAddDialog = ref(false)
    let isShowEditDialog = ref(false)

    const addToDoItem = () => {
      showDialogAdd()
    }

    const showDialogAdd = () => {
      isShowAddDialog.value = true
    }

    return {
      isShowAddDialog,
      isShowEditDialog,
      addToDoItem
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50%
</style>