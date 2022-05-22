<template>
  <div class="div-center">
    <div class="asset-container">
      <p class="title">Assets</p>

      <!-- Show all assets -->
      <div class="list-assets" v-if="assets">
        <div v-for="asset in assets" :key="asset">

          <!-- Asset target investment-->
          <div class="asset" v-if="new Date(asset.dateFinish) > new Date(Date.now()) && asset.state == 2">
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
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.whitepaper" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>
            <div class="item-asset">
              <div>Brochure</div>
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.brochure" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>
            <div class="item-asset">
              <div>Legacy documents</div>
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.legacy_docs" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>

            <!-- Separator -->
            <hr class="separator">

            <div class="item-asset">
              <div>Token name</div>
              <div>{{asset.acronym}}</div>
            </div>
            <div class="item-asset">
              <div>Deployed</div>
              <div>{{('0'+new Date(asset.dateDeploy).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(asset.dateDeploy).getMonth()+1)).slice(-2)}}/{{new Date(asset.dateDeploy).getFullYear()}} {{('0'+parseInt(new Date(asset.dateDeploy).getHours()-1)).slice(-2)}}:{{('0'+new Date(asset.dateDeploy).getMinutes()).slice(-2)}}:{{('0'+new Date(asset.dateDeploy).getSeconds()).slice(-2)}}</div>
            </div>
            <div class="item-asset" v-if="asset.interest > 0">
              <div>Finish</div>
              <div>{{('0'+new Date(asset.dateFinish).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(asset.dateFinish).getMonth()+1)).slice(-2)}}/{{new Date(asset.dateFinish).getFullYear()}} {{('0'+parseInt(new Date(asset.dateFinish).getHours()-1)).slice(-2)}}:{{('0'+new Date(asset.dateFinish).getMinutes()).slice(-2)}}:{{('0'+new Date(asset.dateFinish).getSeconds()).slice(-2)}}</div>
            </div>
            <div class="item-asset">
              <div>Link</div>
              <div><a :href="'https://testnet.bscscan.com/token/'+asset.contractAddress" target="_blank" class="link">View in BscScan</a></div>
            </div>

            <!-- Handler tokens -->
            <div v-if="getKYCState == 2 && getUserAddress && asset.availableSupply > 0">
              <button class="add_token" @click="addTokenToWallet(asset)">ADD TOKEN</button>
              <button class="buy_tokens" @click="buyTokens(asset)">BUY TOKENS</button>
            </div>

          </div>

          <!-- Asset target without investment-->
          <div class="asset-no-investment" v-if="asset.interest == 0 && asset.state == 2">
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
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.whitepaper" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>
            <div class="item-asset">
              <div>Brochure</div>
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.brochure" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>
            <div class="item-asset">
              <div>Legacy documents</div>
              <div><a :href="'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api/'+asset.legacy_docs" target="_blank"><img src="../assets/download-icon.png" class="icons" alt="Download PDF"></a></div>
            </div>

            <!-- Separator -->
            <hr class="separator">

            <div class="item-asset">
              <div>Token name</div>
              <div>{{asset.acronym}}</div>
            </div>
            <div class="item-asset">
              <div>Deployed</div>
              <div>{{('0'+new Date(asset.dateDeploy).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(asset.dateDeploy).getMonth()+1)).slice(-2)}}/{{new Date(asset.dateDeploy).getFullYear()}} {{('0'+parseInt(new Date(asset.dateDeploy).getHours()-1)).slice(-2)}}:{{('0'+new Date(asset.dateDeploy).getMinutes()).slice(-2)}}:{{('0'+new Date(asset.dateDeploy).getSeconds()).slice(-2)}}</div>
            </div>
            <div class="item-asset" v-if="asset.interest > 0">
              <div>Finish</div>
              <div>{{('0'+new Date(asset.dateFinish).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(asset.dateFinish).getMonth()+1)).slice(-2)}}/{{new Date(asset.dateFinish).getFullYear()}} {{('0'+parseInt(new Date(asset.dateFinish).getHours()-1)).slice(-2)}}:{{('0'+new Date(asset.dateFinish).getMinutes()).slice(-2)}}:{{('0'+new Date(asset.dateFinish).getSeconds()).slice(-2)}}</div>
            </div>
            <div class="item-asset">
              <div>Link</div>
              <div><a :href="'https://testnet.bscscan.com/token/'+asset.contractAddress" target="_blank" class="link">View in BscScan</a></div>
            </div>

            <!-- Handler tokens -->
            <div v-if="getKYCState == 2 && getUserAddress && asset.availableSupply > 0">
              <button class="add_token" @click="addTokenToWallet(asset)">ADD TOKEN</button>
              <button class="buy_tokens" @click="buyTokens(asset)">BUY TOKENS</button>
            </div>

          </div>

        </div>
      </div>
      <p v-if="errorMessage" class="error">{{errorMessage}}</p>
    </div>

    <!-- Buy token -->
    <div class="background" v-if="buyTokenModule == true">
      <div class="buyToken_container">
        <img src="../assets/close-icon.png" class="icon-close" @click="closeBuyTokenModule">
        <p class="title-asset" v-text="tokenTitle"></p>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" autocomplete="off">
          <p class="errorBuyingTokens" v-if="errorBuyingTokens">{{errorBuyingTokens}}</p>
          <p class="pendingBuyingTokens" v-if="pendingBuyingTokens">{{pendingBuyingTokens}}</p>
          <p class="successBuyingTokens" v-if="successBuyingTokens">{{successBuyingTokens}}</p>
          <div class="item-asset-balance">
            <div>Available tokens:</div>
            <div><strong>{{availableTokens}} {{tokenAcronym}}</strong></div>
          </div>
          <div class="item-asset-balance">
            <div>Your balance:</div>
            <div><strong>{{currentTokens}} {{tokenAcronym}}</strong></div>
          </div>
          <input type="number" class="input-text" v-model="numberTokens" step="any"><br><br>

          <button class="buy_tokens">Buy tokens</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBalanceByToken, buyTokensByContract } from '../libs/UtilsContract'
