/** @odoo-module **/
import { registry } from "@web/core/registry";
const { Component, useState, onWillStart } = owl;
import { useService } from "@web/core/utils/hooks";


export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            value: 1,
            taskList: [
                // {id:1, name:"Task 1", color:"#FF0000", completed:true},
                // {id:2, name:"Task 2", color:"#000000", completed:false},
                // {id:3, name:"Task 3", color:"#FFFFFF", completed:true},
            ]
        });
        this.orm = useService("orm");
        this.model = "owl.todo.list"

        onWillStart(async () => {
            await this.getAllTask();
        })
    }

    async getAllTask(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"]);
    }
}

OwlTodoList.template = 'owl_todo_app.TodoList'
registry.category('actions').add('owl_todo_app.action_todo_list_js', OwlTodoList)