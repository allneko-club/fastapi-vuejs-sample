<template>
  <h2>Edit User Profile</h2>

  <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="schema">
    <TextInput
      name="name"
      type="text"
      label="name"
      placeholder="Your Name"
    />
    <TextInput
      name="email"
      type="email"
      label="email"
      placeholder="Your email"
    />
    <button>Submit</button>
  </Form>
</template>

<script>
import { Form } from "vee-validate";
import * as yup from 'yup';

import TextInput from "@/components/fields/TextInput.vue";
import {userAuthStore} from "@/stores/userState";

export default {
  components: {Form, TextInput},
  setup(){
    const authStore = userAuthStore();

    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
    });

    const initialValues = {
      email: authStore.userProfile.email,
      name: authStore.userProfile.full_name,
    };

    const onSubmit = async (values) => {
      await authStore.actionUpdateUserProfile(values);
    };

    return {
      initialValues,
      schema,
      onSubmit
    }
  }
}
</script>