// import BUSDTokenABI from '../../contracts/abi/BUSDToken.json'

export default {
  name: 'Assets',
  data() {
    return {
      assets: [],
      buyTokenModule: false,
      tokenTitle: '',
      tokenAcronym: '',
      contractAddress: '',
      numberTokens: null,
      currentTokens: null,
      availableTokens: null,
      errorMessage: '',
      pendingBuyingTokens: '',
      successBuyingTokens: '',
      errorBuyingTokens: ''
    }
  },
  async created() {
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

    // Add new token to wallet
    async addTokenToWallet(asset) {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: asset.contractAddress,
            symbol: asset.acronym,
            decimals: 18,
          }
        }
      }).then(success => {
        if (success) {
          console.log('Token added to wallet successfully!')
        } else {
          console.log('Something went wrong adding token to wallet')
        }
      }).catch(console.error)
    },

    buyTokens(asset) {
      this.buyTokenModule = true
      this.currentTokens = 'Loading tokens...'
      this.tokenAcronym = ''
      this.availableTokens = ''

      this.tokenTitle = 'Token ' + asset.acronym + ' (' + asset.name + ')'
      this.contractAddress = asset.contractAddress

      let userAddress = this.$store.state.userAddress

      getBalanceByToken(asset.contractAddress, userAddress).then(res => {
        this.currentTokens = res
        this.tokenAcronym = asset.acronym
        this.availableTokens = asset.availableSupply
      })
    },

    closeBuyTokenModule() {
      this.buyTokenModule = false
      this.errorBuyingTokens = ''
      this.pendingBuyingTokens = ''
      this.successBuyingTokens = ''
    },

    handleSubmit() {
      this.pendingBuyingTokens = 'Buying tokens. Please wait a few seconds...'
      this.successBuyingTokens = ''
      this.errorBuyingTokens = ''

      if (this.numberTokens >= 1 && this.availableTokens >= this.numberTokens) {
        buyTokensByContract(this.contractAddress, this.numberTokens).then(async res => {
          if (res.message) {
            this.pendingBuyingTokens = ''
            this.errorBuyingTokens = res.message
          }
          else {
            let provider = this.$store.state.web3Provider
            let dateTransaction = await provider.eth.getBlock(res.blockNumber)
            let dateFormat = new Date(dateTransaction.timestamp * 1000)

            // Register transacction in database
            await this.axios.post('/assets/buyTokens', {
              username: this.$store.state.user.username,
              investor: this.$store.state.userAddress,
              contractAddress: this.contractAddress,
              numberTokens: this.numberTokens,
              tokensUser: parseFloat(this.numberTokens) + parseFloat(this.currentTokens),
              dateTransaction: dateFormat
            }, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            }).then(() => {
              this.pendingBuyingTokens = ''
              this.errorBuyingTokens = ''
              this.successBuyingTokens = this.numberTokens + ' tokens was bought successfully!'
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
      } else {
        this.errorBuyingTokens = 'Amount insufficient or unavailable tokens'
      }
    }
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
  background-color: #7100B3;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 10px;
  border-width: 0px;
  border-radius: 8px;
  transition: 0.3s;
}

.buy_tokens:hover {
    cursor: pointer;
    background-color: #8e5bac;
}

.add_token {
  display: flex;
  float: left;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: inherit;
  font-weight: inherit;
  background-color: #1835b8;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-top: 10px;
  border-width: 0px;
  border-radius: 8px;
  transition: 0.3s;
}

.add_token:hover {
  cursor: pointer;
  background-color: #4f68d8;
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