<template>
  <main class="px-2 mt-4">
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="flex justify-center items-center">
        <h2 class="text-2xl font-semibold text-center max-w-lg justify-center px-10">
          Entre com as informações do usuário que será o administrador do sistema
        </h2>
      </div>
      <div class="flex flex-col gap-8 items-center w-full">
        <v-card class="max-w-xl w-full ">
          <v-card-text>
            <v-form>
              <p class="text-center mt-8 mb-4 text-sm font-medium text-gray-500">
                As informações serão usadas para iniciar o sistema
              </p>
              <div class="text-subtitle-1 text-medium">
                Nome Completo*
              </div>
              <v-text-field 
                placeholder="Nome Completo" 
                class="mb-4"
                density="compact"
                variant="solo" 
              />
              <div class="text-subtitle-1 text-medium">
                Celular*
              </div>
              <v-text-field 
                placeholder="(00) 00000-0000" 
                class="mb-4"
                density="compact"
                variant="solo" 
              />
              <div class="text-subtitle-1 text-medium">
                E-mail*
              </div>
              <v-text-field 
                placeholder="exemplo@noemail.com.br" 
                density="compact"
                variant="solo" 
              />
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Aviso e botões -->
        <div class="flex flex-col items-center gap-4 text-center max-w-xl sm:w-full">
          <span class="text-xs font-medium text-black px-10">
            Esse site é protegido pelo reCAPTCHA e está sujeito à Política de Privacidade e aos Termos de Serviços do Google.
          </span>
          <div class="flex justify-between w-full">
            <v-btn
              variant="text"
              class="text-red-700"
            >
              Sair
            </v-btn>
            <v-btn
              class="bg-emerald-500 text-white"
              outlined
            >
              Cadastrar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
