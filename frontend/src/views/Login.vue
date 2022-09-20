<template>
  <div id="login">
    <h1>Login</h1>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div>
        <TextInput
            label="Name"
            name="username"
            placeholder="Your Name"
            type="text"
        />
        <TextInput
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
        />
      </div>
      <div v-if="authStore.loginError">
        Incorrect email or password
      </div>
      <button type="submit">Login</button>
    </Form>
    <router-link :to="{ name: 'recover-password'}">recover-password</router-link>
  </div>
</template>

<script>
import {Form} from "vee-validate";
import * as yup from 'yup';
import {useAuthStore} from "@/stores/useAuthStore";
import TextInput from "@/components/fields/TextInput.vue";

export default {
  name: 'Login',
  components: {Form, TextInput},
  setup() {
    const authStore = useAuthStore();

    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    });

    const onSubmit = async (values) => {
      await authStore.actionLogin(values.username, values.password)
    };

    return {authStore, schema, onSubmit}
  },
}
</script>

<style scoped>
</style>
