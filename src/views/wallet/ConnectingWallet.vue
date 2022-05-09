<template>
    <div class="div-center">
        <div class="container">
            <p class="title">Connect your wallet</p>

            <!-- List of wallets -->
            <table class="table-of-wallets">
                <tr>

                    <!-- Metamask option -->
                    <td>
                        <div class="wallet-container" @click="handleMetamask">
                            <img src="../../assets/metamask-logo.png" class="wallet-logo" alt="Metamask logo">
                            <p class="name-wallet">Metamask</p>
                        </div>
                    </td>

                    <!-- WalletConnect opcion -->
                    <td>
                        <div class="wallet-container" @click="handleWalletConnect">
                            <img src="../../assets/walletconnect-logo.png" class="wallet-logo" alt="Metamask logo">
                            <p class="name-wallet">WalletConnect</p>    
                        </div>
                    </td>

                    <!-- TrustWallet option -->
                    <td>
                        <div class="wallet-container" @click="handleTrustWallet">
                            <img src="../../assets/trustwallet-logo.png" class="wallet-logo" alt="Metamask logo">
                            <p class="name-wallet">TrustWallet</p>  
                        </div>
                    </td>
                    
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import * as ConnectWallet from '../../libs/ConnectWallet'

export default {
    name: 'Connecting Wallet',
    methods: {
        handleMetamask() {
            ConnectWallet.handleMetamask()
        },
        handleWalletConnect() {
            ConnectWallet.handleWalletConnect()
        },
        handleTrustWallet() {
            ConnectWallet.handleTrustWallet()
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

.container {
  width: 650px;
  margin-top: 100px;
  margin-left: 20px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.table-of-wallets {
    margin-top: 60px;
    width: 850px;
    text-align: center;
}

.wallet-container {
    padding: 20px;
    background-color: #dfdfdf;
    border-radius: 30px;
    transition: 0.3s;
}

.wallet-container:hover {
    background-color: #cccccc;
    cursor: pointer;
}

.wallet-logo {
    width: 100px;
    height: 100px;
}
</style>