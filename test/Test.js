const {ethers} = require("hardhat");
const {expect} = require("chai");

describe("Task Contract Testing",async function(){
    let taskContract;
    let taskContractFactory;
    let owner;
    let addr1;
    let addr2;
    beforeEach(async function(){
        [owner,addr1,addr2] = await ethers.getSigners();
        taskContractFactory = await ethers.getContractFactory("TaskContract");
        taskContract = await taskContractFactory.deploy();
        await taskContract.deployed();
    })

    describe("Add new task",async function(){
        it("Should add new task",async function(){
            await expect (taskContract.addTask("Task 1","title",false)).to.emit(taskContract,"AddTask");
        })
    })

    describe("Delete Task",async function(){
        it("Should delete task",async function(){
            await taskContract.addTask("Task 1","title",false);
            await expect (taskContract.deleteTask(0)).to.emit(taskContract,"DeleteTask");
        })
    })

    describe("get My tasks",async function(){
        it("Should get my tasks",async function(){
            await taskContract.addTask("Task 1","title",false);
            await taskContract.addTask("Task 2","title",false);
            await taskContract.addTask("Task 3","title",false);
            await taskContract.addTask("Task 4","title",false);
            await taskContract.addTask("Task 5","title",false);
            await taskContract.addTask("Task 6","title",false);
            await taskContract.addTask("Task 7","title",false);
            await taskContract.addTask("Task 8","title",false);
            await taskContract.addTask("Task 9","title",false);
            await taskContract.addTask("Task 10","title",false);
            await taskContract.addTask("Task 11","title",false);
            await taskContract.addTask("Task 12","title",false);
         const tasks=await ( taskContract.getMyTask())
            // console.log(tasks);
            expect(tasks.length).to.equal(12);
    })
    })

})