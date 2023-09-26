{
    "name": "OWL Todo app",
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
    ],
    "demo": [
    ],
    "installable": True,
    "application": True,
    "assets": {
        "web.assets_backend": [
            'owl_todo_app/static/src/**/*',
        ],
    }
}
