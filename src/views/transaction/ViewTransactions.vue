<template>
    <div class="div-center">
        <div class="transactions-container">

            <!-- Title -->
            <p class="title">Your investments</p>

            <!-- Data wallet -->
            <div v-if="getUserAddress" class="dataWallet">
                <div><strong>Your wallet</strong></div>
                <div><a :href="'https://testnet.bscscan.com/address/'+getUserAddress" class="link" target="_blank">{{getUserAddress}}</a></div>
            </div>

            <!-- Show all transactions -->
            <div class="list-transactions" v-if="transactions">
                <div v-for="transaction in transactions" :key="transaction">

                    <!-- Transaction target -->
                    <div class="transaction-byUser" v-if="doneByUserInSession(transaction)">
                        
                        <!-- Testing -->
                        <div style="font-size: 12px;" v-if="transaction.dateTransactionTest != transaction.dateRegister">
                            Date transaction test: {{('0'+new Date(transaction.dateTransactionTest).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(transaction.dateTransactionTest).getMonth()+1)).slice(-2)}}/{{new Date(transaction.dateTransactionTest).getFullYear()}} {{('0'+parseInt(new Date(transaction.dateTransactionTest).getHours()-1)).slice(-2)}}:{{('0'+new Date(transaction.dateTransactionTest).getMinutes()).slice(-2)}}:{{('0'+new Date(transaction.dateTransactionTest).getSeconds()).slice(-2)}}<br>
                            Date now test: {{('0'+new Date(transaction.dateNowTest).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(transaction.dateNowTest).getMonth()+1)).slice(-2)}}/{{new Date(transaction.dateNowTest).getFullYear()}} {{('0'+parseInt(new Date(transaction.dateNowTest).getHours()-1)).slice(-2)}}:{{('0'+new Date(transaction.dateNowTest).getMinutes()).slice(-2)}}:{{('0'+new Date(transaction.dateNowTest).getSeconds()).slice(-2)}}
                        </div>
                        
                        <div class="titleContract">
                            {{transaction.tokenTitle}}
                        </div>
                        <div class="amount">
                            <strong>Inv.</strong> {{transaction.numberTokens}} tokens
                        </div>
                        <div class="dateInvestment">
                            <strong>in</strong> {{('0'+new Date(transaction.dateRegister).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(transaction.dateRegister).getMonth()+1)).slice(-2)}}/{{new Date(transaction.dateRegister).getFullYear()}} <strong>at</strong> {{('0'+parseInt(new Date(transaction.dateRegister).getHours()-1)).slice(-2)}}:{{('0'+new Date(transaction.dateRegister).getMinutes()).slice(-2)}}:{{('0'+new Date(transaction.dateRegister).getSeconds()).slice(-2)}}
                        </div>
                        <div class="datesClaim">
                            <div v-for="dateClaim in transaction.datesClaim" :key="dateClaim">

                                <div class="dateForClaim" v-if="dateClaim.isClaim != '-'">
                                    <strong>Month {{dateClaim.nMonth}}</strong> {{('0'+new Date(dateClaim.date).getDate()).slice(-2)}}/{{('0'+parseInt(new Date(dateClaim.date).getMonth()+1)).slice(-2)}}/{{new Date(dateClaim.date).getFullYear()}} {{('0'+parseInt(new Date(dateClaim.date).getHours()-1)).slice(-2)}}:{{('0'+new Date(dateClaim.date).getMinutes()).slice(-2)}}:{{('0'+new Date(dateClaim.date).getSeconds()).slice(-2)}}
                                    <span class="span-soon" v-if="dateClaim.isClaim == 'Soon'">
                                        {{dateClaim.isClaim}}
                                    </span>
                                    <span class="span-claim" v-else>
                                        {{dateClaim.isClaim}}
                                    </span>
                                </div>
                            </div>
                        </div>                        
                        <div class="claimAmount" v-if="transaction.claimAmount > 0">
                            <button class="input-submit" @click="claimAmount(transaction)">Claim <strong>{{transaction.claimAmount}}</strong> {{transaction.acronymToken}}</button>
                        </div>
                        <div class="claimAmount" v-else>
                            <button class="input-submit-else">Unavailable</button>
                        </div>
                    </div>
                </div>

                <!-- General messages -->
                <p v-if="errorMessage" class="errorMessage">{{errorMessage}}</p>
                <p v-if="pendingMessage" class="pendingMessage">{{pendingMessage}}</p>
                <p v-if="successMessage" class="successMessage">{{successMessage}}</p>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { claimTokensByContract } from '../../libs/UtilsContract'

