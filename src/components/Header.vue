<template>
    <header class="header">

      <!-- Show balance user and address wallet -->
      <div v-if="getUserAddress" @click="viewWalletOptions" class="dataWallet">
          <div class="address">
            <span class="address-text">{{getUserAddress}}</span>
          </div>
          <div class="balance">{{getUserBalance.toFixed(4)}} BNB</div>
      </div>

      <!-- Show button to connect user wallet -->
      <div v-else>
        <router-link to="/api/connectWallet"><button class="button-connectWallet">Connecting wallet</button></router-link>
      </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Header',
    computed: {
      ...mapGetters(['getUserAddress', 'getUserBalance']),
    },
    methods: {
      viewWalletOptions() {
        this.$router.push('/api/viewWallet')
      }
    }
}
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #f1d9ff;
  padding-top: 15px;
  padding-bottom: 15px;
}

.button-connectWallet {
  display: flex;
  float: right;
  margin-right: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  font-size: 15px;
  font-weight: bold;
  background-color: white; 
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border-width: 1px;
  border-radius: 13px;
  transition: 0.3s;
}

.button-connectWallet:hover {
  color: #2c3e50a6;
  cursor: pointer;
}

.address {
  display: flex;
  float: right;
  margin-right: 50px;
  background-color: #7100B3;
  color: white;
  padding: 10px;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
}

.address-text {
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.balance {
  display: flex;
  float: right;
  background-color: white;
  color: #7100B3;
  padding: 10px;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
}

.dataWallet {
  opacity: 1;
  transition: 0.3s;
}

.dataWallet:hover {
  cursor: pointer;
  opacity: 0.6;
}
</style>