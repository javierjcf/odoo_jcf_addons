# Copyright 2021 codingdodo.com - L'ATTENTION Philippe
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html)
{
    'name': "Web Widget Markdown",
    'author': "javierjcf",
    'version': '14.0.0.0.1',
    'license': 'AGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/templates.xml',
    ],
    "qweb": [ 
        'static/src/xml/qweb_template.xml',
    ],
    'auto_install': False,
    'installable': True,
}
