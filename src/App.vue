<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan">
      <q-toolbar>
        <q-toolbar-title>
          Todo List Client
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
    
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutDefault',
}
</script>
