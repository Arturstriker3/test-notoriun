<template>
  <v-app-bar
    elevation="0"
    class="flex items-center h-3 px-2"
  >
    <div class="flex items-center justify-start w-1/2">
      <h3 class="text-2xl font-medium">
        Notoriun
      </h3>
    </div>

    <div class="flex items-center justify-end w-1/2 space-x-4">
      <v-btn
        icon
        class="text-black"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        class="text-black"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>
