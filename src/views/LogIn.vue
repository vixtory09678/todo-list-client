<template>
  <q-page>
    <div class="row flex-center">
      <h1>LogIn Page</h1>
    </div>
    <div class="row flex-center">
      <q-btn flat class="q-mr-xs" @click="signup">sign up</q-btn>
    </div>
    
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LogIn',
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
