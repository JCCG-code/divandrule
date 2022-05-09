<template>
  <div>
    <div class="div-center">
      <SettingsNav/>
    </div>
    <div class="div-center">
      <div v-if="getKYCState == 1" class="checking-kyc-message">
        <p>Checking KCY authentication. Please wait.</p>
        <img src="../../assets/time-icon.png" class="icon-verified2" alt="KYC Verified">
      </div>
      <div v-else-if="getKYCState == 2" class="success-message">
        <p>KYC authentication was completed!</p>
        <img src="../../assets/verified2-kyc.png" class="icon-verified2" alt="KYC Verified">
      </div>
      <div v-else class="form-container">
        <form @submit="handleSubmit" enctype="multipart/form-data">
            <table style="width: 100%;">
              <tr>
                <td>
                  <span>First name</span><br>
                  <input type="text" class="input-text" v-model="firstname" required><br>
                </td>
                <td>
                  <span>Postal code</span><br>
                  <input type="number" class="input-text" v-model="postalcode" required><br>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Last name</span><br>
                  <input type="text" class="input-text" v-model="lastname" required><br>
                </td>
                <td>
                  <span>Address</span><br>
                  <input type="text" class="input-text" v-model="address" required><br>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Birthday</span><br>
                  <input type="date" class="input-text" v-model="birthday" required><br>
                </td>
                <td>
                  <span>Nationality</span><br>
                  <input type="text" class="input-text" v-model="nationality" required><br>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Prefix</span><span style="margin-left: 30px;">Mobile</span><br>
                  <input type="text" class="input-text-prefix" v-model="mobileprefix" required><input type="number" class="input-text-mobile" v-model="mobile" required><br>
                </td>
                <td>
                  <span>DNI obverse photo</span><br>
                  <input type="file" class="input-text" @change="onFileSelected1" name="obverseDNI" required><br>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Country</span><br>
                  <input type="text" class="input-text" v-model="country" required><br>
                </td>
                <td>
                  <span>DNI reverse photo</span><br>
                  <input type="file" class="input-text" @change="onFileSelected2" name="reverseDNI" required><br>
                </td>
              </tr>
              <tr>
                <td>
                  <span>City</span><br>
                  <input type="text" class="input-text" v-model="city" required><br>
                </td>
                <td>
                  <span>Selfie photo</span><br>
                  <input type="file" class="input-text" @change="onFileSelected3" name="selfie" required><br>
                </td>
              </tr>
            </table>
            <button class="input-submit">Submit</button>
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
      firstname: '',
      lastname: '',
      birthday: '',
      mobileprefix: '',
      mobile: null,
      country: '',
      city: '',
      postalcode: null,
      address: '',
      nationality: '',
      obverseDNI: '',
      reverseDNI: '',
      selfie: ''
    }
  },
  methods: {
    async handleSubmit() {
      let formData = new FormData()
      formData.append('username', this.$store.state.user.username)
      formData.append('email', this.$store.state.user.email)
      formData.append('firstname', this.firstname)
      formData.append('lastname', this.lastname)
      formData.append('birthday', this.birthday)
      formData.append('mobileprefix', this.mobileprefix)
      formData.append('mobile', this.mobile)
      formData.append('country', this.country)
      formData.append('city', this.city)
      formData.append('postalcode', this.postalcode)
      formData.append('address', this.address)
      formData.append('nationality', this.nationality)
      formData.append('obverseDNI', this.obverseDNI, this.obverseDNI.name)
      formData.append('reverseDNI', this.reverseDNI, this.reverseDNI.name)
      formData.append('selfie', this.selfie, this.selfie.name)

      await this.axios.post('/user/kyc', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
          this.$store.dispatch('loadUser', response.data)
          this.$forceUpdate()
        })
        .catch(err => {
          console.log('Error occurred during kyc authentication\n'+err)
        })
    },
    onFileSelected1(e) {
      this.obverseDNI = e.target.files[0]
    },
    onFileSelected2(e) {
      this.reverseDNI = e.target.files[0]
    },
    onFileSelected3(e) {
      this.selfie = e.target.files[0]
    },
  },
  computed: {
    ...mapGetters(['getUser']),
    
    // Extract KYC State of user in session
    getKYCState() {
      let user = this.$store.state.user
      
      if (user != null)
        return user.KYCState

      return null
    }
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
  width: 95%;
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
    margin-top: 10px;
    border-width: 0px;
    border-radius: 13px;
    transition: 0.3s;
}

.input-submit:hover {
    cursor: pointer;
    background-color: #b5d620;
}

.input-text-prefix {
  outline: none;
  padding: 7px;
  margin-top: 7px;
  margin-left: -4px;
  margin-right: 5px;
  width: 55px;
  background-color: #f1d9ff;
  border-width: 0px;
  border-radius: 10px;
}
.input-text-prefix:-webkit-autofill,
.input-text-prefix:-webkit-autofill:hover,
.input-text-prefix:-webkit-autofill:focus,
.input-text-prefix:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

.input-text-mobile {
  outline: none;
  padding: 7px;
  margin-top: 7px;
  width: 225px;
  background-color: #f1d9ff;
  border-width: 0px;
  border-radius: 10px;
}
.input-text-mobile:-webkit-autofill,
.input-text-mobile:-webkit-autofill:hover,
.input-text-mobile:-webkit-autofill:focus,
.input-text-mobile:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

.success-message {
  position: absolute;
  margin-top: 750px;
  font-weight: 500;
  font-size: 20px;
  color: green;
}

.checking-kyc-message {
  position: absolute;
  margin-top: 750px;
  font-weight: 500;
  font-size: 20px;
}

.icon-verified2 {
  position: absolute;
  opacity: 0.2;
  width: 300px;
  margin-top: -360px;
  margin-left: -40px;
}
</style>