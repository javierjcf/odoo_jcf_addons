odoo.define('my_field_widget', function (require) {
    "use strict";
    var fieldRegistry = require('web.field_registry');
    var basicFields = require('web.basic_fields');
    
    
    var markdownField = basicFields.FieldText.extend({
        supportedFieldTypes: ['text'],
        className: 'o_field_markdown',
        jsLibs: [
            '/web_widget_markdown/static/lib/simplemde.min.js',
        ],
        
        // Parseamos el valor en Markdown con la librerría de SimpleMDE
        _renderReadonly: function () {
            this.$el.html(SimpleMDE.prototype.markdown(this.value));
        },
    });
    
    fieldRegistry.add('markdown', markdownField);
    
    return {
        markdownField: markdownField,
    };
    });