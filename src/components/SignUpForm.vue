<template>
  <div class="row flex justify-center">
    <h2 class="">Sign Up</h2>
  </div>
  <div class="row justify-center">
    <div style="width: 400px;">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
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
            val => val.length >= 8 || 'Password is must be at least 8 characters'
          ]"
        />
         <q-input
          filled
          type="password"
          v-model="rePassword"
          label="Re-Password"
          lazy-rules
          :rules="[
            val => val === password || 'Password is not match',
          ]"
        />

        <div>
          <q-btn label="Signup" type="submit" color="secondary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SignUpForm',
  setup () {
    const username = ref('')
    const password = ref('')
    const rePassword = ref('')

    const onSubmit = () => {
      console.log(username.value, password.value)
    }
    const onReset = () => {
      username.value = ''
      password.value = ''
      rePassword.value = ''
    }

    return {
      username,
      password,
      rePassword,
      onSubmit,
      onReset
    }
  }
});
</script>
