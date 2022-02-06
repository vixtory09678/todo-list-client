<template>
  <q-page>
    <ToDoList />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToDoList from '@/components/ToDoList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ToDoList
  }
});
</script>
