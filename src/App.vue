<template>
  <div id="app" class="container">

    <div class="top">
      <div class="profile">
        <!--<img v-if="currentUser" :src="`${currentUser.photoURL}?type=large`" alt="PFP" />-->
        <img src="./assets/profile.jpg" alt="PFP" />

        <!--<span class="username" v-if="currentUser">{{ currentUser.displayName }}</span>-->
        <span class="username">Gampa AJ</span>
      </div>
      <div class="top-menu">
        <i class="top-menu-icons"><img src="./assets/icons8-notification-48.png" alt="Notifications" /></i>
        <i class="top-menu-icons"><router-link to="/"><img src="./assets/icons8-home-48.png" alt="Home" /></router-link></i>
        <i class="top-menu-icons" @click="showMenu"><img src="./assets/icons8-menu-48.png" alt="Menu" /></i>
      </div>
    </div>
    <div class="middle">
      
      <ul class="body-menu">
        <li :class="{ 'body-menu-active': $route.path === '/clubs' }">
          <router-link to="/clubs">
            <img src="./assets/icons8-disco-ball-48.png" alt="Nightclubs" class="body-menu-icon">
            <span class="body-menu-text">NIGHTCLUBS</span>
          </router-link>
        </li>
        <li :class="{ 'body-menu-active': $route.path === '/events' }">
          <router-link to="/events">
            <img src="./assets/icons8-calendar-48.png" alt="Events" class="body-menu-icon">
            <span class="body-menu-text">EVENTS</span></router-link>
          </li>
        <li :class="{ 'body-menu-active': $route.path === '/rsvps' }">
          <router-link to="/rsvps">
            <img src="./assets/icons8-today-48.png" alt="My RSVPs" class="body-menu-icon">
            <span class="body-menu-text">RSVPS</span>
          </router-link>
        </li>
      </ul>

      <router-view />

    </div>
    <div class="bottom">
      <!-- Placeholder for future content -->
    </div>
  </div>
</template>

<script>

</script>


<style>

</style>
