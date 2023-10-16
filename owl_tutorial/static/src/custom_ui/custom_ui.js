/** @odoo-module */
import { Component, useState } from "@odoo/owl";
const { xml, mount } = owl;

debugger;

export class TestComponent extends Component {
    static template = "owl_tutorial.test_ui"
    setup(){
        super.setup()
        console.log("This is Test Component")
    }
    showStockPickingKanban() {
        // this.env.bus.trigger("reload");
    }

    showOdooKanban() {
        // this.env.bus.trigger("reload", {
        //     model: "ir.actions.act_window",
        //     action_id: XXX // Reemplaza XXX con el ID de la vista Kanban de Odoo que deseas mostrar.
        // });
    }
    returnToOdooBackend() {
        // Redirige al backend de Odoo
        window.location.href = "/web";
    }
}