<script lang="ts" setup>

const emit = defineEmits(['rewind', 'forward']);

const rewind = () => {
  emit('rewind',);
};

const forward = () => {
  emit('forward');
}

</script>

<template>
  <div class="border-t-2 border-black mt-4 mb-8" />
  <div class="flex flex-col w-full px-10">
    <div class="flex justify-between w-full">
      <v-btn
        outlined
        class="bg-gray-300 text-black min-w-[132px]"
        size="large"
        @click="rewind()"
      >
        Voltar
      </v-btn>
      <v-btn
        class="bg-emerald-500 text-white min-w-[132px]"
        outlined
        size="large"
        @click="forward()"
      >
        Continua
      </v-btn>
    </div>
  </div>
</template>