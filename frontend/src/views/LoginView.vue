<template>
    <div id="login">
        <h1>Login</h1>
        <div class="form-inputs">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="input.username" placeholder="Username" />
        </div>
        <div class="form-inputs">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
        </div>
        <button type="button" v-on:click="submit()">Login</button>
    </div>
</template>

<script>
import {userAuthStore} from "@/stores/userState";

export default {
    name: 'Login',
    data() {
      return {
        input: {
          username: "",
          password: ""
        },
      }
    },
    methods: {
        submit() {
            if(this.input.username !== "" && this.input.password !== "") {
              const userAuth = userAuthStore();
              userAuth.actionLogIn(this.input.username, this.input.password);
            } else {
              console.log("A username and password must be present");
            }
        }
    }
}
</script>

<style>
#login .form-inputs {
    padding-bottom: 10px;
}
#login .form-inputs label {
    padding-right: 10px;
}
</style>