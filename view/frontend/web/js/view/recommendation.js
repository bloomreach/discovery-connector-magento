define(['uiComponent','pathwaysRecomSdk'], function (Component) {
    return Component.extend({
        initialize: function (config) {
            var self = this;
            this._super();
            this.widgetConfig = config.widgetConfig;
        },
        getWidgetTitle: function () {
            return this.widgetConfig.title;
        },
        getWidgetConfig: function () {
            return this.widgetConfig;
        },
        afterRender: function () {
            window.document.dispatchEvent(new Event("DOMContentLoaded", {
                bubbles: true,
                cancelable: true
            }));
        }
    });
});
