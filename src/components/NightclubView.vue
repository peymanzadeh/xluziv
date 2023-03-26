<template>
    <div class="component-body">
      <!--Display nightclub infromation-->
      <div class="nightclub-listing">
        <div class="banner-container">
          <img :src="`../img/nightclubs/${nightclub.BannerRef}`" class="nightclub-listing-banner" />
          <img v-if="nightclub.IconRef" :src="`../img/nightclubs/${nightclub.IconRef}`" class="nightclub-listing-icon" />
          
        </div>
        
      </div>

      
      <div class="nightclub-name">
        <span>{{ nightclub.Name }}</span>
      </div>

      <div class="nightclub-tagline">
        <span>{{ nightclub.Tagline }}</span>
      </div>

      <div class="nightclub-city">
            <img src="../assets/icons8-city-50.png" /> <span>{{ nightclub.City }}</span>
          </div>

      
      <div class="nightclub-address">
        <img src="../assets/icons8-place-marker-48.png" /> <span>{{ nightclub.Address }}</span>
      </div>
      
      
      <!--Display events for nightclub-->
      <div class="events nightclub-events">
        <div v-for="(event, id) in events" :key="id" class="event">
        <img :src="`../img/events/${event.IconRef}`" />
      </div>
      </div> 

      <!--Display in a span some text if there are no events displayed above-->
      <div v-if="events.length == 0" class="nightclub-no-events">
        <span>No events found for this nightclub</span>
      </div>
      
      <div class="nightclub-listing-social">
          <img src="../assets/icons8-website-50.png" />
          <img src="../assets/icons8-instagram-50.png" />
          <img src="../assets/icons8-facebook-50.png" />
        </div>
    </div>
  </template>
  
    
  <script>

  // get single nightclub object via the id from url id parmater and display information in the nightclub UI
  // get events for nightclub and display in the nightclub UI

  import { ref, onMounted } from "vue";
  import { $db } from "@/firebaseInit.js";
  import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
  import { useRoute } from "vue-router";

  export default {
    setup() {
      // Initialize the nightclub list
      const nightclub = ref({});
      const events = ref([]);
      const route = useRoute();

      // Fetch the specific nightclub from Firestore and set the value for the UI
      onMounted(async () => {
      
        const nightclubQuery = collection($db, "Nightclubs");
        const nightclubDoc = await doc(nightclubQuery, route.params.id);
        const nightclubSnapshot = await getDoc(nightclubDoc);

        nightclub.value = { id: nightclubDoc.id, ...nightclubSnapshot.data() };

        console.log(route.params.id);

        const eventsQuery = query(collection($db, "Events"), where("NightclubID", "==", route.params.id));
        const eventsSnapshot = await getDocs(eventsQuery);

        eventsSnapshot.forEach((doc) => {
          // Add the id to the nightclub object
          events.value.push({ id: doc.id, ...doc.data() });
        });

        events.value.sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateB > dateA ? 1 : -1;
      });



      });

      return {
        nightclub,
        events,
      };
    },
  };

    
  
  </script>