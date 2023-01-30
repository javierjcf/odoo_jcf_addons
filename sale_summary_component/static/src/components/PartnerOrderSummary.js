odoo.define("sale_summary_component.PartnerOrderSummary", function (require) { 

    // Vamos añadir este componente al la vista formulario de ventas
    const FormRenderer = require("web.FormRenderer"); 
    const { Component } = owl;
    const { ComponentWrapper } = require("web.OwlCompatibility"); 
    const { useState } = owl.hooks;
    
    // Este componente será el responsable de mostrar el resumen de ventas
    // de un cliente
    class PartnerOrderSummary extends Component {
        partner = useState({});
        
        // Le pasaré los datos del partner en el constructor
        constructor(self, partner) { 
            super(); 
            this.partner = partner; // partner se puede usar en la plantilla
        } 
    };

    
    // Registro las propiedades del widget
    Object.assign(PartnerOrderSummary, { 
        template: "sale_summary_component.PartnerOrderSummary" 
    });


    /** 
      * Sobrescribo el render del Form de tal modo que pueda montar mi compone
      * nente en cualquier div con la clase o_partner_order_summary
      */ 
    FormRenderer.include({ 
        async _render() { 
            await this._super(...arguments); 
            
            // Hacemos el montado del componente
            // Le paso los datos del objeto actual, para darle valor a la propiedad partner
            // del componente
            for(const element of this.el.querySelectorAll(".o_partner_order_summary")) { 
                this._rpc({
                    model: "res.partner",
                    method: "read",
                    args: [[this.state.data.partner_id.res_id]]
                }).then(data => { 
                    (new ComponentWrapper( 
                        this, 
                        PartnerOrderSummary, 
                        useState(data[0]) 
                    )).mount(element); 
                }); 
            } 
        } 
    }); 

});         