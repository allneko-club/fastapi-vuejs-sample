<script setup>
import {useRouter} from "vue-router";
import {useForm} from "vee-validate";
import * as yup from 'yup';

import {userAuthStore} from "@/stores/userState";
import {adminStore} from "@/stores/adminStore";
const authStore = userAuthStore();


const schema = yup.object({
  fullName: yup.string(),
  email: yup.string().required().email(),
  isActive: yup.boolean(),
  isSuperuser: yup.boolean(),
  password1: yup.string().required().label('password'),
  password2: yup.string().required().label('password (confirm)')
      .oneOf([yup.ref('password1')], 'Passwords do not match'),
});

const formValues = {
  isActive: true,
  isSuperuser: false,
};

const { errors, useFieldModel, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [fullName, email, isActive, isSuperuser, password1, password2] = useFieldModel([
    'fullName', 'email', 'isActive', 'isSuperuser','password1', 'password2']);

const onSubmit = handleSubmit((values) => {
  const store = adminStore();
  const data = {};
  data.full_name = values.fullName;
  data.email = values.email;
  data.isActive = values.isActive;
  data.isSuperuser = values.isSuperuser;
  data.password = values.password1;
  store.actionCreateUser(data);
  // todo リダイレクトしたいがなぜかrouterが読み込めない
  // const router = useRouter();
  // router.push('/main/account');
});
</script>
<template>
  <h1>Create User</h1>

  <form @submit="onSubmit">
    <div>
      <label>fullName</label>
      <input v-model="fullName" name="fullName" />
      <span>{{ errors.fullName }}</span>
    </div>
    <div>
      <label>email</label>
      <input v-model="email" name="email" type="email" />
      <span>{{ errors.email }}</span>
    </div>
    <div>
      <label></label>
      <input v-model="isActive" name="isActive" type="checkbox"/>
      <span>{{ errors.isActive }}</span>
    </div>
    <div>
      <label></label>
      <input v-model="isSuperuser" name="isSuperuser" type="checkbox"/>
      <span>{{ errors.isSuperuser }}</span>
    </div>
    <div>
      <label></label>
      <input v-model="password1" name="password1" type="password"/>
      <span>{{ errors.password1 }}</span>
    </div>
    <div>
      <label></label>
      <input v-model="password2" name="password2" type="password"/>
      <span>{{ errors.password2 }}</span>
    </div>
    <button>Save</button>
  </form>
<!--  <v-btn @click="back">back</v-btn>-->
</template>

<script>
export default {}
</script>
