<template>
  <div class="div-center">
    <div class="asset-container">
      <p class="title">Approve assets</p>

      <!-- Show all assets -->
      <div class="list-assets" v-if="assets">
        <div v-for="asset in assets" :key="asset">

          <form @submit="approveToken(asset)">
            <!-- Asset target investment-->
            <div class="asset" v-if="asset.interest > 0 && asset.state == 0">
              <p class="title-asset">Token {{asset.acronym}} ({{asset.name}})</p>
              <p class="info-asset" v-if="asset.interest > 0">Fixed interest rate of {{asset.interest}}% in {{asset.monthsDuration}} months</p>
              <p class="info-asset">{{asset.description}}</p>
              <p class="prize-asset">{{asset.totalSupply}} {{asset.acronym}}</p>
              <div class="item-asset">
                <div>Available tokens</div>
                <div>{{asset.availableSupply}} {{asset.acronym}}</div>
              </div>
              <div class="item-asset">
                <div>Minimum investment</div>
                <div>1 {{asset.acronym}}</div>
              </div>
              <div class="item-asset" v-if="asset.interest > 0">
                <div>Fixed interest</div>
                <div>{{asset.interest}}%</div>
              </div>
              <div class="item-asset" v-if="asset.interest > 0">
                <div>Type of payment</div>
                <div>{{asset.type_of_payment}}</div>
              </div>

              <!-- Separator -->
              <hr class="separator">
              
              <div class="item-asset">
                <div>Whitepaper</div>
                <div><a :href="this.API_URL+'/'+asset.whitepaper" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>
              <div class="item-asset">
                <div>Brochure</div>
                <div><a :href="this.API_URL+'/'+asset.brochure" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>
              <div class="item-asset">
                <div>Legacy documents</div>
                <div><a :href="this.API_URL+'/'+asset.legacy_docs" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>

              <!-- Handler tokens -->
              <input type="submit" value="APPROVE" class="buy_tokens">
              <input type="submit" value="DENY" class="add_token" @click="denyToken(asset)">
            </div>
          </form>

          <form @submit="approveToken(asset)">
            <!-- Asset target without investment-->
            <div class="asset-no-investment" v-if="asset.interest == 0 && asset.state == 0">
              <p class="title-asset">Token {{asset.acronym}} ({{asset.name}})</p>
              <p class="info-asset" v-if="asset.interest > 0">Fixed interest rate of {{asset.interest}}% in {{asset.monthsDuration}} months</p>
              <p class="info-asset">{{asset.description}}</p>
              <p class="prize-asset">{{asset.totalSupply}} {{asset.acronym}}</p>
              <div class="item-asset">
                <div>Available tokens</div>
                <div>{{asset.availableSupply}} {{asset.acronym}}</div>
              </div>
              <div class="item-asset">
                <div>Minimum investment</div>
                <div>1 {{asset.acronym}}</div>
              </div>
              <div class="item-asset" v-if="asset.interest > 0">
                <div>Fixed interest</div>
                <div>{{asset.interest}}%</div>
              </div>
              <div class="item-asset" v-if="asset.interest > 0">
                <div>Type of payment</div>
                <div>{{asset.type_of_payment}}</div>
              </div>

              <!-- Separator -->
              <hr class="separator">
              
              <div class="item-asset">
                <div>Whitepaper</div>
                <div><a :href="this.API_URL+'/'+asset.whitepaper" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>
              <div class="item-asset">
                <div>Brochure</div>
                <div><a :href="this.API_URL+'/'+asset.brochure" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>
              <div class="item-asset">
                <div>Legacy documents</div>
                <div><a :href="this.API_URL+'/'+asset.legacy_docs" target="_blank"><img src="../../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
              </div>

              <!-- Handler tokens -->
              <input type="submit" value="APPROVE" class="buy_tokens">
              <input type="submit" value="DENY" class="add_token" @click="denyToken(asset)">
            </div>
          </form>

        </div>
      </div>

      <!-- Messages -->
      <p v-if="errorMessage" class="error_message">{{errorMessage}}</p>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import BUSDTokenABI from '../../contracts/abi/BUSDToken.json'

