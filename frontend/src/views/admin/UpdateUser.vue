<template>
  <h1>Update User</h1>

  <Form @submit="onSubmit" :initial-values="initialValues" :validation-schema="schema">
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
  </form>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {Form} from 'vee-validate';
import * as yup from 'yup';

import {useAdminStore} from '@/stores/useAdminStore';
import TextInput from '@/components/fields/TextInput.vue';
import SingleCheckbox from '@/components/fields/SingleCheckbox.vue';
import router from '@/router';

export default {
  components: {Form, TextInput, SingleCheckbox},
  setup(props, context) {
    const adminStore = useAdminStore();
    const route = useRoute();
    const userId = ref(route.params.id);
    const user = ref(null);
    const initialValues = ref({});

    const getUser = async () => {
      //todo getUserByIdは一覧ページで取得したデータから検索していため直接このページにアクセスした場合は、エラーが出そう
      user.value = await adminStore.getUserById(userId.value);
      initialValues.value = {
        name: user.value.name,
        email: user.value.email,
        isActive: user.value.is_active,
        isSuperuser: user.value.is_superuser,
      };
    }

    onMounted(getUser)

    const schema = yup.object({
      name: yup.string(),
      email: yup.string(),
      isActive: yup.boolean(),
      isSuperuser: yup.boolean(),
      password1: yup.string().label('password'),
      password2: yup.string().label('password (confirm)')
          .oneOf([yup.ref('password1')], 'Passwords do not match'),
    });

    const onSubmit = async (values) => {
      const data = {};
      if (values.name) {
        data.name = values.name;
      }
      if (values.email) {
        data.email = values.email;
      }
      data.is_active = values.isActive;
      data.is_superuser = values.isSuperuser;
      if (values.password1) {
        data.password = values.password1;
      }
      await adminStore.updateUser(userId, data);
      await router.push({name: 'admin-users'});
    }

    return {initialValues, schema, onSubmit}
  }
}
</script>

<style scoped>
</style>