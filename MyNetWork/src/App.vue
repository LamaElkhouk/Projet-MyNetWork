<script setup>
import Menu from './components/Menu.vue'
import {RouterView} from "vue-router"
</script>

<template>
  <div class="d-flex" id="wrapper">
    <Menu/>
    <div id="page-content-wrapper">
      <!-- Page content-->
      <div class="container-fluid">
        <h1 class="mt-4">MyNetWork</h1>
          <RouterView/>
      </div>
    </div>
    
  </div>

</template>

