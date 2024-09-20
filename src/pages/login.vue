<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2LoginMaskDark from '@images/pages/auth-v2-login-mask-dark.png'
import authV2LoginMaskLight from '@images/pages/auth-v2-login-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()
const message = route.query.ok || false 
const showAlert = ref( message ? true : false) 

console.log(`message: ${showAlert.value}`)
onMounted(() => {
  if (message) {
    setTimeout(() => {
      showAlert.value = false // Cache l'alerte après 5 secondes
    }, 5000) // 5000 millisecondes = 5 secondes
  }
})


const form = ref({
  email: 'admin@demo.com',
  password: 'admin',
  remember: false,
})

const login = () =>{
  router.push({ path: '/'})
}

const isPasswordVisible = ref(false)
const authV2LoginMask = useGenerateImageVariant(authV2LoginMaskLight, authV2LoginMaskDark)
const authV2LoginIllustration = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
</script>

<template>
  <VRow
    no-gutters
    class="d-flex justify-center align-center background"
  >
    
      <VCard
        flat
        :width="520"
        class="mt-12 mt-sm-0 pa-5 pa-lg-7"
        :height="550"
      >
        <v-alert
          v-if="showAlert"
          type="success"
          :value="true"
          title="Succès"
        >
          Le mot de passe a bien été modifier
        </v-alert>

        <VCardText>
          <h2 class="text-h3 mb-1">
            Se connecter
          </h2>

          <p class="mb-0">
            Veuillez vous connecter à votre compte 
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- email -->
            <VCol cols="12" class="mt-4">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                  width="100%"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12" class="mt-4">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <!-- <div class="d-flex align-center justify-space-between flex-wrap my-6 gap-x-2"> -->
                  <VCheckbox
                    v-model="form.remember"
                    label="Se soumevenir"
                    class="mt-4"
                  />
                  <div class="mt-4">
                    <RouterLink
                    class="text-primary"
                    :to="{ name: 'forgot-password' }"
                    
                  >
                   Mot de passe oublié?
                  </RouterLink>
                  </div>
                  
                  
                <!-- </div> -->
                

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  class="mt-8"
                >
                  Connexion
                </VBtn>
              </VCol>

            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    <!-- </VCol> -->
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
