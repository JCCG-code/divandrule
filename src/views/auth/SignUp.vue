<template>
    <div class="background">
        <div class="signUp-container">
            <span v-if="errorMessage" class="error_message">{{errorMessage}}</span>
            <h1 class="title">Sign Up</h1>
            <span>Already have an account? <router-link to="/api/auth/signIn" class="link">Click here!</router-link></span><br><br>
            <form @submit.prevent="handleSubmit">
                <span>Username</span><br>
                <input type="text" class="input-text" v-model="username" required><br><br>
                <span>Email</span><br>
                <input type="email" class="input-text" v-model="email" required><br><br>
                <span>Password</span><br>
                <input type="password" class="input-text" v-model="password" required><br><br>
                <span>Confirm password</span><br>
                <input type="password" class="input-text" v-model="passwordConfirm" required><br><br>
                <span>Choose your role</span><br>
                <input type="checkbox" class="input-checkbox" id="Investor" v-model="roles" value="investor"><span class="role">Investor</span><br>
                <input type="checkbox" class="input-checkbox" id="Promoter" v-model="roles" value="promoter"><span class="role">Promoter</span><br><br>
                <button class="input-submit">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sign Up',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            roles: [],
            errorMessage: ''
        }
    },
    methods: {
        async handleSubmit() {
            let data
            
            const response = await this.axios.post('/auth/signUp', {
                username: this.username,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
                roles: this.roles
            }).catch(err => {
                data = err.response
            })

            if (data) {
                this.errorMessage = data.data.message
            } else {
                localStorage.setItem('token', response.data.token)
                this.$store.dispatch('loadUser', response.data.user)
                this.$router.push('/')
            }
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
    background-color: #f7eaff;
    z-index: 2;
}

.signUp-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background-color: #7100B3;
    border-radius: 30px;
}

.title {
    color: white;
    font-size: 25px;
}

span {
    cursor: default;
    color: white;
    font-weight: bold;
    font-size: 14px;
}

.link {
    text-decoration: none;
    color: #92B300;
}

.input-text {
    outline: none;
    padding: 7px;
    width: 90%;
    background-color: #ad89c2;
    border-width: 0px;
    border-radius: 10px;
}

.input-text:-webkit-autofill,
.input-text:-webkit-autofill:hover,
.input-text:-webkit-autofill:focus,
.input-text:-webkit-autofill:active {
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
    border-width: 0px;
    border-radius: 13px;
    transition: 0.3s;
}

.input-submit:hover {
    cursor: pointer;
    background-color: #cae25f;
}

.error_message {
    color: rgb(255, 43, 43);
}

.input-checkbox {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-top: 10px;
    margin-right: 8px;
    border-radius: 10px;
}

.role {
    position: absolute;
    margin-top: 9px;
    font-weight: normal;
}
</style>