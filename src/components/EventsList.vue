<template>
  <div class="component-body">
    <div class="events">
      <div v-for="(event, id) in events" :key="id" class="event">
        <img :src="`/img/events/${event.IconRef}`" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { $db } from "@/firebaseInit.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default {
  setup() {
    // Initialize the events list
    const events = ref([]);

    // Fetch the events from Firestore
    onMounted(async () => {
      const eventsQuery = query(collection($db, "Events"), orderBy("Date"));
      const querySnapshot = await getDocs(eventsQuery);

      querySnapshot.forEach((doc) => {
        events.value.push({ id: doc.id, ...doc.data() });
      });


      events.value.sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateB > dateA ? 1 : -1;
      });
    });

    return {
      events,
    };
  },
};
</script>