export default {
    name: 'View Transactions',
    data() {
        return {
            transactions: [],
            errorMessage: '',
            pendingMessage: '',
            successMessage: ''
        }
    },
    async created() {
        await this.axios.get('/transactions', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            }).then(response => {
                if (Object.keys(response.data).length == 0) {
                    this.errorMessage = 'You have not done any investment.'
                } else {
                    this.transactions = response.data
                }
            
            }).catch(err => {
                this.errorMessage = 'Error occurred while loading transactions. Please, refresh the page'
                console.log(err)
            })
    },
    methods: {
        doneByUserInSession(transaction) {
            if (transaction.interestToken > 0 && this.$store.state.userAddress != null)
                if (transaction.investor.toUpperCase() == this.$store.state.userAddress.toUpperCase())
                    return true
            
            return false
        },
        claimAmount(transaction) {
            this.pendingMessage = 'Claiming tokens. Please wait a few seconds...'
            this.errorMessage = ''
            this.successMessage = ''

            claimTokensByContract(transaction.contractAddress, transaction.claimAmount).then(async res => {
                if (res.message) {
                    this.errorMessage = 'Claim tokens was rejected by user'
                    this.pendingMessage = ''
                    this.successMessage = ''
                }
                else
                {
                    await this.axios.post('/assets/claimTokens', transaction, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(() => {
                        this.errorMessage = ''
                        this.pendingMessage = ''
                        this.successMessage = 'Tokens were claimed successfully!. Please refresh the page'
                        
                    }).catch(err => {
                        this.errorMessage = 'Error occurred while claiming user\'s tokens'
                        console.log(err.message)
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters(['getUserAddress']),
    }
}
</script>

<style scoped>
.div-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.transactions-container {
  width: 650px;
  margin-top: 100px;
  margin-left: 20px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.dataWallet {
    width: 867px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color:  #1835b82f;
    border-radius: 15px;
    margin-bottom: 10px;
}

.link {
    text-decoration: none;
    color: #1835b8;
    cursor: pointer;
}

.list-transactions {
  width: 900px;
  display: block;
  margin-bottom: 20px;
}

.list-transactions .transaction-byUser {
  height: auto;
  border-bottom: solid 2px #1835b8;
  border-radius: 10px;
  padding: 10px;
  padding-top: 10px;
}

.list-transactions .transaction-byUser .titleContract {
    text-align: center;
    font-weight: bold;
    color: #B37A12;
    font-size: 14px;
}

.list-transactions .transaction-byUser .amount {
    text-align: right;
    font-size: 14px;
}

.list-transactions .transaction-byUser .dateInvestment {
    text-align: right;
    font-size: 14px;
}

.list-transactions .transaction-byUser .datesClaim {
    padding: 5px;
    margin-top: 10px;
    columns: 2;
    font-size: 14px;
    background-color:  #1835b80e;
    border-radius: 15px;
}

.list-transactions .transaction-byUser .claimAmount {
    text-align: right;
}

.dateForClaim {
    padding: 5px;
}

.dateForClaim .span-out-of-range {
    display: flex;
    float: right;
    font-size: 14px;
}

.dateForClaim .span-claim {
    display: flex;
    float: right;
    font-size: 14px;
    color: #7f990b;
}

.dateForClaim .span-soon {
    display: flex;
    float: right;
    font-size: 14px;
    color: #1835b8;
}

.input-submit {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 14px;
  background-color: #7f990b; 
  padding: 9px;
  margin-top: 10px;
  padding-right: 12px;
  padding-left: 12px;
  border-width: 0px;
  border-radius: 9px;
  transition: 0.3s;
}

.input-submit:hover {
    cursor: pointer;
    background-color: #b5d620;
}

.input-submit-else {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 14px;
  background-color: #9e9e9e; 
  padding: 9px;
  margin-top: 10px;
  padding-right: 12px;
  padding-left: 12px;
  border-width: 0px;
  border-radius: 9px;
  transition: 0.3s;
}

.errorMessage {
    position: fixed;
    color: rgb(255, 43, 43);
    background-color: white;
    top: 0;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid rgb(255, 43, 43);
    border-radius: 15px;
}

.pendingMessage {
    position: fixed;
    color: #7100B3;
    background-color: white;
    top: 0;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid #7100B3;
    border-radius: 15px;
}

.successMessage {
    position: fixed;
    background-color: white;
    top: 0;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid #7f990b;
    border-radius: 15px;
    color: #7f990b;
}
</style>