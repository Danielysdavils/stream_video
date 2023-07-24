<template>
    <div id="app">
      <navBar />
      <router-view/>
    </div>
  </template>
  
  <script>
  
    import navBar from '../src/components/navBar/navBar.vue'
  
    export default{
      components: {
        navBar
      }
    }
  
  </script>