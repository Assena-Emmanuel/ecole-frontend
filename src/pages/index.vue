<script setup>
import MapCard from '@/views/apps/pointage/MapCard.vue';
import PremiersArrivesCard from '@/views/apps/pointage/PremiersArrivesCard.vue';
</script>
<template>
  <div>
  


    <VRow class="match-height">
      <VCol
        cols="12"
        md="9"
      >
      <!-- Afficher la carte (Map) -->
        <MapCard />
      </VCol>

      <!-- 👉 Top premier arrivé  -->
      <VCol
        cols="12"
        md="3"
        sm="6"
      >
        <PremiersArrivesCard />
      </VCol>

      <!-- 👉 Top premier arrivé  -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        11
      </VCol>

      <!-- Top dernier arrivé -->
      <VCol
        cols="12"
        md="4"
        sm="6"
      >
        10
      </VCol>
      
    </VRow>
   </div>
</template>
