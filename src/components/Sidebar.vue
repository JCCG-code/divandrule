<template>
    <div class="side-dashboard">
        <img src="../assets/title-header.png" class="title-header" alt="Title">
        <div class="user-info">
          <div class="div-username">

            <!-- Show username -->
            <span class="username" v-if="getUser">{{getUser.username}}</span>

            <!-- Show KYC checking state  -->
            <div class="kyc" v-if="getKYCState == 1">
              <img src="../assets/time-icon.png" class="icon-verified" alt="KYC is checking">
              <span class="kyc-message">KYC is checking</span>
            </div>

            <!-- Show KYC success state -->
            <div class="kyc" v-if="getKYCState == 2">
              <img src="../assets/verified-kyc-icon.png" class="icon-verified" alt="KYC Verified">
              <span class="kyc-message">KYC success!</span>
            </div>

            <!-- Show KYC denying state and retry -->
            <div class="kyc" v-if="getKYCState == -1">
              <img src="../assets/alert.icon.png" class="icon-verified" alt="KYC Denied">
              <span class="kyc-message">KYC is denied. Please try again</span>
            </div>

          </div>

          <!-- Links -->
          <div class="links-config">
            <img src="../assets/home.icon.png" class="icons" alt="Home">
            <router-link to="/" class="links">Home</router-link>
          </div>
          <div class="links-config">
            <img src="../assets/config.icon.png" class="icons" alt="Settings">
            <router-link to="/api/settings/profile" class="links">Settings</router-link>
          </div>
          <div class="links-config">
            <img src="../assets/exit.icon.jpg" class="icons" alt="Exit">
            <span @click="handleSignOut" class="links">Exit</span>
          </div>
        </div>

        <!-- Superadmin options -->
        <div class="user-info-superadmin" v-if="isSuperadmin">
          <div class="div-title-role">
            <span class="title-role">Superadmin</span>
          </div>
          <div class="links-config-superadmin">
            <img src="../assets/verify-search-icon.png" class="icons" alt="Verifying KYC">
            <router-link to="/api/auth/kyc" class="links">KYC authentication</router-link>
          </div>
          <div class="links-config-superadmin">
            <img src="../assets/users-icon.png" class="icons" alt="Verifying KYC">
            <router-link to="/api/admin/users" class="links">View users</router-link>
          </div>
          <div class="links-config-superadmin">
            <img src="../assets/approve-icon.png" class="icons" alt="Verifying KYC">
            <router-link to="/api/admin/approveAssets" class="links">Approve tokens</router-link>
          </div>
        </div>

        <!-- Investor options -->
        <div class="user-info-investor" v-if="isInvestor && getUserAddress && getKYCState == 2">
          <div class="div-title-role">
            <span class="title-role">Investor</span>
          </div>
          <div class="links-config-investor">
            <img src="../assets/transaction.icon.png" class="icons" alt="Invest">
            <router-link to="/api/viewTransactions" class="links">Claim your investments</router-link>
          </div>
        </div>

        <!-- Promoter options -->
        <div class="user-info-promoter" v-if="isPromoter && getUserAddress && getKYCState == 2">
          <div class="div-title-role">
            <span class="title-role">Promoter</span>
          </div>
          <div class="links-config-promoter">
            <img src="../assets/myassets-icon.png" class="icons" alt="Invest">
            <router-link to="/api/myAssets" class="links">My assets</router-link>
          </div>
          <div class="links-config-promoter">
            <img src="../assets/invest.icon.png" class="icons" alt="Invest">
            <router-link to="/api/newAsset" class="links">Create new asset</router-link>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  methods: {
    handleSignOut() {
      localStorage.removeItem('token')
      this.$store.dispatch('loadUser', null)
      this.$router.push('/api/auth/signIn')
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getUserAddress']),

    // Extract KYC State of user in session
    getKYCState() {
      let user = this.$store.state.user
      
      if (user != null)
        return user.KYCState

      return null
    },

    // Check if user have got a superadmin role
    isSuperadmin() {
      let user = this.$store.state.user

      if (user != null)
        return user.role.some(role => role === 'superadmin') // Return true or false

      return null
    },

    // Check if user have got a investor role
    isInvestor() {
      let user = this.$store.state.user

      if (user != null)
        return user.role.some(role => role === 'investor') // Return true or false

      return null
    },

    // Check if user have got a promoter role
    isPromoter() {
      let user = this.$store.state.user

      if (user != null)
        return user.role.some(role => role === 'promoter') // Return true or false

      return null
    }
  }
}
</script>

<style scoped>
.side-dashboard {
  position: fixed;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: #7100B3;
  z-index: 1;
}

.title-header {
  margin-left: 7px;
  width: 280px;
}

.user-info {
  background-color: #8e5bac;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 15px;
  border-radius: 20px;
  padding-bottom: 20px;
}

.user-info-superadmin {
  background-color: #4f68d8;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 15px;
  border-radius: 20px;
  padding-bottom: 20px;
}

.user-info-promoter {
  background-color: #536600;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 15px;
  border-radius: 20px;
  padding-bottom: 20px;
}

.user-info-investor {
  background-color: #1835b8;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 15px;
  border-radius: 20px;
  padding-bottom: 20px;
}

.div-username {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}

.username {
  cursor: default;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding-top: 20px;
}

.div-title-role {
  padding: 15px;
}

.title-role {
  cursor: default;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.links-config {
  padding: 2px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  transition: 0.3s;
}

.links-config:hover {
  background-color: #a172bd;
  cursor: pointer;
}

.links-config-superadmin {
  padding: 2px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  transition: 0.3s;
}

.links-config-superadmin:hover {
  background-color: #6e82db;
  cursor: pointer;
}

.links-config-promoter {
  padding: 2px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  transition: 0.3s;
}

.links-config-promoter:hover {
  background-color: #6d8210;
  cursor: pointer;
}

.links-config-investor {
  padding: 2px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  transition: 0.3s;
}

.links-config-investor:hover {
  background-color: #304cc7;
  cursor: pointer;
}

.icons {
  width: 24px;
}

.icon-verified {
  width: 18px;
  margin-left: 5px;
  margin-top: 25px;
}

.kyc {
  width: 10px;
}

.kyc .kyc-message {
  opacity: 0;
  position: absolute;
  background-color: rgb(63, 63, 63);
  color: white;
  padding: 7px;
  border-radius: 10px;
  margin-top: -65px;
  margin-left: -100px;
  transition: 0.3s;
}

.kyc:hover .kyc-message {
  cursor: default;
  opacity: 1;
}

.links {
  position: relative;
  text-decoration: none;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  margin-left: 10px;
  top: -5px;
}
</style>