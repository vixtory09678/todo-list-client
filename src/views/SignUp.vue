<template>
  <q-page>
    <SignUpForm/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpForm from '@/components/SignUpForm.vue'

export default defineComponent({
  name: 'SignUp',
  components: {
    SignUpForm
  }
});
</script>
