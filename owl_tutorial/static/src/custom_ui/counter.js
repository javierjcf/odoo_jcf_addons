/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

class Counter extends Component {
    static template = "owl_tutorial.counter";

    state = useState({ value: 0 })

    increment() {
        this.state.value++;
    }
}

export { Counter }