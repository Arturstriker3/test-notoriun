<script lang="ts" setup>
import { inputSizes, validationRules } from '@/validator/validations';
import { storeToRefs } from 'pinia';
import { userStore } from '@/stores/user.store';

const router = useRouter();
// const emit = defineEmits(['change-view']);
const authScreen = ref(false);
const userEmail = ref('teste@example.com');
const formRef = ref();

const useUserStore = userStore();
const { newUser } = storeToRefs(useUserStore);

const goTo = (route: string) => {
  router.push(`/${route}`);
};

// const changeView = (view: number) => {
//   emit('change-view', view);
// };

const applyPhoneMask = () => {
  let numericValue = newUser.value.userPhone.replace(/\D/g, '');
  if (numericValue.length > 4) {
    numericValue = numericValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else {
    numericValue = numericValue.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  }
  newUser.value.userPhone = numericValue;
  newUser.value.userPhoneCode = numericValue.slice(1, 3);
};

const validateEmail = () => {
  formRef.value?.validate().then(({ valid: isValid }: { valid: boolean }) => {
    if (isValid) {
      console.log('Formulário válido');
      authScreen.value = true;
    } else {
      console.error('Formulário inválido');
    }
  });
};

</script>

<template>
  <section
    v-if="!authScreen"
    class="px-2 mt-4 animate-in fade-in duration-500"
  >
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="flex justify-center items-center">
        <h2 class="text-2xl font-semibold text-pretty text-center max-w-lg justify-center px-10">
          Entre com as informações do usuário que será o administrador do sistema
        </h2>
      </div>
      <div class="flex flex-col gap-8 items-center w-full">
        <div class="flex justify-center w-full">
          <v-card
            class="max-w-xl w-full min-h-[402px]"
          >
            <v-card-text>   
              <v-form ref="formRef">
                <div class="text-center mt-8 mb-4 text-sm font-medium text-gray-500">
                  <span>As informações serão usadas para iniciar o sistema</span>
                </div>
                <label class="text-subtitle-1">
                  Nome Completo*
                </label>
                <v-text-field 
                  v-model="newUser.name" 
                  placeholder="Nome Completo"
                  class="mb-4"
                  density="compact"
                  variant="solo"
                  :maxlength="inputSizes.largeLength"
                  :rules="[validationRules.required]"
                />

                <label class="text-subtitle-1">
                  Celular*
                </label>
                <v-text-field 
                  v-model="newUser.userPhone" 
                  placeholder="(00) 00000-0000" 
                  class="mb-4"
                  density="compact"
                  variant="solo"
                  :maxlength="inputSizes.phoneLength"
                  :rules="[validationRules.required, validationRules.phone]"
                  @input="applyPhoneMask"
                />
                {{ newUser.userPhoneCode }}
                

                <label class="text-subtitle-1">
                  E-mail*
                </label>
                <v-text-field
                  v-model="newUser.email" 
                  placeholder="exemplo@noemail.com.br" 
                  density="compact"
                  variant="solo"
                  :maxlength="inputSizes.mediumLength"
                  :rules="[validationRules.required, validationRules.email]"
                />
              </v-form>
            </v-card-text>
          </v-card>
        </div>

        <div class="flex flex-col items-center gap-6 text-center max-w-xl sm:w-full">
          <span class="text-xs font-medium text-black px-11">
            Esse site é protegido pelo reCAPTCHA e está sujeito à Política de Privacidade e aos Termos de Serviços do Google.
          </span>
          <div class="flex justify-between w-full">
            <v-btn
              variant="text"
              class="text-red-700 min-w-[132px]"
              @click="goTo('users')"
            >
              Sair
            </v-btn>
            <v-btn
              class="bg-emerald-500 text-white min-w-[132px]"
              outlined
              @click="validateEmail()"
            >
              Cadastrar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    v-else
    class="px-2 mt-4 animate-in fade-in duration-500"
  >
    <div class="flex flex-col gap-4 w-full h-full">
      <div class="h-16" />
      <div class="flex flex-col gap-8 items-center w-full">
        <v-card
          class="max-w-xl w-full min-h-[402px]"
        >
          <v-card-text>
            <v-form>
              <div class="flex flex-col gap-2 mb-6">
                <h2 class="text-3xl font-semibold text-pretty text-center justify-center mt-10">
                  Validação de e-mail
                </h2>
                <p class="text-center text-sm font-medium text-gray-500 px-16">
                  Insira abaixo o código enviado para <span class="font-semibold">{{ userEmail }}</span>
                </p>
              </div>
              <v-otp-input
                length="6"
                model-value="123456"
                max-width="full"
              />
              <div class="flex justify-center items-center w-full mt-6">
                <span 
                  class="text-base text-center text-red-600 underline font-semibold cursor-pointer hover:underline"
                >
                  Não recebi o código
                </span>
              </div>
              <div class="flex items-center mt-8">
                <v-icon
                  size="large"
                  class="mr-2"
                >
                  mdi-alert-circle-outline
                </v-icon>
                <div class="flex flex-col">
                  <p class="text-xs font-medium sm:text-sm">
                    Verifique se o e-mail está correto.
                  </p>
                  <p class="text-xs font-medium sm:text-sm">
                    Além disso, não se esqueça de conferir sua caixa de spam.
                  </p>
                </div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </section>
</template>
