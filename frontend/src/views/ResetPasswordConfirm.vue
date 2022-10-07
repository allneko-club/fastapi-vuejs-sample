<template>
  <h2>Reset Password</h2>

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
    <button>Submit</button>
  </Form>
</template>

<script>
import {Form} from 'vee-validate';
import * as yup from 'yup';
import {useAuthStore} from '@/stores/useAuthStore';
import TextInput from '@/components/fields/TextInput.vue';
import {useRoute} from 'vue-router';

export default {
  name: 'resetPasswordConfirm',
  components: {Form, TextInput},
  setup(props, context) {
    const authStore = useAuthStore();
    const route = useRoute();
    const token = route.query.token;
    const schema = yup.object({
      password1: yup.string().required(),
      password2: yup.string().required().label('password (confirm)').label('password')
          .oneOf([yup.ref('password1')], 'Passwords do not match'),
    });
    const onSubmit = async (values) => {
      await authStore.resetPasswordConfirm(values.password1, token)
    };
    return {schema, onSubmit}
  }
}
</script>

<style scoped>
</style>
