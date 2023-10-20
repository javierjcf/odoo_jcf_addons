/** @odoo-module */
import { TestComponent } from "./custom_ui";
import { mount } from "@odoo/owl";

import { templates } from "@web/core/assets"


// Me lo está montando en general, en lugar de solo en mi palntilla
// pero era por los assets, ya que estaba añadiendolo a los assets backend
// me he creado mi propio bunddle y solo lo monta en mi plantilla
owl.whenReady(() => {
    const config = { templates, dev: true }
    mount(TestComponent, document.body, config)
});