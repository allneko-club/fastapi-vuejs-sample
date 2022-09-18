<script setup>
import {useRoute, useRouter} from "vue-router";
import {useForm} from "vee-validate";
import * as yup from 'yup';

import {userAuthStore} from "@/stores/userState";
import {adminStore} from "@/stores/adminStore";
const authStore = userAuthStore();
const route = useRoute();

const userId = route.params.id;
const user = authStore.getUserById(userId);
//todo userが存在しない場合404エラーか確認

const schema = yup.object({
  name: yup.string(),
  email: yup.string(),
  isActive: yup.boolean(),
  isSuperuser: yup.boolean(),
  password1: yup.string(),
  password2: yup.string(),
});

const formValues = {
  name: user.name,
  email: user.email,
  isActive: true,
  isSuperuser: false,
};


const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [name, email, isActive, isSuperuser, password1, password2] = useFieldModel([
    'name', 'email', 'isActive', 'isSuperuser','password1', 'password2']);

const onSubmit = handleSubmit((values) => {
  const store = adminStore();
  const data = {};
  if(values.name){
    data.full_name = values.name;
  }
  if(values.email){
    data.email = values.email;
 }
  if(values.isActive){
    data.isActive = values.isActive;
  }
  if(values.isSuperuser) {
    data.isSuperuser = values.isSuperuser;
  }
  if(values.password1 && values.password1 === values.password2) {
    data.password = values.password1;
  }
  store.actionUpdateUser(data);
});
</script>
<template>
  <h1>Update User</h1>

  <form @submit="onSubmit">
    <div>
      <label>name</label>
      <input v-model="name" name="name" />
      <span>{{ errors.name }}</span>
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
