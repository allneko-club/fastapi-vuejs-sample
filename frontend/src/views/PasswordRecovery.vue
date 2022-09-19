<template>
  <h2>Password Recovery</h2>
  <p>A password recovery email will be sent to the registered account</p>

  <Form @submit="onSubmit" :validation-schema="schema">
    <TextInput
      name="email"
      type="email"
      label="email"
      placeholder="Your email"
    />
    <button>Recover Password</button>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
import * as yup from 'yup';
import { userAuthStore } from "@/stores/userState";
import TextInput from "@/components/fields/TextInput.vue";

export default {
  name: 'PasswordRecovery',
  components: {Form, TextInput},
  setup() {
    const authStore = userAuthStore();
    const schema = yup.object({email: yup.string().email().required()});
    const onSubmit = async (values) => {
      await authStore.passwordRecovery(values.email)
    };
    return {
      schema,
      onSubmit,
    }
  }
}
</script>

<style scoped>
</style>
