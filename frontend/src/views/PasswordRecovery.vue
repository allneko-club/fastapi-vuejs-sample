<template>
  <h2>Password Recovery</h2>
  <p>A password recovery email will be sent to the registered account</p>

  <form @submit="onSubmit">
    <TextInput
      name="email"
      type="email"
      label="email"
      placeholder="Your email"
    />
    <button>Recover Password</button>
  </form>
</template>

<script>
import {useForm} from "vee-validate";
import * as yup from 'yup';

import {userAuthStore} from "@/stores/userState";
import TextInput from "@/components/fields/TextInput.vue";

export default {
  name: 'PasswordRecovery',
  components: {TextInput},
  setup() {
    const authStore = userAuthStore();

    const schema = yup.object({
      email: yup.string().email().required(),
    });
    const { handleSubmit } = useForm({validationSchema: schema});
    const onSubmit = handleSubmit((values) => {
      authStore.passwordRecovery(values.email);
    });
    return {
      onSubmit,
    }
  }

}
</script>

<style scoped>
</style>
