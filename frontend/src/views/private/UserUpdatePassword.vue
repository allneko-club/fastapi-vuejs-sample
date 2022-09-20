<template>
  <h5>change password</h5>
  <p>Enter your new password below</p>

  <Form @submit="onSubmit" :validation-schema="schema">
    <TextInput
      name="password1"
      type="password"
      label="password"
    />
    <TextInput
      name="password2"
      type="password"
      label="password (confirm)"
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
  setup(){
    const schema = yup.object({
      password1: yup.string().required(),
      password2: yup.string().required(),
    });

    const authStore = useAuthStore();
    const onSubmit = async (values) => {
      await authStore.actionUpdateUserProfile({password: values.password1});
      await router.push({name: 'private-profile'});
    };

    return {
      schema,
      onSubmit,
    }
  }
}
</script>
