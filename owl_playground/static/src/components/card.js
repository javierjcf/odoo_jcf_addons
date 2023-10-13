/** @odoo-module **/

import { Component, useState, useRef, useEffect, onMounted } from "@odoo/owl";
import { useAutoFocus } from "./utils";

class Card extends Component {
    static template = "owl_playground.card";

    state = useState({  })

    static props = {
        slots: {
            type: Object,
            shape: {
                default: Object,
                title: { type: Object, optional: true },
            },
        },
    }
    setup() {

    }


}

export { Card }