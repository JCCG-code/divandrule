<template>
    <div class="div-center">
        <div class="newAsset-container">
            <p class="title">Create new asset</p>

            <!-- Form new asset container -->
            <div class="form-container">
              <form @submit.prevent="handleSubmit">
                <span>Name</span><br>
                <input type="text" class="input-text" v-model="assetName" required><br><br>
                <span>Description</span><br>
                <input type="text" class="input-text" v-model="assetDescription" required><br><br>
                <span>Acronym</span><br>
                <input type="text" class="input-text" v-model="acronym" required><br><br>
                <span>Type of payment</span><br>
                <input type="radio" class="input-radio" id="Monthly" ref="Monthly" v-model="type_of_payment" value="monthly"><span class="payment">Monthly</span><br>
                <input type="radio" class="input-radio" id="Quarterly" v-model="type_of_payment" value="quarterly"><span class="payment">Quarterly</span><br>
                <input type="radio" class="input-radio" id="Biannual" v-model="type_of_payment" value="biannual"><span class="payment">Biannual</span><br>
                <input type="radio" class="input-radio" id="Annual" v-model="type_of_payment" value="annual"><span class="payment">Annual</span><br>
                <input type="radio" class="input-radio" id="AtTheEnd" v-model="type_of_payment" value="at the end"><span class="payment">At the end</span><br>
                <input type="radio" class="input-radio" id="NotRequired" v-model="type_of_payment" value="notrequired"><span class="payment">Not required</span><br><br>
                
                <div v-if="type_of_payment == 'monthly' || type_of_payment == 'quarterly' || type_of_payment == 'biannual' || type_of_payment == 'annual' || type_of_payment == 'at the end'">
                  <span>Fixed interest (%) in {{duration_months || '?'}} months</span><br>
                  <input type="number" step="any" class="input-text" v-model="interest"><br><br>
                  <span>Duration</span><br>
                  <div class="duration">
                    <span>Months</span><input type="number" min="1" step="1" class="input-text-months" v-model="duration_months">
                  </div><br>
                </div>
                
                <span>Total supply</span><br>
                <input type="number" class="input-text" v-model="totalSupply" required><br><br>
                <span>Whitepaper</span><br>
                <input type="file" class="input-text" @change="onFileSelected1" name="whitepaper" required><br><br>
                <span>Brochure</span><br>
                <input type="file" class="input-text" @change="onFileSelected2" name="brochure" required><br><br>
                <span>Legacy documents</span><br>
                <input type="file" class="input-text" @change="onFileSelected3" name="legacy_docs" required><br><br>

                <!-- Messages -->
                <p v-if="errorMessage" class="error_message">{{errorMessage}}</p>
                <p v-if="successMessage" class="success_message">
                  {{successMessage}}
                  <!-- <a :href="'https://testnet.bscscan.com/token/'+contractAddress" target="_blank" class="link">View in BscScan</a> -->
                </p>
                <p v-if="pendingMessage" class="pending_message">{{pendingMessage}}</p>
                
                <button class="input-submit">Create</button>
              </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'New Asset',
  data() {
    return {
      assetName: '',
      assetDescription: '',
      acronym: '',
      type_of_payment: '',
      interest: 0,
      duration_months: null,
      totalSupply: null,
      whitepaper: '',
      brochure: '',
      legacy_docs: '',
      contractAddress: '',
      errorMessage: '',
      successMessage: '',
      pendingMessage: ''
    }
  },

  methods: {
    async handleSubmit() {
      if (this.$store.state.networkId == 97) {

        // Show pending message
        this.errorMessage = ''
        this.successMessage = ''
        this.pendingMessage = 'Sending contract. Please wait a few seconds...'

        // Change interest
        if (this.type_of_payment == 'notrequired')
        {
          this.interest = 0
          this.duration_months = 0
        }

        // Save new asset
        let formData = new FormData()
        formData.append('username', this.$store.state.user.username)
        formData.append('assetName', this.assetName)
        formData.append('assetDescription', this.assetDescription)
        formData.append('acronym', this.acronym)
        formData.append('type_of_payment', this.type_of_payment)
        formData.append('interest', this.interest)
        formData.append('monthsDuration', this.duration_months)
        formData.append('totalSupply', this.totalSupply)
        formData.append('whitepaper', this.whitepaper, this.whitepaper.name)
        formData.append('brochure', this.brochure, this.brochure.name)
        formData.append('legacy_docs', this.legacy_docs, this.legacy_docs.name)
        formData.append('state', 0)

        await this.axios.post('/assets/newAsset', formData, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }).then(() => {
          // Delete pending message and show success message
          this.pendingMessage = ''
          this.successMessage = 'Asset was sent. Waiting superadmin verification.'
        }).catch(err => {
            console.log('Error occurred creating new asset\n'+err)
        })
      }
      else {
        this.errorMessage = 'You need to use BSC-testnet to deploy the asset'
      }
    },
    onFileSelected1(e) {
      this.whitepaper = e.target.files[0]
    },
    onFileSelected2(e) {
      this.brochure = e.target.files[0]
    },
    onFileSelected3(e) {
      this.legacy_docs = e.target.files[0]
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

.newAsset-container {
  width: 650px;
  margin-top: 100px;
  margin-left: 20px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.form-container {
  width: 850px;
  margin-top: 30px;
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

.input-text-years {
  outline: none;
  padding: 7px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
  background-color: #f1d9ff;
  border-width: 0px;
  border-radius: 10px;
}

.input-text-years:-webkit-autofill,
.input-text-years:-webkit-autofill:hover,
.input-text-years:-webkit-autofill:focus,
.input-text-years:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

.input-text-months {
  outline: none;
  padding: 7px;
  margin-top: 7px;
  margin-left: 10px;
  width: 150px;
  background-color: #f1d9ff;
  border-width: 0px;
  border-radius: 10px;
}

.input-text-months:-webkit-autofill,
.input-text-months:-webkit-autofill:hover,
.input-text-months:-webkit-autofill:focus,
.input-text-months:-webkit-autofill:active {
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
  margin-bottom: 50px;
  border-width: 0px;
  border-radius: 13px;
  transition: 0.3s;
}

.input-submit:hover {
    cursor: pointer;
    background-color: #b5d620;
}

.payment {
  display: inline-block;
  margin-top: 8px;
  margin-left: 10px;
}

.error_message {
  position: absolute;
  color: rgb(255, 43, 43);
}

.success_message {
  position: absolute;
  color: #7100B3;
}

.pending_message {
  position: absolute;
  color: #7100B3;
}

.link {
  font-size: 15px;
  text-decoration: none;
  color: #1835b8;
  transition: 0.3s;
}

.link:hover {
  cursor: pointer;
  color: #4f68d8;
}
</style>