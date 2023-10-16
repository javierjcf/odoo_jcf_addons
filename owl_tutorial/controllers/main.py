# © 2023 Comunitea 
# License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0.html

from odoo import http
from odoo.http import request


class CustomUi(http.Controller):

    @http.route('/custom/ui', type='http', auth='user', website=True)
    def delivery_ui(self, **kw):
        return request.render('owl_tutorial.custom_ui_template', {})
    
    # @http.route('/return_to_odoo_backend', type='http', auth='user', website=True)
    # def return_to_odoo_backend(self, **kw):
    #     # Redirige a la vista principal de Odoo (backend)
    #     return http.local_redirect('/web', query=request.params)
