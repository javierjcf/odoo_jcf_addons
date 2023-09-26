/** @odoo-module **/
import { registry } from "@web/core/registry";
const { Component, useState } = owl;

export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            value: 1,
        });
    }
}

OwlTodoList.template = 'owl_todo_app.TodoList'
registry.category('actions').add('owl_todo_app.action_todo_list_js', OwlTodoList)