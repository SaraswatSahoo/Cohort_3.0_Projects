const { program } = require("commander");
const fs = require("fs");

let todo = {
    addWork: [],
    markWork: []
};

try{
    let data = fs.readFileSync("todo.json", "utf-8");
    todo = JSON.parse(data);
} catch (err) {
    console.log(err);
}

program
    .name("todo-list")
    .description("list your todos")
    .version("0.0.1");

program
    .command('add')
    .description('to add todo')
    .argument('<todo work>','add work')
    .action((work) => {
        todo.addWork.push(`${work}`);
        updateTodoFile();
    })

program
    .command('delete')
    .description('to delete todo')
    .argument('<todo work>','delete work')
    .action((work) => {
        todo.addWork = todo.addWork.filter((item) => item !== work);
        updateTodoFile();
    })

program
    .command('mark')
    .description('to mark todo as done')
    .argument('<todo work>','mark work done')
    .action((work) => {
        if(todo.addWork.includes(work)){
            todo.addWork = todo.addWork.filter((item) => item !== work);
            todo.markWork.push(`${work}`);
            updateTodoFile();
        } else {
            console.log("this work does not exist in todo list.")
        }

    })

program.parse();

function updateTodoFile(){
    fs.writeFile("todo.json", JSON.stringify(todo, null, 2), (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("todo file updated");
        }
    });
}

