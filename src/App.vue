<template>
    <div id="app">
      <LoginView />
    </div>
  </template>
  
  <script>
    import LoginView from "@/views/login/LoginView.vue";
    //import navBar from '@/components/navBar/navBar.vue'

    export default{
      components: {
        LoginView
        //navBar
      }
    }
  
  </script>