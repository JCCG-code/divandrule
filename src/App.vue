<template>
  <div class="dashboard">
    <Header/>
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Web3 from 'web3'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar
  },
  async created() {
    if (localStorage.getItem('token') != null)
    {
      await this.axios.post('/auth/user', {
          token: localStorage.getItem('token')
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(async response => {
          let web3 = new Web3(window.ethereum)
          let accounts = await web3.eth.getAccounts()
          let userBalance = await web3.eth.getBalance(accounts[0])
          let networkId = await web3.eth.net.getId()

          this.$store.dispatch('loadUser', response.data.user)
          this.$store.dispatch('loadUserAddress', accounts[0])
          this.$store.dispatch('loadUserBalance', userBalance / 10**18)
          this.$store.dispatch('loadWeb3Provider', web3)
          this.$store.dispatch('loadNetworkId', networkId)
        })
        .catch(err => {
          console.log(`You need to login\n${err}`)
          this.$router.push('/api/auth/signIn')
        })
    }
    else
    {
      console.log('No token provided')
      this.$router.push('/api/auth/signIn')
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}
</style>
