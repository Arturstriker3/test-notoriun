<script lang="ts" setup>

const atualView = ref(1);

</script>

<template>
  <RegisterView1 v-if="atualView == 1" />
  <RegisterView2 v-if="atualView == 2" />
  <RegisterView3 v-if="atualView == 3" />
</template>
