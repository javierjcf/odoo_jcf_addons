/** @odoo-module **/

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";

const { Component } = owl;

class AwesomeDashboard extends Component {
    static template = "awesome_tshirt.clientaction"
    static components = { Layout }

    setup() {
        this.action = useService("action")

    }

    openCustomers() {
        this.action.doAction("base.action_partner_form")
    }

    openOrders(title, domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "awesome_tshirt.order",
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"],
            ],
        });
    }

    openNewOrders() {
        const domain = "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders(this.env._t("Last 7 days orders"), domain);
    }

    openCancelledOrders() {
        const domain =
            "[('create_date','>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')), ('state','=', 'cancelled')]";
        this.openOrders(this.env._t("Last 7 days cancelled orders"), domain);
    }
}

registry.category("actions").add("awesome_tshirt.dashboard", AwesomeDashboard);
