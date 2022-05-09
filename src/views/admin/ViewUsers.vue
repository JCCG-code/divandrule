<template>
  <div class="div-center">
    <div class="container">

      <!-- Title -->
      <p class="title">Users</p>

      <!-- List of users -->
      <div v-for="(user, index) in users" :key="index">
        <form @submit="editUser(user)">
          <div class="user-container" v-if="!isSuperadmin(user)">
            <div>
              <input class="input-text" type="text" v-model="user.username">
            </div>
            <div>
              <input class="input-text" type="text" v-model="user.email">
            </div>
            <div class="role-group">
              <div class="role" v-if="isInvestor(user)">
                Investor
              </div>
              <div class="role" v-if="isPromoter(user)">
                Promoter
              </div>
              <div class="role" v-if="!isInvestor(user) && !isPromoter(user)">
                No role
              </div>
            </div>
            <div>
              <input type="submit" value="Update" class="editUser">
              <input type="submit" value="Delete" class="editUser" @click="deleteUser(user)">
            </div>
          </div>
        </form>
      </div>

      <!-- Error message -->
      <div>
        <p class="errorMessage">{{errorMessage}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'View Users',
  data() {
    return {
      users: [],
      errorMessage: ''
    }
  },

  async created() {
    await this.axios.get('/superadmin/getUsers', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.data.length == 0) {
          this.errorMessage = 'Non user was registered'
        } else {
          this.users = response.data
        }
      })
      .catch(err => {
        this.errorMessage = 'Error occurred while loading users. Please, refresh the page'
        console.log(err)
      })
  },

  methods: {
    // Check if user have got a superadmin role
    isSuperadmin(user) {
      return user.role.some(role => role === 'superadmin')
    },

    isInvestor(user) {
      return user.role.some(role => role === 'investor')
    },

    isPromoter(user) {
      return user.role.some(role => role === 'promoter')
    },

    async editUser(user)
    {
      await this.axios.post('/superadmin/updateUser', {
        userId: user._id,
        username: user.username,
        email: user.email
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(() => {
        this.$forceUpdate()
      })
    },

    async deleteUser(user)
    {
      await this.axios.post('/superadmin/deleteUser', {
        userId: user._id
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      this.users.splice(user, 1)
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

.user-container {
  width: 900px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: solid 1px #1835b890;
  border-radius: 10px;
}

.role {
  font-size: 12px;
  color: white;
  margin: 0;
}

.role-group {
  background-color: #7100B3;
  padding: 7px;
  border-radius: 10px;
}

.icons {
  width: 20px;
  margin-bottom: -3px;
}

.icons:hover {
  cursor: pointer;
}

.input-text {
    outline: none;
    padding: 7px;
    width: 300px;
    background-color: #1835b81e;
    font-size: 15px;
    border-width: 0px;
    border-radius: 10px;
}

.input-text:-webkit-autofill,
.input-text:-webkit-autofill:hover,
.input-text:-webkit-autofill:focus,
.input-text:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}

.editUser {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: 15px;
    color: inherit;
    background-color: white;
    padding: 7px;
    padding-right: 10px;
    padding-left: 10px;
    border-width: 0px;
    border-radius: 5px;
    transition: 0.3s;
}

.editUser:hover {
    cursor: pointer;
    background-color:  #0000002a;
}

.input-checkbox {
  cursor: pointer;
}
</style>