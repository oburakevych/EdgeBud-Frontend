var dialogModule = angular.module('ebDialogModule', []);

dialogModule.factory('jqueryUI', function ($window, $templateCache, $document, $compile) {
    return {
        wrapper: function (cssSelector, pluginName, options, templateName, dialogScope) {
            if (templateName) {
                var templateDom = $($templateCache.get(templateName));
                $document.append(templateDom);
                $compile(templateDom)(dialogScope);
            }

            $(cssSelector)[pluginName](options);
        },

        activateDialog: function(cssSelector, title, defaultButtons, onApplyFn, onCancelFn) {
            var options = {
                modal : true,
                draggable : true,
                resizable : true,
                show: {effect: 'drop', direction: "up"},
                hide: {effect: 'drop', direction: "up"},
                title : title,
                closeText: "Close",
                minHeight : 206,
                maxHeight : 600,
                minWidth : 375,
                width : 'auto',
                height : 'auto',
                position : {my: "center center", at: "center"},
                closeOnEscape: true
            }

            if (defaultButtons) {
                options.buttons = [
                           {
                               text: 'OK',
                               click: function() {
                                    $(this).dialog("close");
                                    if (onApplyFn) {
                                        onApplyFn();
                                    }
                               }
                           },
                           {
                               text: 'Cancel',
                               click: function() {
                                   $(this).dialog("close");
                                   if (onCancelFn) {
                                       onCancelFn();
                                   }
                               }
                           }
                ];
            }

            cssSelector['dialog'](options);
        },
        
        performAction: function(cssSelector, pluginName, action, options) {
            if(options){
                $(cssSelector)[pluginName](action, options);                                
            } else {
                $(cssSelector)[pluginName](action);                                
            }
        }
    };
});
