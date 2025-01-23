<template>
  <main class="px-12 mt-4">
    <div class="flex flex-col gap-8 w-full h-full">
      <div class="flex justify-center items-center">
        <h2 class="text-2xl font-semibold text-center max-w-lg justify-center">
          Entre com as informações do usuário que será o administrador do sistema
        </h2>
      </div>
      <div class="flex flex-col gap-8 items-center w-full">
        <v-card class="max-w-lg w-full ">
          <v-card-text>
            <v-form>
              <div class="text-subtitle-1 text-medium-emphasis text-black">Nome Completo*</div>
              <v-text-field 
                placeholder="Nome Completo" 
                class="mb-4"
                density="compact"
                variant="solo" 
              />
              <div class="text-subtitle-1 text-medium-emphasis">Celular*</div>
              <v-text-field 
                placeholder="(00) 00000-0000" 
                class="mb-4"
                density="compact"
                variant="solo" 
              />
              <div class="text-subtitle-1 text-medium-emphasis">Email*</div>
              <v-text-field 
                placeholder="exemplo@noemail.com.br" 
                density="compact"
                variant="solo" 
              />
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Aviso e botões -->
        <div class="flex flex-col items-center gap-4 text-center max-w-lg">
          <span class="text-sm text-gray-600">
            Esse site é protegido pelo reCAPTCHA e está sujeito à Política de Privacidade e aos Termos de Serviços do Google.
          </span>
          <div class="flex gap-4">
            <v-btn
              color="red"
              outlined
            >
              Sair
            </v-btn>
            <v-btn
              color="green"
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
