<template>
  <div id="login">
    <h1>Login</h1>
    <form @submit="onSubmit">
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
    </form>
    <router-link :to="{ name: 'recover-password'}">recover-password</router-link>
  </div>
</template>

<script>
import {useForm} from "vee-validate";
import * as yup from 'yup';
import {userAuthStore} from "@/stores/userState";
import TextInput from "@/components/fields/TextInput.vue";

export default {
  name: 'Login',
  components: {TextInput},
  setup(){
      const authStore = userAuthStore();

      // 各fieldはTextInput内のuseField()で定義するが、バリデーションはuseForm()で定義する
      // Define validation schema
      const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
      });
      const { handleSubmit } = useForm({validationSchema: schema});
      const onSubmit = handleSubmit(async (values) => {
        await authStore.actionLogIn(values.username, values.password)
      });

      return {
        onSubmit,
      }
  },
}
</script>

<style scoped>
</style>
