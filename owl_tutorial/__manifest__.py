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
        'point_of_sale.assets': [
            'owl_tutorial/static/src/pos/**/*.js',
            'owl_tutorial/static/src/pos/**/*.xml',
            'owl_tutorial/static/src/pos/**/*.scss',
        ]
    },
}