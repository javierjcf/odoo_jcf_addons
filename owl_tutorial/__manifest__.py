# -*- coding: utf-8 -*-
{
    'name' : 'OWL Tutorial',
    'version' : '1.0',
    'summary': 'OWL Tutorial',
    'sequence': -1,
    'description': """OWL Tutorial""",
    'category': 'OWL',
    'depends' : ['base', 'web', 'point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml',
        'views/res_partner.xml',
        'views/odoo_services.xml',
        'views/custom_ui.xml',
    ],
    'demo': [
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'owl_tutorial/static/src/components/*/*.js',
            'owl_tutorial/static/src/components/*/*.xml',
            'owl_tutorial/static/src/components/*/*.scss',
        ],
        'owl_tutorial.custom_ui': [
            # bootstrap
            ('include', 'web._assets_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_bootstrap'),

            'web/static/src/libs/fontawesome/css/font-awesome.css', # required for fa icons
            'web/static/src/legacy/js/promise_extension.js', # required by boot.js
            'web/static/src/boot.js', # odoo module system
            'web/static/src/env.js', # required for services
            'web/static/src/session.js', # expose __session_info__ containing server information
            'web/static/lib/owl/owl.js', # owl library
            'web/static/lib/owl/odoo_module.js', # to be able to import "@odoo/owl"
            'web/static/src/core/utils/functions.js',
            'web/static/src/core/browser/browser.js',
            'web/static/src/core/registry.js',
            'web/static/src/core/assets.js',

            'owl_tutorial/static/src/custom_ui/*.js',
            'owl_tutorial/static/src/custom_ui/*.xml',
            'owl_tutorial/static/src/custom_ui/*.scss',
        ],
        'point_of_sale.assets': [
            'owl_tutorial/static/src/pos/**/*.js',
            'owl_tutorial/static/src/pos/**/*.xml',
            'owl_tutorial/static/src/pos/**/*.scss',
        ]
    },
}