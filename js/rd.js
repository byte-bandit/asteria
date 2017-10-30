define(['knockout'], function(ko) {

    function ResearchWidgetViewModel(params) {
        this.rp = ko.observable(0);
        this.rpGain = ko.observable(1);
        this.manualStimulationUnlocked = ko.observable(false);

        setInterval(() => {
            if (MainViewModel.researchUnlocked()) {
                this.rp(this.rp() + this.rpGain());
            }
        }, 1000);

        this.projects = [{
            purchased: ko.observable(false),
            name: 'Manual neural brain stimulation',
            desc: 'Enables active research participation.',
            condition: ko.computed(() => true),
            price: () => 120,
            effect: () => { this.manualStimulationUnlocked(true); }
        }];
    }

    ResearchWidgetViewModel.prototype.stimulate = function() {
        this.rp(this.rp() + 1);
    };

    ResearchWidgetViewModel.prototype.canAfford = function(amount) {
        return this.rp() >= amount();
    };

    ResearchWidgetViewModel.prototype.purchaseUpgrade = function(upgrade) {
        if (MainViewModel.Research.canAfford(upgrade.price)) {
            upgrade.purchased(true);
            upgrade.effect();
        }
    };

    return ResearchWidgetViewModel;
});