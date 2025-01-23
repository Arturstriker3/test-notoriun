<template>
  <main class="px-2 mt-4 animate-in fade-in duration-500">
    <v-card
      class="w-full"
      style="min-height: 402px;"
    >
      <v-card-text>
        <v-form class="mt-4 mx-4">
          <v-row
            class="mb-4"
            dense
          >
            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Número do CNPJ*</label>
              <v-text-field
                placeholder="Digite o número de CNPJ"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Nome*</label>
              <v-text-field
                placeholder="Digite o nome da Instituição"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Telefone contato</label>
              <v-text-field
                placeholder="(00) 00000-0000"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Email da instituição</label>
              <v-text-field
                placeholder="instituicao@financeira.com.br"
                density="compact"
                variant="solo"
              />
            </v-col>
          </v-row>

          <div class="border-t-2 border-black mb-8" />

          <p class="text-lg font-medium mb-6">
            Digite o CEP e complete as informações
          </p>

          <v-row
            class="mb-4"
            dense
          >
            <v-col
              cols="12"
              md="4"
            >
              <label class="text-subtitle-1">CEP*</label>
              <v-text-field
                placeholder="Digite o CEP da localidade"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <label class="text-subtitle-1">Estado*</label>
              <v-text-field
                placeholder="Estado"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <label class="text-subtitle-1">Cidade*</label>
              <v-text-field
                placeholder="Cidade"
                density="compact"
                variant="solo"
              />
            </v-col>
          </v-row>

          <v-row
            class="mb-4"
            dense
          >
            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Bairro*</label>
              <v-text-field
                placeholder="Exemplo: Centro"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Endereço*</label>
              <v-text-field
                placeholder="Exemplo: Avenida Brasil"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Número*</label>
              <v-text-field
                placeholder="Exemplo: 123"
                density="compact"
                variant="solo"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Complemento*</label>
              <v-text-field
                placeholder="Exemplo: Sala 01"
                density="compact"
                variant="solo"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </main>
</template>