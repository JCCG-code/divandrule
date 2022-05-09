<template>
  <div class="nav-container">
    <p class="title">Settings</p>

    <table class="settings-nav">
      <tr>
        <td><router-link to="/api/settings/profile" class="links">Change profile</router-link></td>
        <td><router-link to="/api/settings/security" class="links">Change password</router-link></td>
        <td><router-link to="/api/settings/kyc" class="links">KYC</router-link></td>
      </tr>
    </table>

    <hr class="separator">
  </div>
</template>

<script>
export default {
  name: 'SettingsNav',
}
</script>

<style scoped>
.nav-container {
  width: 650px;
  margin-top: 100px;
}

.title {
  font-size: 22px;
  font-weight: 500;
}

.settings-nav {
  width: 100%;
}

.separator {
  width: 100%;
  opacity: 0.3;
}

.links {
  text-decoration: none;
  color: #2c3e50;
}
</style>