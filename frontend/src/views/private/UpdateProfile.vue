<template>
  <h2>Edit User Profile</h2>

  <Form :initial-values="initialValues" :validation-schema="schema" @submit="onSubmit">
    <TextInput
        label="name"
        name="name"
        placeholder="Your Name"
        type="text"
    />
    <TextInput
        label="email"
        name="email"
        placeholder="Your email"
        type="email"
    />
    <button>Submit</button>
  </Form>
</template>

<script>
import {Form} from "vee-validate";
import * as yup from 'yup';

import TextInput from "@/components/fields/TextInput.vue";
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";

export default {
  components: {Form, TextInput},
  setup(props, context) {
    const authStore = useAuthStore();

    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
    });

    const initialValues = {
      email: authStore.userProfile.email,
      name: authStore.userProfile.name,
    };

    const onSubmit = async (values) => {
      await authStore.updateUserProfile(values);
      await router.push({name: 'profile'});
    }

    return {initialValues, schema, onSubmit}
  }
}
</script>
