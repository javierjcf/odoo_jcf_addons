/** @odoo-module **/
import { registry } from "@web/core/registry";
const { Component, useState, onWillStart, useRef } = owl;
import { useService } from "@web/core/utils/hooks";


export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            task:{name: "", color: "#FF0000", completed: false},
            taskList: [
            ],
            isEdit: false,
            activeId: false,
        });
        this.orm = useService("orm");
        this.model = "owl.todo.list"
        this.searchInput = useRef("search-input");

        onWillStart(async () => {
            await this.getAllTask();
        })
    }

    async getAllTask(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"]);
    }

    addTask(){
        this.resetForm();
        this.state.activeId = false;
        this.state.isEdit = false;
    }
    
    editTask(task){
        this.state.activeId = task.id;
        this.state.isEdit = true;
        // this.state.task = {name: task.name, color: task.color, completed: task.completed};
        this.state.task = {...task};
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id]);
         // Para que se refresque la tarea
         await this.getAllTask();
    }

    async saveTask(){
        // this.orm.create(this.model, [{name: this.state.task.name, color: this.state.task.color, completed: this.state.task.completed}]);
        if (!this.state.isEdit){
            await this.orm.create(this.model, [this.state.task]);
        } else {
            await this.orm.write(this.model, [this.state.activeId], this.state.task);
        }
        // Para que se refresque la tarea
        await this.getAllTask();
    }

    resetForm(){
        // Reinicio el formulario del modal para que no recuerde los datos
        // por ejemplo si editamos antes
        this.state.task = {name: "", color: "#FF0000", completed: false};
    }

    async searchTasks(){
        const text = this.searchInput.el.value;
        this.state.taskList = await this.orm.searchRead(this.model, [['name', 'ilike', text]], ["name", "color", "completed"]);
    }
    async toggleTask(e, task){
        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTask();
    }
    async updateColor(e, task){
        await this.orm.write(this.model, [task.id], {color: e.target.value});
        await this.getAllTask();
    }
}

OwlTodoList.template = 'owl_todo_app.TodoList'
registry.category('actions').add('owl_todo_app.action_todo_list_js', OwlTodoList)