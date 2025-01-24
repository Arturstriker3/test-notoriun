<script lang="ts" setup>

const atualView = ref(1);

const changeView = (viewNumber: number) => {
  atualView.value = viewNumber;
};

</script>

<template>
  <RegisterView1
    v-if="atualView == 1"
    @change-view="changeView"
  />
  <RegisterView2
    v-if="atualView == 2"
    @change-view="changeView"
  />
  <RegisterView3
    v-if="atualView == 3"
    @change-view="changeView"
  />
</template>
