<template>
  <q-page>
    <SignUpForm @onSubmit="formSubmit"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import SignUpForm from '@/components/SignUpForm.vue';
import { AuthApi } from '../api';

export default defineComponent({
  name: 'SignUp',
  components: {
    SignUpForm
  },
  setup () {
    const router = useRouter()
    const formSubmit = async (form: {username: string, password: string}) => {
      const res = await AuthApi.signup(form.username, form.password);
      if (res?.signupResponse) {
        router.go(-1);
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
