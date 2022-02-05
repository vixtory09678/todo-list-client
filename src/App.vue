<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan">
      <q-toolbar>
        <q-toolbar-title>
          <router-link :to="{name:'Home'}" style="text-decoration: none; color: white">
            Todo List Client
          </router-link>
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

<script lang="ts">
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
      console.log('hello', accessToken)
      if (!accessToken) {
        router.replace({name: 'LogIn'})
      }
      
      if (Date.now() > getEXPFromToken(accessToken)) {
        logout();
      }
      
    })

    router.beforeEach((to, from, next) => {
      if (to.name === 'Home') {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          router.replace({name: 'LogIn'})
        }
      }
      next()
    })

    const getEXPFromToken = (accessToken: string) : number => {
      const extractToken = accessToken.split('.')
      const token = JSON.parse(atob(extractToken[1]))
      return token.exp * 1000
    }

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
