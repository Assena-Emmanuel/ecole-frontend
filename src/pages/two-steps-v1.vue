<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV1RegisterMaskDark from '@images/pages/auth-v1-register-mask-dark.png'
import authV1RegisterMaskLight from '@images/pages/auth-v1-register-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/store'


const authV1ThemeTwoStepMask = useGenerateImageVariant(authV1RegisterMaskLight, authV1RegisterMaskDark)
const router = useRouter()
const otp = ref('')
const isOtpInserted = ref(false)
const masqueEmail = ref('')

const onFinish = () => {
  isOtpInserted.value = true
  setTimeout(() => {
    isOtpInserted.value = false
    router.push('/')
  }, 2000)
}


const userStore = useUserStore()
if(userStore.email){
  masqueEmail.value = userStore.email.at(0).padEnd(15, '*')+userStore.email.slice(userStore.email.indexOf('@'))
}

const verification = () =>{
  router.push({name: 'authentification-reset-password'})
}

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center align-center bg background">
    <!-- <VImg
      :src="authV1ThemeTwoStepMask"
      class="d-none d-md-block auth-footer-mask flip-in-rtl"
    /> -->
    <VCard
      class="auth-card pa-1 pa-sm-7"
      max-width="448"
    >
      <VCardItem class="justify-center pb-6">
        <VCardTitle>

          <h1 class="app-logo-title">
            Vérification 💬
              </h1>
          
        </VCardTitle>
      </VCardItem>

      <VCardText>
        
        <p class="mb-1">
          Nous avons envoyé un code de vérification à l'adresse {{ masqueEmail }}. Saisissez ce code dans le champ ci-dessous.
        </p>

      </VCardText>

      <VCardText>
        <VForm @submit.prevent="verification">
          <!-- email -->
          <h6 class="text-body-1">
            Tapez votre code de sécurité à 4 chiffres
          </h6>
          <VOtpInput
            v-model="otp"
            :disabled="isOtpInserted"
            type="number"
            :length="4"
            autofocus
            class="pa-0"
            @finish="onFinish"
          />

          <!-- reset password -->
          <VBtn
            :loading="isOtpInserted"
            :disabled="isOtpInserted"
            block
            type="submit"
            class="mt-3 mb-5"
          >
            Vérifier
          </VBtn>

          <!-- back to login -->
          <div class="d-flex justify-center align-center flex-wrap">
            <span class="me-1">Vous avez pas reçu le code?</span>
            <a href="#">Renvoyer</a>
          </div>
        </VForm>
      </VCardText>
    </VCard>
    
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
