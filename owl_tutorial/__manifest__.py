{
    "name": "OWL Tutorial",
    "version": "16.0.0.0.1",
    "author": "Javier Colmenero",
    "category": "Custom",
    "depends": [
        "base",
    ],
    "license": "LGPL-3",
    "data": [
        'security/ir.model.access.csv',
        'views/todo_list.xml',
        'views/res_partner.xml',
    ],
    "demo": [
    ],
    "installable": True,
    "application": True,
    "assets": {
        "web.assets_backend": [
            'owl_tutorial/static/src/components/*/*.js',
            'owl_tutorial/static/src/components/*/*.xml',
            'owl_tutorial/static/src/components/*/*.scss',
        ],
    }
}
