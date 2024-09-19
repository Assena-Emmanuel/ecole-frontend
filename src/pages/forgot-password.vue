<script setup>
import authV1RegisterMaskDark from '@images/pages/auth-v1-register-mask-dark.png'
import authV1RegisterMaskLight from '@images/pages/auth-v1-register-mask-light.png'


import authV2ForgotPasswordIllustrationBorderedDark from '@images/pages/auth-v2-forgot-password-illustration-bordered-dark.png'
import authV2ForgotPasswordIllustrationBorderedLight from '@images/pages/auth-v2-forgot-password-illustration-bordered-light.png'
import authV2ForgotPasswordIllustrationDark from '@images/pages/auth-v2-forgot-password-illustration-dark.png'
import authV2ForgotPasswordIllustrationLight from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2ForgotPasswordMaskDark from '@images/pages/auth-v2-forgot-password-mask-dark.png'
import authV2ForgotPasswordMaskLight from '@images/pages/auth-v2-forgot-password-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/store'

const authThemeImg = useGenerateImageVariant(authV2ForgotPasswordIllustrationLight, authV2ForgotPasswordIllustrationDark, authV2ForgotPasswordIllustrationBorderedLight, authV2ForgotPasswordIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2ForgotPasswordMaskLight, authV2ForgotPasswordMaskDark)

const authV1ThemeTwoStepMask = useGenerateImageVariant(authV1RegisterMaskLight, authV1RegisterMaskDark)

const email = ref('')
const router = useRouter()
const emailError = ref(false);
const emailErrorMessage = ref('');

const userStore = useUserStore()

const reinitialisation = () => {
  if(validateEmail(email.value)){
    userStore.setEmail(email.value)
    router.push({ name: 'authentification-two-step' })
  } else {
    emailError.value = true;
    emailErrorMessage.value = 'Email invalide';
  }
}


function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})
</script>

<template>

  <div 
    class="auth-wrapper d-flex align-center justify-center align-center background"
    >
    <section>
      <VCard
        flat
        :max-width="520"
        elevation="2"
        class="auth-card mt-sm-0 pa-5 pa-lg-7 "
      >
        
        <VCardText>
          <h4 class="text-h4 mb-1">
            Réinitialisation de mot de passe
          </h4>
          <p class="mb-0">
            Entrez votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="reinitialisation">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  autofocus
                  label="Email"
                  placeholder="johndoe@email.com"
                  type="email"
                  :error="emailError" 
                  :error-messages="emailErrorMessage"
                />
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  Reinitialiser
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="ri-arrow-left-s-line"
                    size="20"
                    class="me-2 flip-in-rtl"
                  />
                  <span>RETOUR</span>
                </RouterLink>
              </VCol>
              
                 
              
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
      <VImg
      :src="authV1ThemeTwoStepMask"
      class="d-none d-md-block auth-footer-mask flip-in-rtl"
    />
    </section>
    
  </div>

</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
