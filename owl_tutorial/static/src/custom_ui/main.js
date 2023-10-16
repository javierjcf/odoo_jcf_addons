/** @odoo-module */
import { TestComponent } from "./custom_ui";
import { mount } from "@odoo/owl";

import { templates } from "@web/core/assets"


// Me lo está montando en general, en lugar de solo en mi palntilla
owl.whenReady(() => {
    const config = { templates, dev: true }
    mount(TestComponent, document.body, config)
});