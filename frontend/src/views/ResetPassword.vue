<template>
  <h2>Reset Password</h2>
  <p>A password reset email will be sent to the registered account</p>

  <Form @submit="onSubmit" :validation-schema="schema">
    <TextInput
        name="email"
        type="email"
        label="email"
        placeholder="Your email"
    />
    <button>submit</button>
  </Form>
</template>

<script>
import {Form} from 'vee-validate';
import * as yup from 'yup';
import {useAuthStore} from '@/stores/useAuthStore';
import TextInput from '@/components/fields/TextInput.vue';

export default {
  name: 'resetPassword',
  components: {Form, TextInput},
  setup(props, context) {
    const authStore = useAuthStore();
    const schema = yup.object({email: yup.string().email().required()});
    const onSubmit = async (values) => {
      await authStore.resetPassword(values.email)
    };
    return {schema, onSubmit}
  }
}
</script>

<style scoped>
</style>
