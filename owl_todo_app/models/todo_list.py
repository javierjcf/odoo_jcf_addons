# Copyright 2017-2020 ACSONE SA/NV
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import _, api, fields, models


class OwlTodo(models.Model):

    _name = "owl.todo.list"
    _description = "OWL Todo List App"

    name = fields.Char(string="Task Name")
    completed = fields.Boolean(string="Completed")
    color = fields.Char(string="Color")
