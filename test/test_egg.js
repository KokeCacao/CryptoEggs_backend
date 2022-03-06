const Egg = artifacts.require("Egg");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Egg", function (accounts) {
  let [alice, bob] = accounts; // Ganache function
  let contract;
  beforeEach(async () => { // hook that execute in front of every [it]
    contract = await Egg.deployed();
  });
  it("should test deployment", async function () {
    assert.isTrue(true);
  });
  it('should check nobody has egg before', async () => {
    const addr = await contract.getEggOwner(0);
    assert.equal(addr, 0, "the egg is not owned by 0");
  });
  it('should allow someone to claim an egg for the first person', async () => {
    const result = await contract.claimEgg({from: alice}); // [from] is contract sender
    assert.equal(result.receipt.status, true); // compare literal value
    const egg = await contract.getOwnerEgg(alice, {from: bob});
    // console.log(egg);
    assert.deepEqual(result.logs[0].args.egg, egg); // not just comparing address

    const eggCount = await contract.getOwnerEggCount(alice, {from: alice});
    assert.equal(eggCount, 1);
  });
});
