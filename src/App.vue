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
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAccessToken } from '@/utils'
export default {
  name: 'LayoutDefault',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const currentPage = computed(() => route.name)
    let accessToken = ref('')

    onMounted(() => {
      accessToken.value = getAccessToken()
      if (!accessToken.value) {
        router.replace({name: 'LogIn'})
      }
      
      if (Date.now() > getEXPFromToken(accessToken.value)) {
        logout();
      }
      
    })

    router.beforeEach((to, from, next) => {
      if (to.name === 'Home') {
        if (!accessToken.value) {
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
