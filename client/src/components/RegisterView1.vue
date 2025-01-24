<script lang="ts" setup>
import { inputSizes, validationRules } from '@/validator/validations';
import { storeToRefs } from 'pinia';
import { userStore } from '@/stores/user.store';
import { authStore } from '@/stores/auth.store';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();
const router = useRouter();
// const emit = defineEmits(['change-view']);
const authScreen = ref(false);
const formRef = ref();
const invalidOtp = ref(false);

const useUserStore = userStore();
const { newUser } = storeToRefs(useUserStore);

const useAuthStore = authStore();
const { userAuth } = storeToRefs(useAuthStore);

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
  formRef.value?.validate().then(async ({ valid: isValid }: { valid: boolean }) => {
    if (isValid) {
      try {
        const response = await useAuthStore.sendVerificationCode(newUser.value.email);
        if (response.message === "Verification code sent" && response.messageUrl) {
          window.open(response.messageUrl, "_blank");
          authScreen.value = true;
        } else {
          console.error("Erro inesperado ao enviar o código de verificação");
        }
      } catch (error) {
        console.error("Erro ao enviar código de verificação:", error);
      }
    } else {
      console.error("Formulário inválido");
    }
  });
};

const resendCode = async () => {
  if (useAuthStore.isAuthServiceCall) {
    console.warn("O serviço de autenticação já está em execução. Ação ignorada.");
    return;
  }

  try {
    const response = await useAuthStore.resendVerificationCode(newUser.value.email);
    if (response.message === "Verification code resent" && response.messageUrl) {
      window.open(response.messageUrl, "_blank");
    } else {
      console.error("Erro inesperado ao enviar novamente o código de verificação");
    }
  } catch (error) {
    console.error("Erro ao enviar novamente o código de verificação:", error);
  }
};

const verifyUserCode = async () => {
  try {
    const response = await useAuthStore.verifyCode(newUser.value.email, userAuth.value.code);
    if (response.message === "Code validated successfully") {
      invalidOtp.value = false;
    } else {
      invalidOtp.value = true;
      userAuth.value.code = "";
    }
  } catch (error) {
    toaster.error("Código de verificação inválido");
    invalidOtp.value = true;
    userAuth.value.code = "";
    console.error("Erro ao verificar o código:", error);
  }
};

watch(
  () => userAuth.value.code,
  (newCode) => {
    if (newCode.length === 6 && /^\d{6}$/.test(newCode)) {
      verifyUserCode();
    }
  }
);
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
                  :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
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
                  :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
                  @input="applyPhoneMask"
                />

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
                  :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
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
              :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
              @click="goTo('users')"
            >
              Sair
            </v-btn>
            <v-btn
              class="bg-emerald-500 text-white min-w-[132px]"
              outlined
              :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
              :loading="useAuthStore.isAuthServiceCall"
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
                  Insira abaixo o código enviado para <span class="font-semibold">{{ newUser.email }}</span>
                </p>
              </div>
              <v-otp-input
                v-model="userAuth.code"
                length="6"
                max-width="full"
                :loading="useAuthStore.isAuthServiceCall"
                :disabled="useUserStore.isUserServiceCall || useAuthStore.isAuthServiceCall"
                :error="invalidOtp"
              />
              <div class="flex justify-center items-center w-full mt-6">
                <span 
                  class="text-base text-center text-red-600 underline font-semibold cursor-pointer hover:underline hover:text-red-800"
                  @click="resendCode()"
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
