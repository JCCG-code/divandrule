<template>
  <div>
    <div class="div-center">
      <SettingsNav/>
    </div>
    <div class="div-center">
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <span>Username</span><br>
          <input type="text" class="input-text" :placeholder="getUser.username" v-model="username" required><br><br>
          <span>Email</span><br>
          <input type="text" class="input-text" :placeholder="getUser.email" v-model="email" required><br><br>
          <button class="input-submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsNav from '../../components/SettingsNav.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    SettingsNav
  },
  data() {
    return {
      username: '',
      email: ''
    }
  },
  methods: {
    async handleSubmit() {
      console.log(this.firstname)
      console.log(this.lastname)
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>
.div-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 650px;
  margin-top: 30px;
  margin-left: 20px;
}

.input-text {
  outline: none;
  padding: 7px;
  margin-top: 7px;
  margin-left: -4px;
  width: 100%;
  background-color: #f1d9ff;
  border-width: 0px;
  border-radius: 10px;
}

.input-text:-webkit-autofill,
.input-text:-webkit-autofill:hover,
.input-text:-webkit-autofill:focus,
.input-text:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

.input-submit {
    display: flex;
    float: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: inherit;
    font-weight: inherit;
    background-color: #92B300; 
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    border-width: 0px;
    border-radius: 13px;
    transition: 0.3s;
}

.input-submit:hover {
    cursor: pointer;
    background-color: #b5d620;
}
</style>