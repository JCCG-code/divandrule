import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Assets',
    component: () => import('../views/Assets.vue')
  },
  {
    path: '/api/auth/signIn',
    name: 'Sign In',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/api/auth/signUp',
    name: 'Sign Up',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/api/auth/kyc',
    name: 'KYC authentication',
    component: () => import('../views/auth/KYC.vue')
  },
  {
    path: '/api/settings/profile',
    name: 'Settings Profile',
    component: () => import('../views/settings/Profile.vue')
  },
  {
    path: '/api/settings/security',
    name: 'Settings Security',
    component: () => import('../views/settings/Security.vue')
  },
  {
    path: '/api/settings/kyc',
    name: 'Settings KYC',
    component: () => import('../views/settings/KYC.vue')
  },
  {
    path: '/api/connectWallet',
    name: 'Connecting Wallet',
    component: () => import('../views/wallet/ConnectingWallet.vue')
  },
  {
    path: '/api/viewWallet',
    name: 'View Wallet',
    component: () => import('../views/wallet/ViewWallet.vue')
  },
  {
    path: '/api/newAsset',
    name: 'New Asset',
    component: () => import('../views/NewAsset.vue')
  },
  {
    path: '/api/myAssets',
    name: 'My Assets',
    component: () => import('../views/MyAssets.vue')
  },
  {
    path: '/api/viewTransactions',
    name: 'View Transactions',
    component: () => import('../views/transaction/ViewTransactions.vue')
  },
  {
    path: '/api/admin/users',
    name: 'View Users',
    component: () => import('../views/admin/ViewUsers.vue')
  },
  {
    path: '/api/admin/approveAssets',
    name: 'Approve Asset',
    component: () => import('../views/admin/ApproveAsset.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
