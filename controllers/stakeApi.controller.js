const { SigningStargateClient, Secp256k1HdWallet } = require('@cosmjs/stargate');
const { DirectSecp256k1HdWallet, OfflineDirectSigner } = require('@cosmjs/proto-signing');

const rpcEndpoint = "http://54.92.222.79:26657"
const chainId = "goudla-testnet"
const mnemonic = "roof attend right salt horn include dutch puzzle dawn call jelly midnight fish admit agree absent length hotel flock federal usual wrong globe scorpion"


async function connect() {
    const signerAddress = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'goudla' });
    const [signersAccount] = await signerAddress.getAccounts();
    console.log("address", signersAccount.address);
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signerAddress);
    return {client, signersAccount};
}
// goudlavaloper162m3ejw0d9y8ff4tkhm3wwp9e7c24hhphdhlvv
async function stakeAPI(req, res) {
    try {
        const { recipientAddress, amounts } = req.body;
        const { client, signersAccount } = await connect();
        
        const msgs = () => {
            return {
                type: '/cosmos.staking.v1beta1.MsgDelegate',
                value: {
                    from_address: signersAccount.address,
                    to_address: recipientAddress,
                    amount: { denom: "uGOUD", amount: amounts},
                },
            };
        }
        const result = await client.signAndBroadcast(signersAccount.address , msgs , "auto")
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err.message)
    }
}
module.exports = stakeAPI;