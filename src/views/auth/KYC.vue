<template>
  <div class="div-center">
    <div class="KYC-auth-container">
      <p class="title">KYC authentication</p>

      <!-- Accordion for show users -->
      <div class="accordion" v-if="usersKYC">

        <!-- Titles -->
        <span><strong>Username</strong></span>
        <span><strong class="label-column2">Email</strong></span>

        <!-- Container with a for declaration -->
        <div class="container" v-for="userKYC in usersKYC" :key="userKYC">
          <hr>

          <!-- Label -->
          <div class="label">
            <span>{{userKYC.username}}</span>
            <span class="label-column2">{{userKYC.email}}</span>
            <span></span>
          </div>

          <!-- Content -->
          <div class="content">
            <span><strong>First name: </strong>{{userKYC.firstname}}</span><br>
            <span class="content-column2"><strong>Mobile:&nbsp;</strong>{{userKYC.mobileprefix}} {{userKYC.mobile}}</span>
            <span><strong>Last name: </strong>{{userKYC.lastname}}</span><br>
            <span class="content-column2"><strong>City:&nbsp;</strong>{{userKYC.city}}</span>
            <span><strong>Birthday: </strong>{{userKYC.birthday}}</span><br>
            <span class="content-column2"><strong>Country:&nbsp;</strong>{{userKYC.country}}</span>
            <span><strong>Address: </strong>{{userKYC.address}}, {{userKYC.postalcode}}</span><br>
            <span class="content-column2"><strong>Nationality:&nbsp;</strong>{{userKYC.nationality}}</span>
            <table class="table-content">
              <tr>
                <th><span>DNI obverse</span></th>
                <th><span>DNI reverse</span></th>
                <th><span>Selfie</span></th>
              </tr>
              <tr>
                <td><img :src="this.API_URL+'/'+userKYC.obverseDNI" class="images"></td>
                <td><img :src="this.API_URL+'/'+userKYC.reverseDNI" class="images"></td>
                <td><img :src="this.API_URL+'/'+userKYC.selfie" class="images"></td>
              </tr>
            </table>
            <button class="button-verify" @click="handleVerifyKYC(userKYC)">Verify KYC</button>
            <button class="button-deny" @click="handleDenyKYC(userKYC)">Deny KYC</button>
          </div>
        </div>
        <hr>
      </div>

      <p v-if="errorMessage" class="error">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KYC authentication',
  data() {
    return {
      usersKYC: [],
      errorMessage: '',
      API_URL: ''
    }
  },
  async created() {
    this.API_URL = process.env.VUE_APP_API_URL

    await this.axios.get('/superadmin/kycVerify', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.data.length == 0) {
          this.errorMessage = 'Non user had sent KYC Authentication'
        } else {
          this.usersKYC = response.data
        }
      })
      .catch(err => {
        this.errorMessage = 'Error occurred while loading users. Please, refresh the page'
        console.log(err)
      })
    
    const accordion = document.getElementsByClassName('label');

    for (let i = 0; i < accordion.length; i++)
    {
      accordion[i].addEventListener('click', function () {
        this.classList.toggle('active')
      })
    }
  },
  methods: {
    async handleVerifyKYC(user) {
      await this.axios.post('/superadmin/kycVerified', user, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('KYC verified\n'+response)
        }).catch(err => {
          console.log('Error occurred sending user\n'+err)
        })

      // Delete user from dynamic list
      this.usersKYC.splice(user, 1)
    },
    async handleDenyKYC(user) {
      await this.axios.post('/superadmin/kycDenied', user, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log('KYC denied\n'+response)
        }).catch(err => {
          console.log('Error occurred sending user\n'+err)
        })
      
      // Delete user from dynamic list
      this.usersKYC.splice(user, 1)
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

.KYC-auth-container {
  width: 650px;
  margin-top: 100px;
  margin-left: 20px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

span {
  font-size: 14px;
}

.accordion .container {
  width: 850px;
}

.accordion .label {
  cursor: pointer;
}

.accordion .label::before {
  content: '+';
  font-size: 30px;
  display: flex;
  float: right;
  margin-top: -11px;
}

.accordion .content {
  width: 850px;
  margin-top: 10px;
  transition: 0.5s;
  height: 0;
  overflow: hidden;
}

.accordion hr {
  width: 850px;
  margin-bottom: 15px;
}

.accordion .container .label.active ~ .content {
  height: 350px;
}

.accordion .container .label.active::before {
  content: '-';
  font-size: 40px;
  display: flex;
  float: right;
  margin-top: -19px;
  cursor: pointer;
}

.label-column2 {
  position: absolute;
  display: flex;
  margin-top: -18px;
  margin-left: 420px;
}

.content-column2 {
  position: relative;
  display: flex;
  margin-top: -18px;
  margin-left: 420px;
}

.table-content {
  width: 850px;
}

.images {
  width: 260px;
  height: 180px;
}

.button-verify {
    display: flex;
    float: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    background-color: #92B300; 
    padding: 6px;
    padding-right: 10px;
    padding-left: 10px;
    margin-right: 21px;
    margin-top: 14px;
    border-width: 1px;
    border-radius: 8px;
    transition: 0.3s;
}

.button-verify:hover {
    cursor: pointer;
    background-color: #a1bf1c;
}

.button-deny {
    display: flex;
    float: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    background-color: #dd0909; 
    padding: 6px;
    padding-right: 10px;
    padding-left: 10px;
    margin-right: 21px;
    margin-top: 14px;
    border-width: 1px;
    border-radius: 8px;
    transition: 0.3s;
}

.button-deny:hover {
    cursor: pointer;
    background-color: #f73a3a;
}

.error {
  position: absolute;
  width: 45%;
}
</style>