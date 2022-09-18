<script setup>
import {useRouter} from "vue-router";
import {useForm} from "vee-validate";
import * as yup from 'yup';

import {userAuthStore} from "@/stores/userState";
const authStore = userAuthStore();

const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().required().email(),
});

const formValues = {
  email: authStore.userProfile.email,
  name: authStore.userProfile.full_name,
};

const { useFieldModel, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const [fullName, email] = useFieldModel(['fullName', 'email']);

const onSubmit = handleSubmit((values) => {
  const authStore = userAuthStore();
  const updatedProfile = {
    full_name: values.fullName,
    email: values.email,
  };
  authStore.actionUpdateUserProfile(updatedProfile);
});
</script>

<template>
  <h2>Edit User Profile</h2>

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
    <button>Submit</button>
  </form>
<!--  <button @click="back">back</button>-->

</template>

<script>
import {useRouter} from "vue-router";

export default {
  // setup(){
  //   const router = useRouter();
  //   const back = () => {router.back()}
  //   return {
  //     back
  //   }
  // }
}
</script>
