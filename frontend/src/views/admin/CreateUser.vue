<template>
  <h1>Create User</h1>

  <Form @submit="onSubmit" :validation-schema="schema">
    <TextInput
        name="name"
        type="text"
        label="name"
    />
    <TextInput
        name="email"
        type="email"
        label="email"
    />
    <SingleCheckbox
        name="isActive"
        type="checkbox"
        label="isActive"
    />
    <SingleCheckbox
        name="isSuperuser"
        type="checkbox"
        label="isSuperuser"
    />
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
    <button>Save</button>
  </Form>
</template>

<script>
import {Form} from 'vee-validate';
import * as yup from 'yup';
import {useAdminStore} from '@/stores/useAdminStore';
import TextInput from '@/components/fields/TextInput.vue';
import SingleCheckbox from '@/components/fields/SingleCheckbox.vue';
import router from '@/router';

export default {
  components: {Form, TextInput, SingleCheckbox},
  setup(props, context) {
    const schema = yup.object({
      name: yup.string(),
      email: yup.string().required().email(),
      isActive: yup.boolean(),
      isSuperuser: yup.boolean(),
      password1: yup.string().required().label('password'),
      password2: yup.string().required().label('password (confirm)')
          .oneOf([yup.ref('password1')], 'Passwords do not match'),
    });

    const onSubmit = async (values) => {
      const store = useAdminStore();
      const data = {};
      data.name = values.name;
      data.email = values.email;
      data.is_active = values.isActive;
      data.is_superuser = values.isSuperuser;
      data.password = values.password1;
      await store.createUser(data);
      await router.push({name: 'admin-users'});
    };

    return {schema, onSubmit}
  }
}
</script>

<style scoped>
</style>