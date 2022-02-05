<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan">
      <q-toolbar>
        <q-toolbar-title>
          Todo List Client
        </q-toolbar-title>

        <div v-if="currentPage === 'SignUp' || currentPage === 'LogIn'"></div>
        <div v-else>
          <q-btn flat class="q-mr-xs" @click="logout"> Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'LayoutDefault',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const currentPage = computed(() => route.name)

    onMounted(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.replace({name: 'LogIn'})
      }
    })

    router.beforeEach((to, from, next) => {
      next()
    })

    const logout = () => {
      localStorage.removeItem('accessToken')
      router.replace({name: 'LogIn'})
    }

    return {
      currentPage,
      logout
    }
  }
}
</script>
