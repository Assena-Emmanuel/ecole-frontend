<template>
  <VCard>
      <VCardText>
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column gap-y-1">
            <span class="text-base text-high-emphasis">{{ data.title }}</span>
            <div>
              <span class="text-h3 text-primary-darken-1">133</span>
              <span class="text-h5 font-weight-bold">/133</span>
            </div>
            <p class="text-sm mb-0">
              {{ data.desc }}
            </p>
          </div>
          <VAvatar
            :color="data.iconColor"
            variant="tonal"
            rounded
            size="42"
          >
            <VIcon
              :icon= 'icon'
              size="26"
            />
          </VAvatar>
        </div>
      </VCardText>
    </VCard>
</template>

<script setup>

  defineProps({
    title: String,
    presenr: Number,
    total: Number, 
    icon: String,
    iconColor: String,
  })
</script>
