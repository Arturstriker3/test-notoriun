<script lang="ts" setup>
import { inputSizes, validationRules } from '@/validator/validations';
import { storeToRefs } from 'pinia';
import { userStore } from '@/stores/user.store';
import cepService from '@/services/cep.service';
import { ref, watch } from 'vue';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();
const formRef = ref();
const useUserStore = userStore();
const { newUser } = storeToRefs(useUserStore);
const isLoading = ref(false);

const emit = defineEmits(['change-view']);

const rewind = () => {
  useUserStore.resetNewUser();
  emit('change-view', 1);
};

const forward = () => {
  validateForm();
};

const applyPhoneMask = () => {
  let numericValue = newUser.value.institutionPhone.replace(/\D/g, '');
  if (numericValue.length > 4) {
    numericValue = numericValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else {
    numericValue = numericValue.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  }
  newUser.value.institutionPhone = numericValue;
  newUser.value.institutionPhoneCode = numericValue.slice(1, 3);
};

watch(
  () => newUser.value.postalCode,
  async (postalCode) => {
    if (postalCode.length === 8) {
      isLoading.value = true;

      try {
        const response = await cepService.getCepInfo(postalCode);
        const data = response.data;

        if (!data.erro) {
          toaster.success("CEP encontrado com sucesso!");
          newUser.value.address = data.logradouro || '';
          newUser.value.neighborhood = data.bairro || '';
          newUser.value.city = data.localidade || '';
          newUser.value.state = data.uf || '';
        } else {
          console.error("CEP não encontrado.");
          toaster.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao consultar o CEP:", error);
      } finally {
        isLoading.value = false;
      }
    }
  }
);

const validateForm = () => {
  formRef.value?.validate().then(async ({ valid: isValid }: { valid: boolean }) => {
    if (isValid) {
      emit('change-view', 3); 
    } else {
      console.error("Formulário inválido");
    }
  });
};
</script>

<template>
  <section class="px-2 mt-4 animate-in fade-in duration-500">
    <v-card
      class="w-full"
      style="min-height: 402px;"
    >
      <v-card-text>
        <v-form
          ref="formRef"
          class="mt-4 mx-4"
        >
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
                v-model="newUser.cnpj"
                placeholder="Digite o número de CNPJ"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.cnpjLength"
                :rules="[validationRules.required, validationRules.cnpj]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Nome*</label>
              <v-text-field
                v-model="newUser.institutionName"
                placeholder="Digite o nome da Instituição"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.largeLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Telefone contato</label>
              <v-text-field
                v-model="newUser.institutionPhone" 
                placeholder="(00) 00000-0000"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.phoneLength"
                :rules="[validationRules.phone]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
                @input="applyPhoneMask"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Email da instituição</label>
              <v-text-field
                v-model="newUser.institutionEmail"
                placeholder="instituicao@financeira.com.br"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.mediumLength"
                :rules="[validationRules.email]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
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
                v-model="newUser.postalCode"
                placeholder="Digite o CEP da localidade"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.cepLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
                @input="newUser.postalCode = newUser.postalCode.replace(/\D/g, '')"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <label class="text-subtitle-1">Estado*</label>
              <v-text-field
                v-model="newUser.state"
                placeholder="Estado"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.mediumLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <label class="text-subtitle-1">Cidade*</label>
              <v-text-field
                v-model="newUser.city"
                placeholder="Cidade"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.mediumLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
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
                v-model="newUser.neighborhood"
                placeholder="Exemplo: Centro"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.mediumLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Endereço*</label>
              <v-text-field
                v-model="newUser.address"
                placeholder="Exemplo: Avenida Brasil"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.mediumLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Número*</label>
              <v-text-field
                v-model="newUser.number"
                placeholder="Exemplo: 123"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.smallLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
                @input="newUser.number = newUser.number.replace(/\D/g, '')"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <label class="text-subtitle-1">Complemento*</label>
              <v-text-field
                v-model="newUser.complement"
                placeholder="Exemplo: Sala 01"
                density="compact"
                variant="solo"
                :maxlength="inputSizes.smallLength"
                :rules="[validationRules.required]"
                :disabled="useUserStore.isUserServiceCall || isLoading"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
  <FormFooter
    @rewind="rewind()"
    @forward="forward()"
  />
</template>