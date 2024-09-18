<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'userData',
])

const isFormValid = ref(false)
const refForm = ref()
const nom = ref('')
const prenom = ref('')
const email = ref('')
const telephone1 = ref('')
const telephone2 = ref()
const contact = ref('')
const role = ref()
const plan = ref()
const status = ref()

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        id: 0,
        fullName: fullName.value,
        company: company.value,
        role: role.value,
        username: userName.value,
        country: country.value,
        contact: contact.value,
        email: email.value,
        currentPlan: plan.value,
        status: status.value,
        avatar: '',
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add User"
      @cancel="closeNavigationDrawer"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <VTextField
                  v-model="nom"
                  :rules="[requiredValidator]"
                  label="Nom"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="prenom"
                  :rules="[requiredValidator]"
                  label="Prenom"
                  placeholder="Johndoe"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              

              <!-- 👉 Country -->
              <VCol cols="12">
                <VSelect
                  v-model="country"
                  label="Select Country"
                  placeholder="Select Country"
                  :rules="[requiredValidator]"
                  :items="['United States', 'United Kingdom', 'France']"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <VTextField
                  v-model="telephone1"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Telephone 1"
                  placeholder="+225 0707120303"
                />
              </VCol>

              
              <!-- 👉 Contact 2-->
              <VCol cols="12">
                <VTextField
                  v-model="telephone2"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Telephone 2"
                  placeholder="+225 0507120303"
                />
              </VCol>
              <!-- 👉 Contact 2-->
              <VCol cols="12">
                <VTextField
                  v-model="telephone2"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Telephone fixe (Facultatif)"
                  placeholder=""
                />
              </VCol>
              <!-- 👉 Role -->
              <VCol cols="12">
                <VSelect
                  v-model="role"
                  label="Select Role"
                  placeholder="Select Role"
                  :rules="[requiredValidator]"
                  :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <VSelect
                  v-model="status"
                  label="Select Status"
                  placeholder="Select Status"
                  :rules="[requiredValidator]"
                  :items="[{ title: 'Active', value: 'Active' }, { title: 'Inactive', value: 'Inactive' }, { title: 'Pending', value: 'Pending' }]"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-4"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="error"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
