const main = async () => {
    const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();

    console.log("owner is: ", owner.address);

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("Marina's Wave Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );

    console.log(
      "Contract balance",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalMessageCount();
    console.log("Initial wave count:", waveCount);

    let waveTxn = await waveContract.wave("My First Wave!");

    waveCount = await waveContract.getTotalMessageCount();
    console.log("Intermediate wave count:", waveCount);

    contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance",
      hre.ethers.utils.formatEther(contractBalance)
    );

    await waveContract.wave("Hello");
    await waveContract.wave("Mothafuckah");

    await waveContract.wave("Hey Ho");

    await waveContract.wave("How you derrrrn");

    waveCount = await waveContract.getMessageCountBySource(owner.address);
    console.log("Final message count by source %s: %i", owner.address, waveCount);

    waveCount = await waveContract.getTotalMessageCount();
    console.log("Final wave count:", waveCount);

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
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