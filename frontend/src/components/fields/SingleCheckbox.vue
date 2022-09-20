<template>
  <div>
    <label :for="name">{{ label }}</label>
    <Field :name="name" :id="name" :type="type" :value="value" :unchecked-value="uncheckedValue"
           :placeholder="placeholder"/>
    <ErrorMessage :name="name"/>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from 'vee-validate';

export default {
  components: {Field, Form, ErrorMessage},
  props: {
    type: {
      type: String,
      default: 'checkbox',
    },
    value: {
      type: Boolean,
      default: true,
    },
    uncheckedValue: {
      type: Boolean,
      default: false,
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

<style scoped>
</style>