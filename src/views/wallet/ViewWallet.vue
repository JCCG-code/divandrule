<template>
    <div class="background">
        <div class="wallet-container">

            <!-- Button exit -->
            <img src="../../assets/close-icon.png" class="icons" alt="Verifying KYC" @click="handleClose">

            <!-- Title of wallet -->
            <p class="title">Your wallet</p>

            <!-- Wallet information -->
            <div class="wallet-information" v-if="getUserAddress">
                <p class="userAddress">{{getUserAddress}}</p>
                <p class="userAddress">{{getUserBalance.toFixed(4)}} BNB</p>
                <a :href="'https://testnet.bscscan.com/address/'+getUserAddress" target="_blank" class="link">View on BscScan</a>
                <button class="disconnect-wallet" @click="disconnectWallet">Disconnect this wallet</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'View Wallet',
    computed: {
        ...mapGetters(['getUserAddress', 'getUserBalance']),
    },
    methods: {
        handleClose() {
            this.$router.push('/')
        },
        disconnectWallet() {
            this.$store.dispatch('loadUserAddress', null)
            this.$store.dispatch('loadUserBalance', null)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f7eaff62;
    z-index: 2;
}

.wallet-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background-color: #dfdfdf;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.userAddress {
    font-weight: bold;
    font-size: 15px;
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

.icons {
    display: flex;
    float: right;
    width: 25px;
}

.icons:hover {
    cursor: pointer;
}

.disconnect-wallet {
    display: flex;
    float: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: inherit;
    font-weight: inherit;
    background-color: #b30000;
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    margin-top: 8px;
    border-width: 0px;
    transition: 0.3s;
}

.disconnect-wallet:hover {
    cursor: pointer;
    background-color: #ff5c5c;
}
</style>