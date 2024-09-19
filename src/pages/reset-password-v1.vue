<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV1ResetPasswordMaskDark from '@images/pages/auth-v1-reset-password-mask-dark.png'
import authV1ResetPasswordMaskLight from '@images/pages/auth-v1-reset-password-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { inject, provide } from 'vue'
import { useRouter } from 'vue-router'

const authV1ResetPasswordMask = useGenerateImageVariant(authV1ResetPasswordMaskLight, authV1ResetPasswordMaskDark)
const router = useRouter()
const form = ref({
  newPassword: '',
  confirmPassword: '',
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})


const connexion = () =>{
  router.push({ path: '/login', query: { ok: true } })
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4 bg background">
    
    <VCard
      class="auth-card pa-1 pa-sm-7"
      max-width="540"
    >
      <VCardItem class="justify-center pb-6">
        <VCardTitle>
              <h2 class="app-logo-title">
                Réinitialiser le mot de passe 🔒
              </h2>
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <p class="mb-0">
          Entrez votre nouveau mot de passe
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="connexion">
          <VRow>
            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.newPassword"
                autofocus
                label="Nouveau mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <!-- Confirm Password -->
            <VCol cols="12">
              <VTextField
                v-model="form.confirmPassword"
                label="Confirmation du mot de passe"
                placeholder="············"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              />
            </VCol>

            <!-- reset password -->
            <VCol cols="12">
              <VBtn
                block
                type="submit"
              >
                Enregistrer
              </VBtn>
            </VCol>

            <!-- back to login -->
            <VCol cols="12">
              <RouterLink
                class="d-flex align-center justify-center"
                :to="{ name: 'login' }"
              >
                <VIcon
                  start
                  size="20"
                  icon="ri-arrow-left-s-line"
                  class="flip-in-rtl"
                />
                <span class="text-base">RETOUR</span>
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
   
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
