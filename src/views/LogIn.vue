<template>
  <q-page>
    <LogInForm/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LogInForm from '@/components/LogInForm.vue'

export default defineComponent({
  name: 'LogIn',
  components: {
    LogInForm
  },
  setup () {
    const router = useRouter();
    const signup = () => {
      router.push({name: 'SignUp'})
    }
    return {
      signup
    }
  }
});
</script>
