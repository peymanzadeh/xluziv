<template>
    <div class="login-view">
      <h2>Login/Register</h2>
      <p v-if="!user">Sign in with Facebook</p>
      <button v-if="!user" @click="loginWithFacebook">Login with Facebook</button>
      <div v-if="user">
        <p>Welcome, {{ user.displayName }}!</p>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted, onUnmounted } from "vue";
import {
  $auth,
  $db,
  signInWithRedirect,
  FacebookAuthProvider,
} from "../firebaseInit.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user = ref(null);
    const store = useStore();
    const router = useRouter();

    const unsubscribeAuth = $auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc($db, "Users", firebaseUser.uid));
        if (userDoc.exists()) {
          user.value = userDoc.data();
        } else {
          user.value = firebaseUser;
        }
        store.dispatch("user/setCurrentUser", user.value);
      } else {
        user.value = null;
        store.dispatch("user/setCurrentUser", null);
      }
    });

    onMounted(() => {
      unsubscribeAuth();
    });

    onUnmounted(() => {
      unsubscribeAuth();
    });

    return { user, router };
  },
  methods: {
    async isUserInDatabase(uid) {
      const userDoc = await getDoc(doc($db, "Users", uid));
      return userDoc.exists();
    },

    async loginWithFacebook() {
    const fbProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithRedirect($auth, fbProvider);
      const user = result.user;

    // Check if this is a new user
    if (!(await this.isUserInDatabase(user.uid))) {
      // Get the profile picture URL using the user's Facebook ID and access token
      const fbId = user.providerData[0].uid;
      const accessToken = result.credential.accessToken;
      const response = await fetch(`https://graph.facebook.com/${fbId}/picture?type=large&redirect=false&access_token=${accessToken}`);
      const data = await response.json();
      const photoURL = data.data.url;

      // Store the user's basic information in the Firestore database
      await setDoc(doc($db, "Users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: photoURL,
        createdAt: new Date(),
      });
    }

    // Dispatch an action to set the current user in Vuex store
    this.$store.dispatch("user/setCurrentUser", user);

    // Navigate to a specific route, e.g., home page, after login
    this.$router.push({ name: "HomeView" });
  } catch (error) {
    console.error("Error logging in with Facebook:", error);
  }
},


    async logout() {
      try {
        await $auth.signOut();
      } catch (error) {
        console.error("Error logging out:", error);
      }

      // Check if the user is still authenticated after logging out
      if ($auth.currentUser) {
        console.log("User is still logged in");
      } else {
        // reload the page to reset the UI on with the logged out user
        location.reload();
      }
      
      
    },
  },
};
</script>



  
  <style scoped>
  .login-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1b1b1b;
    color: #fff;
    padding: 30px;
    border-radius: 5px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  button {
    background-color: #3b5998;
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    border: none;
  }
  
  button:hover {
    background-color: #2d4373;
  }
  </style>
  