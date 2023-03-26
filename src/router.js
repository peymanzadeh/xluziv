import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import LoginView from './components/LoginView.vue'
import NightclubList from './components/NightclubList.vue'
import EventsList from './components/EventsList.vue'
import RSVPList from './components/RSVPList.vue'
import NightclubView from './components/NightclubView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/clubs',
    name: 'NightclubList',
    component: NightclubList
  },
  {
    path: '/events',
    name: 'EventsList',
    component: EventsList
  },
  {
    path: '/rsvps',
    name: 'RSVPList',
    component: RSVPList
  },
  {
    path: '/club/:id',
    name: 'NightclubView',
    component: NightclubView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: '/xluziv/', // Add this line to configure the base URL
  routes,
})

export default router
