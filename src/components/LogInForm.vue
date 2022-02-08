<template>
  <div class="row flex justify-center">
    <h2 class="">Log In</h2>
  </div>
  <div class="row justify-center">
    <div style="width: 400px;">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="username"
          hint="username is require only [a-zA-Z0-9] and -(dash) .(dot)"
          label="Username"
          lazy-rules
          :rules="[ 
            val => !/^[0-9]+$/.exec(val) || 'Username must start with alphabet',
            val => /^[a-zA-Z][a-zA-Z0-9_\.-]+$/.exec(val) || 'Username is wrong'  
          ]"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val.length > 8 || 'Password is must be at least 8 characters'
          ]"
        />

        <div>
          <q-btn label="login" type="submit" color="secondary"/>
          <q-btn label="Create Account" color="primary" flat class="q-ml-sm" @click="goToSignUp" />
        </div>
        
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LogInForm',
  setup (props, { emit }) {
    const router = useRouter();

    const username = ref('')
    const password = ref('')

    const onSubmit = () => {
      emit('onSubmit', { 
        username: username.value, 
        password: password.value
      })
    }

    const goToSignUp = () => {
      router.push({name: 'SignUp'})
    }

    const onReset = () => {
      username.value = ''
      password.value = ''
    }

    return {
      username,
      password,
      onSubmit,
      onReset,
      goToSignUp
    }
  }
});
</script>
