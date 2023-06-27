const { SigningStargateClient, Secp256k1HdWallet } = require('@cosmjs/stargate');

const chainUrl = "http://54.92.222.79:26657"
const chainId = "goudla-testnet"
const mnemonic = "roof attend right salt horn include dutch puzzle dawn call jelly midnight fish admit agree absent length hotel flock federal usual wrong globe scorpion"
async function connect() {
    const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
    const client = await SigningStargateClient.connectWithSigner(chainUrl, wallet, { chainId });
    return client;
}

async function stakeAPI(req, res) {
    try {
        const { senderAddress, recipientAddress, messages } = req.body;
        const client = await connect();
        const msgs = messages.map((message) => {
            return {
                type: 'cosmos.bank.v1beta1.MsgSend',
                value: {
                    from_address: senderAddress,
                    to_address: recipientAddress,
                    amount: message.tokenAmounts,
                },
            };
        })
        const result = await client.signAndBroadcast(senderAddress , msgs , "auto")
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err.message)
    }
}
module.exports = stakeAPI;