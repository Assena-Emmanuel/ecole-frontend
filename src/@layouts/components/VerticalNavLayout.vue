<script setup>
import { VerticalNav } from '@layouts/components'
import { useLayoutConfigStore } from '@layouts/stores/config'

const props = defineProps({
  navItems: {
    type: null,
    required: true,
  },
  verticalNavAttrs: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})

const { width: windowWidth } = useWindowSize()
const configStore = useLayoutConfigStore()
const isOverlayNavActive = ref(false)
const isLayoutOverlayVisible = ref(false)
const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

// ℹ️ This is alternative to below two commented watcher

// We want to show overlay if overlay nav is visible and want to hide overlay if overlay is hidden and vice versa.
syncRef(isOverlayNavActive, isLayoutOverlayVisible)

// })

// ℹ️ Hide overlay if user open overlay nav in <md and increase the window width without closing overlay nav
watch(windowWidth, () => {
  if (!configStore.isLessThanOverlayNavBreakpoint && isLayoutOverlayVisible.value)
    isLayoutOverlayVisible.value = false
})

const verticalNavAttrs = computed(() => {
  const vNavAttrs = toRef(props, 'verticalNavAttrs')

  const {
    wrapper: verticalNavWrapper,
    wrapperProps: verticalNavWrapperProps,
    ...additionalVerticalNavAttrs
  } = vNavAttrs.value

  
  return {
    verticalNavWrapper,
    verticalNavWrapperProps,
    additionalVerticalNavAttrs,
  }
})

const widgetData = ref([
  {
    title: 'Présence élèves',
    value: '0',
    change: 29,
    desc: '',
    icon: 'ri-group-line',
    iconColor: 'primary',
  },
  {
    title: 'Enseignants',
    value: '0',
    change: 18,
    desc: '',
    icon: 'ri-user-add-line',
    iconColor: 'error',
  },
  {
    title: 'Administration',
    value: '0',
    change: -14,
    desc: '',
    icon: 'ri-user-follow-line',
    iconColor: 'success',
  },

])
</script>

<template>
  <div
    class="layout-wrapper"
    :class="configStore._layoutClasses"
  >
    <component
      :is="verticalNavAttrs.verticalNavWrapper ? verticalNavAttrs.verticalNavWrapper : 'div'"
      v-bind="verticalNavAttrs.verticalNavWrapperProps"
      class="vertical-nav-wrapper"
    >
      <VerticalNav
        :is-overlay-nav-active="isOverlayNavActive"
        :toggle-is-overlay-nav-active="toggleIsOverlayNavActive"
        :nav-items="props.navItems"
        v-bind="{ ...verticalNavAttrs.additionalVerticalNavAttrs }"
      >
        <template #nav-header>
          <slot name="vertical-nav-header" />
        </template>
        <template #before-nav-items>
          <slot name="before-vertical-nav-items" />
        </template>
      </VerticalNav>
    </component>
    <div class="layout-content-wrapper">
      <header
        class="layout-navbar"
        :class="[{ 'navbar-blur': configStore.isNavbarBlurEnabled }]"
      >
        <div class="navbar-content-container mt-2 mb-4 rounded-4">
          <slot
            name="navbar"
            :toggle-vertical-overlay-nav-active="toggleIsOverlayNavActive"
          />
        </div>
        


      </header>
      <main class="layout-page-content">

        <div class="d-flex mb-6">
      <VRow>
        <template
          v-for="(data, id) in widgetData"
          :key="id"
        >
          <VCol
            cols="12"
            md="4"
            sm="4"
          >
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
                      :icon="data.icon"
                      size="26"
                    />
                  </VAvatar>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </template>
      </VRow>
    </div>

        <div class="page-content-container">
          <slot />
        </div>
      </main>
      <footer class="layout-footer">
        <div class="footer-content-container">
          <slot name="footer" />
        </div>
      </footer>
    </div>
    <div
      class="layout-overlay"
      :class="[{ visible: isLayoutOverlayVisible }]"
      @click="() => { isLayoutOverlayVisible = !isLayoutOverlayVisible }"
    />
  </div>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper.layout-nav-type-vertical {
  // TODO(v2): Check why we need height in vertical nav & min-height in horizontal nav
  block-size: 100%;

  .layout-content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-block-size: 100dvh;
    transition: padding-inline-start 0.2s ease-in-out;
    will-change: padding-inline-start;

    @media screen and (min-width: 1280px) {
      padding-inline-start: variables.$layout-vertical-nav-width;
    }
  }

  .layout-navbar {
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index;

    .navbar-content-container {
      background-color: rgb(255, 255, 255) !important;
      block-size: variables.$layout-vertical-nav-navbar-height;
    }

    @at-root {
      .layout-wrapper.layout-nav-type-vertical {
        .layout-navbar {
          @if variables.$layout-vertical-nav-navbar-is-contained {
            @include mixins.boxed-content;
          }

          // else
          @else {
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  &.layout-navbar-sticky .layout-navbar {
    @extend %layout-navbar-sticky;
  }

  &.layout-navbar-hidden .layout-navbar {
    @extend %layout-navbar-hidden;
  }

  // 👉 Footer
  .layout-footer {
    @include mixins.boxed-content;
  }

  // 👉 Layout overlay
  .layout-overlay {
    position: fixed;
    z-index: variables.$layout-overlay-z-index;
    background-color: rgb(0 0 0 / 60%);
    cursor: pointer;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    will-change: opacity;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  // Adjust right column pl when vertical nav is collapsed
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 👉 Content height fixed
  &.layout-content-height-fixed {
    .layout-content-wrapper {
      max-block-size: 100dvh;
    }

    .layout-page-content {
      display: flex;
      overflow: hidden;

      .page-content-container {
        inline-size: 100%;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
