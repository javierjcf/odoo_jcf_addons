/** @odoo-module **/

import { Component, useState, xml } from "@odoo/owl"
import { Counter, Todo, Card } from "./components/index.js"

export class Playground extends Component {
    static template = "owl_playground.playground"
    static components = { Counter, Todo, Card }

    state = useState({ value: 0 })

    static props = {
        initialValue: {
            type: Number,
            optional: true,
            // element: [Number, Boolean]   // Validate array items against type constructor - can be more props objectdefiniations
            // shape: {},                   // Validate object values against interface spec
            // value: 0,                    // Prop default value
            // validate: v => (0 <= v && v <= 10),          // Custom validator for this property
         },
         //,"*"     // allow additional props
        counter: { type: Counter, optional: true }  // Component as property
    };

    static defaultProps = {
        initialValue: 0,
    };

}
