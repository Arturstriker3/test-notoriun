<template>
  <section
    class="px-2 mt-4 animate-in fade-in duration-500"
  >
    <div class="h-10" />
    <div class="flex flex-col justify-center items-center gap-6 w-full h-full">
      <div class="flex flex-col gap-2 max-w-xl w-full">
        <h2 class="text-2xl font-semibold text-pretty">
          A localização está correta?
        </h2>
        <p class="text-sm sm:text-base text-gray-500">
          Verifique a localização identificada e ajuste se for necessário
        </p>
      </div>
      <div class="flex flex-col gap-8 items-center w-full">
        <div class="flex justify-center w-full">
          <v-card
            class="max-w-xl w-full min-h-[402px]"
          >
            <h1>conteudo</h1>
          </v-card>
        </div>
      </div>
    </div>
  </section>
  <FormFooter />
</template>