<template>
  <div class="component-body">
    <div class="nightclubs">
      <div v-for="(nightclub, id) in nightclubs" :key="id" class="nightclub">
        <router-link :to="'/club/' + nightclub.id">
          <img :src="`../img/nightclubs/${nightclub.IconRef}`" alt="Nightclub Icon" />
          <label>{{ nightclub.Name }}</label>
        </router-link>
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
    // Initialize the nightclub list
    const nightclubs = ref([]);

    // Fetch the nightclubs from Firestore
    onMounted(async () => {
      const nightclubsQuery = query(collection($db, "Nightclubs"), orderBy("Name"));
      const querySnapshot = await getDocs(nightclubsQuery);

      querySnapshot.forEach((doc) => {
        // Add the id to the nightclub object
        nightclubs.value.push({ id: doc.id, ...doc.data() });
      });
    });

    
    return {
      nightclubs,
    };
  },
};
</script>