export default {
  name: 'Approve Asset',
  data() {
    return {
      assets: [],
      errorMessage: '',
      API_URL: ''
    }
  },
  async created() {
    this.API_URL = process.env.VUE_APP_API_URL

    await this.axios.get('/assets', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      if (Object.keys(response.data).length == 0) {
        this.errorMessage = 'Non assets was deployed yet'
      } else {
        this.assets = response.data
      }
    })
    .catch(err => {
      this.errorMessage = 'Error occurred while loading assets. Please, refresh the page'
      console.log(err)
    })
  },
  methods: {
    async approveToken(asset) {
      console.log('approving token')
      await this.axios.post('/superadmin/approveAsset', {
        acronym: asset.acronym,
        state: 1
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },

    async denyToken(asset) {
      console.log('denying token')
      await this.axios.post('/superadmin/approveAsset', {
        acronym: asset.acronym,
        state: -1
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    },
  },

  computed: {
    ...mapGetters(['getUserAddress']),

    // Extract KYC State of user in session
    getKYCState() {
      let user = this.$store.state.user
      
      if (user != null)
        return user.KYCState

      return null
    },
  }
}
</script>

<style scoped>
.div-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.asset-container {
  width: 650px;
  margin-top: 100px;
  margin-left: 20px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.list-assets {
  width: 900px;
  column-count: 2;
  display: block;
  margin-bottom: 20px;
}

.list-assets .asset {
  width: 96%;
  height: auto;
  overflow: hidden;
  break-inside: avoid-column;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 16px;
  background-color: rgba(0, 0, 0, 0.07);
}

.list-assets .asset-no-investment {
  width: 96%;
  height: auto;
  overflow: hidden;
  break-inside: avoid-column;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 16px;
  background-color: rgb(220, 255, 209);
}

.title-asset {
  font-size: 23px;
  font-weight: bold;
  color: #B37A12;
}

.prize-asset {
  font-size: 23px;
}

.item-asset {
  display: flex;
  justify-content: space-between;
  color: #440A66;
}

.item-asset-balance {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  color: #440A66;
}

.separator {
  border-top: 3px solid #2c3e50;
  margin-top: 20px;
  margin-bottom: 20px;
}

.address-asset {
  width: 240px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.icons {
  width: 20px;
}

.icons:hover {
  cursor: pointer;
}

.icon-close {
    display: flex;
    float: right;
    width: 25px;
}

.icon-close:hover {
  cursor: pointer;
}

.error {
  position: absolute;
  width: 45%;
}

.link {
    font-size: 14px;
    text-decoration: none;
    color: #1835b8;
    transition: 0.3s;
}

.link:hover {
    cursor: pointer;
    color: #4f68d8;
}

.buy_tokens {
  display: flex;
  float: right;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: inherit;
  font-weight: inherit;
  background-color: #5f7400;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 10px;
  border-width: 1px;
  border-radius: 8px;
  transition: 0.3s;
}

.buy_tokens:hover {
    cursor: pointer;
    background-color: #a1bf1c;
}

.add_token {
  display: flex;
  float: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: inherit;
  font-weight: inherit;
  background-color: #9e0000;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 10px;
  border-width: 1px;
  border-radius: 8px;
  transition: 0.3s;
}

.add_token:hover {
  cursor: pointer;
  background-color: #f73a3a;
}

.background {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000044;
  z-index: 2;
}

.buyToken_container {
  position: fixed;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  z-index: 3;
}

.input-text {
    outline: none;
    padding: 7px;
    width: 96%;
    height: 30px;
    margin-top: 20px;
    background-color: #f1daff;
    border-width: 0px;
    border-radius: 7px;
}

.input-text:-webkit-autofill,
.input-text:-webkit-autofill:hover,
.input-text:-webkit-autofill:focus,
.input-text:-webkit-autofill:active,
.input-text::-webkit-outer-spin-button,
.input-text::-webkit-inner-spin-button {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-appearance: none;
  margin: 0;
}

.ammount {
  text-align: right;
  margin-bottom: -7px;
  cursor: default;
}

.successBuyingTokens {
  display: inline-block;
  color: #7100B3;
}

.pendingBuyingTokens {
  display: inline-block;
  color: #7100B3;
}

.errorBuyingTokens {
  display: inline-block;
  color: rgb(255, 43, 43);
}

</style>