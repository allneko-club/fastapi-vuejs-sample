<template>
  <h5>change password</h5>
  <p>Enter your new password below</p>

  <Form :validation-schema="schema" @submit="onSubmit">
    <TextInput
        label="password"
        name="password1"
        type="password"
    />
    <TextInput
        label="password (confirm)"
        name="password2"
        type="password"
    />
    <button>Change Password</button>
  </Form>

</template>

<script>
import {Form} from "vee-validate";
import * as yup from 'yup';

import {useAuthStore} from "@/stores/useAuthStore";
import TextInput from "@/components/fields/TextInput.vue";
import router from "@/router";

export default {
  components: {Form, TextInput},
  setup(props, context) {
    const schema = yup.object({
      password1: yup.string().required(),
      password2: yup.string().required(),
    });

    const authStore = useAuthStore();
    const onSubmit = async (values) => {
      await authStore.updateUserProfile({password: values.password1});
      await router.push({name: 'profile'});
    };

    return {schema, onSubmit}
  }
}
</script>

<style scoped>
</style>