<template>
  <div>
    <div class="div-center">
      <SettingsNav/>
    </div>
    <div class="div-center">
      <div class="form-container">
        <form>
          <span>Current password</span><br>
          <input type="password" class="input-text" name="username"><br><br>
          <span>New password</span><br>
          <input type="password" class="input-text" name="password"><br><br>
          <span>Repeat new password</span><br>
          <input type="password" class="input-text" name="password"><br><br>
          <input type="submit" value="Update" class="input-submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SettingsNav from '../../components/SettingsNav.vue'

export default {
  components: {
    SettingsNav
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