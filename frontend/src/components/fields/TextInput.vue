<template>
  <div>
    <label :for="name">{{ label }}</label>
    <Field :name="name" :id="name" :type="type" :value="value" :placeholder="placeholder"/>
    <ErrorMessage  :name="name" />
  </div>
</template>

<script>
import {Field, ErrorMessage, Form} from 'vee-validate';

export default {
  components: {Field, Form, ErrorMessage},
  props: {
    type: {
      type: String,
      default: 'checkbox',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}

</script>
