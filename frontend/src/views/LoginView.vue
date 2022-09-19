<template>
  <div id="login">
    <h1>Login</h1>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div>
        <TextInput
          name="username"
          type="text"
          label="Name"
          placeholder="Your Name"
        />
        <TextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </Form>
    <router-link :to="{ name: 'recover-password'}">recover-password</router-link>
  </div>
</template>

<script>
import { Form } from "vee-validate";
import * as yup from 'yup';
import { useAuthStore } from "@/stores/useAuthStore";
import TextInput from "@/components/fields/TextInput.vue";

export default {
  name: 'Login',
  components: {Form, TextInput},
  setup(){
      const authStore = useAuthStore();

      // 各fieldはTextInput内のuseField()で定義するが、バリデーションはuseForm()で定義する
      // Define validation schema
      const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
      });

      const onSubmit = async (values) => {
        await authStore.actionLogIn(values.username, values.password)
      };

      return {
        schema,
        onSubmit,
      }
  },
}
</script>

<style scoped>
</style>
