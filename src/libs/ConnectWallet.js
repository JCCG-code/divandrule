// General imports
import Web3 from 'web3'
import store from '../store/index'


// How to work with store in external files
// import store from 'route'
// Call store.method.variable


// Connect to Metamask wallet
export const handleMetamask = async () =>
{
    try
    {
        if (window.ethereum)
        {
            let web3 = new Web3(window.ethereum)

            // Load Web3Provider
            store.dispatch('loadWeb3Provider', web3)
            
            // LOAD USER ADDRESS
            // Without web3
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            // With web3
            // let accounts = await web3.eth.getAccounts()

            // LOAD USER BALANCE
            // Without web3
            // let userBalance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] })
            // With web3
            let userBalance = await web3.eth.getBalance(accounts[0])

            // LOAD NETWORK ID
            let networkId = await web3.eth.net.getId()

            // Save parameter in session
            store.dispatch('loadNetworkId', networkId)
            store.dispatch('loadUserAddress', accounts[0])
            store.dispatch('loadUserBalance', userBalance / 10**18)
        }
    }
    catch (err)
    {
        console.log(err)
    }
}


// Connect to WalletConnect wallet
export const handleWalletConnect = () =>
{
    console.log('WalletConnect')
}


// Connect to TrustWallet wallet
export const handleTrustWallet = () =>
{
    console.log('TrustWallet')
}