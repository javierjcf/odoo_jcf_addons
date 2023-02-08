odoo.define('web_widget_markdown_tests', function (require) {
    "use strict";
    var FormView = require('web.FormView');
    var testUtils = require('web.test_utils');

    QUnit.module('Markdown Widget Tests', {}, function () {
        QUnit.only('Test something', async function(assert) {
            assert.expect(1); // number of assertion we have in this
            assert.strictEqual(1, true);
        })
    })
 })