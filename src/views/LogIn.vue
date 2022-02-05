<template>
  <q-page>
    <LogInForm @onSubmit="formSubmit"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogInForm from '@/components/LogInForm.vue'
import { AuthApi } from '../api'

export default defineComponent({
  name: 'LogIn',
  components: {
    LogInForm
  },
  setup () {
    const formSubmit = async (username: string, password: string) => {
      const res = await AuthApi.login(username, password);
      if (res) {
        localStorage.setItem('accessToken', res.accessToken);
      } else {
        console.log('login fail')
      }
    }

    return {
      formSubmit
    }
  }
});
</script>
