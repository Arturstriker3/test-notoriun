<script lang="ts" setup>

const router = useRouter();

const goTo = (route: string) => {
  router.push(`/${route}`);
};

</script>

<template>
  <div class="flex flex-col sticky top-0 z-10 bg-white shadow-md">
    <header class="flex items-center w-full h-20 px-12">
      <div class="flex items-center w-1/2 justify-start">
        <h3 class="text-2xl font-medium">
          Notoriun
        </h3>
      </div>

      <div class="flex items-center space-x-4 w-1/2 justify-end">
        <v-btn
          icon
          @click="goTo('')"
        >
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="goTo('users')"
        >
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
      </div>
    </header>
    <div class="border-t-2 border-black" />
  </div>
</template>
