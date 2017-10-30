define(['knockout'], function(ko) {

    function TerminalWidgetViewModel(params) {
        this.totalLines = ko.observableArray([]);
        this.lines = ko.computed(() => this.totalLines().slice(0, 3).reverse());
    }

    TerminalWidgetViewModel.prototype.info = function(text) {
        this.totalLines.unshift(text);
    };

    return TerminalWidgetViewModel;
});