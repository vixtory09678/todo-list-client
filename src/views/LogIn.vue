<template>
  <q-page>
    <LogInForm @onSubmit="formSubmit"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LogInForm from '@/components/LogInForm.vue'
import { AuthApi } from '../api'

export default defineComponent({
  name: 'LogIn',
  components: {
    LogInForm
  },
  setup () {
    const router = useRouter()
    const formSubmit = async (form: {username: string, password: string}) => {
      const res = await AuthApi.login(form.username, form.password);
      if (res.loginResponse) {
        localStorage.setItem('accessToken', res.loginResponse.accessToken);
        router.push({name:'Home'})
      } else {
        alert(res.err)
      }
    }

    return {
      formSubmit
    }
  }
});
</script>
