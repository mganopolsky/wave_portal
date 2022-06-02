const main = async () => {
    const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();

    console.log("owner is: ", owner.address);

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Marina's Wave Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalMessageCount();
    console.log("Initial wave count:", waveCount);

    let waveTxn = await waveContract.wave();

    waveCount = await waveContract.getTotalMessageCount();
    console.log("Intermediate wave count:", waveCount);

    await waveContract.sendMessage("Hello");
    await waveContract.sendMessage("Mothafuckah");

    await waveContract.sendMessage("Hey Ho");

    await waveContract.sendMessage("How you derrrrn");

    waveCount = await waveContract.getMessageCountBySource(owner.address);
    console.log("Final message count by source %s: %i", owner.address, waveCount);

    const sentMessages = await waveContract.getMessagesBySource(owner.address);
    console.log("Messages sent by %s: ", owner.address, sentMessages);

    //waveTxn = await waveContract.connect(randomPerson1.address).wave();
    //await waveTxn.wait();

//    waveTxn = await waveContract.connect(randomPerson2.address).wave();
//    await waveTxn.wait();

    waveCount = await waveContract.getTotalMessageCount();
    console.log("Final wave count:", waveCount);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();