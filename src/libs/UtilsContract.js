// General imports
// import Web3 from 'web3'
import store from '../store/index'


// Contract files
import tokenBEP20 from '../../truffleContracts/build/contracts/BEP20Token.json'


export const deployContract = (tokenName, tokenSymbol, totalSupply, interest) =>
{
    return new Promise((resolve, reject) => {
        try
        {
            // Total supply calculated by interest
            totalSupply = totalSupply * (1 + (interest/100))

            // Web3 instance
            const web3Instance = store.state.web3Provider

            // Extract abi and bytecode from contract
            const abi = tokenBEP20.abi
            const bytecode = tokenBEP20.bytecode

            // Create the instance of token
            const contract = new web3Instance.eth.Contract(abi)
            contract.deploy({
                data: bytecode,
                arguments: [tokenName, tokenSymbol, totalSupply]
            }).send({
                from: store.state.userAddress,
                gas: 2501758,
                gasPrice: 10000000000
            }).on('error', error => {
                return reject(error)
            }).then(res => {
                resolve(res.options.address)
            })
        }
        catch (err)
        {
            console.log(err)
        }
    })
}

export const getBalanceByToken = async (tokenAddress, userAddress) =>
{
    try
    {
        // Web3 instance
        const web3Instance = store.state.web3Provider

        // Extract abi and bytecode from contract
        const abi = tokenBEP20.abi

        // Create the instance of token
        const contract = new web3Instance.eth.Contract(abi, tokenAddress)
        const balanceBUSD = await contract.methods.balanceOf(userAddress).call()

        return parseFloat((balanceBUSD / 10**18).toFixed(4))
    }
    catch (err)
    {
        console.log(err)
    }
}

export const buyTokensByContract = async (tokenAddress, numberTokens) =>
{
    try
    {
        // Web3 instance
        const web3Instance = store.state.web3Provider

        // Extract abi and bytecode from contract
        const abi = tokenBEP20.abi

        // Create the instance of token
        const contract = new web3Instance.eth.Contract(abi, tokenAddress)
        return await contract.methods.buyTokens(BigInt(numberTokens * (10**18))).send({
            from: store.state.userAddress
        })
    }
    catch (err)
    {
        return err
    }
}

export const claimTokensByContract = async (tokenAddress, numberTokens) =>
{
    try
    {
        // Web3 instance
        const web3Instance = store.state.web3Provider

        // Extract abi and bytecode from contract
        const abi = tokenBEP20.abi

        // Create the instance of token
        const contract = new web3Instance.eth.Contract(abi, tokenAddress)
        return await contract.methods.claimTokens(BigInt(numberTokens * (10**18))).send({
            from: store.state.userAddress
        })
    }
    catch (err)
    {
        return err
    }
}