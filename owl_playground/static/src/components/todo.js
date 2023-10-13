/** @odoo-module **/

import { Component, useState, useRef, useEffect, onMounted } from "@odoo/owl";
import { useAutoFocus } from "./utils";

class Todo extends Component {
    static template = "owl_playground.todo";

    state = useState({ items: [] })

    static props = {
        items: {
            type: Array,
            optional: true,
            element: {
                type: Object,
                shape: {
                    id: Number,
                    description: String,
                    done: Boolean
                },
            }
        },
    };

    static defaultProps = {
        items: { id: -1, description: "Todo item", done: true },
    };

    setup() {
        this.state.items = this.props.items;
        useAutoFocus("todoInput")
    }

    get itemIds() {
        return this.state.items.map(i => i.id)
    }

    get lastItemId() {
        const sortedById = this.itemIds.sort()
        return sortedById[sortedById.length - 1]
    }

    itemIndex(id) {
        return this.state.items.findIndex((item) => item.id === id);
    }

    addItem(item_or_desc) {
        const item = typeof item_or_desc === "string"
            ? { description: item_or_desc, done: false }
            : item_or_desc
        if (!item.id)
            item.id = this.lastItemId + 1
        this.state.items = [...this.state.items, item]

        return true
    }

    removeItem(id) {
        const itemIndex = this.itemIndex(id)
        console.log("idx", itemIndex)
        this.state.items.splice(itemIndex, 1)
    }

}

export { Todo }