<template>
  <div class="about">
    <h1>This is an about page</h1>

    <router-link to="/about/info">第一个子路由 </router-link>
    <router-link to="/about/test"> 第二个子路由</router-link>
    <router-view></router-view>
  </div>
</template>
