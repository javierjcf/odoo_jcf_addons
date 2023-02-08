odoo.define('web_widget_markdown', function (require) {
    "use strict";
    var fieldRegistry = require('web.field_registry');
    var basicFields = require('web.basic_fields');
    
    
    var markdownField = basicFields.FieldText.extend({
        supportedFieldTypes: ['text'],
        className: 'o_field_markdown',
        
        // Lo sobreescribo para mostrar algo diferente que el valor
        _renderReadonly: function () {
            this.$el.html("<h1>Hello world</h1>");
        },
    });
    
    fieldRegistry.add('markdown', markdownField);
    
    return {
        markdownField: markdownField,
    };
});