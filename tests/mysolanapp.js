const anchor = require("@project-serum/anchor");
const { assert } = require("chai");
const { SystemProgram } = anchor.web3;
describe("mysolanapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mysolanaapp;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Creates a counter", async () => {
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 0: ", account.count.toString());
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("Increment Counter", async () => {
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 1: ", account.count.toString());
    assert.ok(account.count.toString() == 1);
  });
});
