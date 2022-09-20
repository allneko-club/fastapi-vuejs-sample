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
  <!--  <v-btn @click="back">back</v-btn>-->
</template>

<script>
import {useRoute} from "vue-router";
import {Form} from "vee-validate";
import * as yup from 'yup';

import {useAdminStore} from "@/stores/useAdminStore";
import TextInput from "@/components/fields/TextInput.vue";
import SingleCheckbox from "@/components/fields/SingleCheckbox.vue";
import router from "@/router";

export default {
  components: {Form, TextInput, SingleCheckbox},
  setup() {
    const store = useAdminStore();
    const route = useRoute();

    const userId = route.params.id;
    //todo getUserByIdは一覧ページで取得したデータから検索している。直接このページにアクセスした場合は、エラーが出そう
    const user = store.getUserById(userId);

    const schema = yup.object({
      name: yup.string(),
      email: yup.string(),
      isActive: yup.boolean(),
      isSuperuser: yup.boolean(),
      password1: yup.string(),
      password2: yup.string().oneOf([yup.ref('password1')], 'Passwords do not match'),
    });

    const initialValues = {
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      isSuperuser: user.is_superuser,
    };

    const onSubmit = async (values) => {
      const store = useAdminStore();
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
      await store.actionUpdateUser(userId, data);
      await router.push({name: 'admin-users'});
    }

    return {initialValues, schema, onSubmit}
  }
}
</script>

<style scoped>
</style>