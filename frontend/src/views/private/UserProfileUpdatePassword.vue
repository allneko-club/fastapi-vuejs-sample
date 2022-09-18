<script setup>
import {useForm} from "vee-validate";
import * as yup from 'yup';

import {userAuthStore} from "@/stores/userState";

const schema = yup.object({
  password1: yup.string().required(),
  password2: yup.string().required(),
});

const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const [password1, password2] = useFieldModel(['password1', 'password2']);

const onSubmit = handleSubmit((values) => {
  const authStore = userAuthStore();
  const updatedProfile = {};
  updatedProfile.password = values.password1;
  authStore.actionUpdateUserProfile(updatedProfile);
});
</script>

<template>
  <h5>change password</h5>
  <p>Enter your new password below</p>

  <form @submit="onSubmit">
    <div>
      <label>password</label>
      <input v-model="password1" name="password1" type="password" />
      <span>{{ errors.password1 }}</span>
    </div>
    <div>
      <label>password (check)</label>
      <input v-model="password2" name="password2" type="password" />
      <span>{{ errors.password2 }}</span>
    </div>
    <button>Change Password</button>
  </form>

</template>

<script>
export default {}
</script>
