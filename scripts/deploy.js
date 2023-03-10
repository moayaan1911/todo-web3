const hre= require("hardhat");

async function main(){
    const Task = await hre.ethers.getContractFactory("TaskContract");
    const task = await Task.deploy();
    await task.deployed();
    console.log("task deployed to:",task.address);
    await task.deployTransaction.wait(6);
    console.log("Verifying..................................................................");
    try{
        await hre.run("verify:verify",{
            address:task.address,
            constructorArguments:[]
        }
        )
      }
        catch (e) {
          if (e.message.toLowerCase().includes("already verified")) {
              console.log("Already verified!");
          } else {
              console.log(e);
          }
        }

}
main().then(()=>process.exit(0)).catch((error)=>{
    console.error(error);
    process.exit(1);
})