define(['knockout'], function(ko) {

    function EnergyWidgetViewModel(params) {
        this.solarArrays = ko.observable(1);
        this.solarArrayEfficency = ko.observable(1);
        this.solarArraySunPosition = ko.observable(0);
        this.solarArraySunInfluence = [1, .9, .8, .7, .6, .5, .4, .6, .8, .9, ]
        this.solarArraySunTrackingUnlocked = ko.observable(false);
        this.solarArrayPrice = ko.computed(() => { return 100 + Math.floor(Math.pow(2, 1.5)) * this.solarArrays() * 100; });
        this.solarArrayOutput = ko.computed(() => { return this.solarArrayEfficency() * this.solarArraySunInfluence[this.solarArraySunPosition()] * 100; });

        this.nuclearBatteriesUnlocked = ko.observable(false);
        this.nuclearBatteries = ko.observable(0);
        this.nuclearBatteryEfficency = ko.observable(1);
        this.nuclearBatteryDepletion = ko.observable(1);
        this.nuclearBatteryPrice = ko.computed(() => { return 1000 + this.nuclearBatteries() * 1000; });
        this.nuclearBatteryOutput = ko.computed(() => { return this.nuclearBatteryEfficency() * this.nuclearBatteryDepletion() * 400; });

        this.fusionReactorsUnlocked = ko.observable(false);
        this.fusionReactors = ko.observable(0);
        this.fusionReactorEfficency = ko.observable(1);
        this.fusionReactorPrice = ko.computed(() => { return 10000 + this.fusionReactors() * 10000; });
        this.fusionReactorOutput = ko.computed(() => { return this.fusionReactorEfficency() * 1000; });

        this.production = ko.computed(() => { return this.solarArrays() * this.solarArrayOutput() + this.nuclearBatteries() * this.nuclearBatteryOutput() + this.fusionReactors() * this.fusionReactorOutput(); });
        this.consumption = ko.observable(0);
        this.currentDrain = ko.observable(0);
        this.balance = ko.computed(() => { return this.production() - this.consumption(); });

        setInterval(() => {
            this.consumption(this.currentDrain());
            this.currentDrain(0);
        }, 1000);
        setInterval(() => this.nuclearBatteryDepletion(this.nuclearBatteryDepletion() * 0.9), 42 * 1000);
        setInterval(() => {
            this.solarArraySunPosition(this.solarArraySunPosition() + 1);
            if (this.solarArraySunTrackingUnlocked() && this.solarArraySunPosition() > 2) this.solarArraySunPosition(9);
            if (this.solarArraySunPosition() > 9) this.solarArraySunPosition(0);
        }, 10 * 1000)

        MainViewModel.totalGold.subscribe(function(newValue) {
            if (newValue > 200) {
                MainViewModel.unlockComponent(MainViewModel.energyUnlocked);
                MainViewModel.Terminal.info(`IO-BUS EVENT INTERCEPT.`)
                MainViewModel.Terminal.info(`ENERGY MANAGEMENT: [AVAIL]`)
                this.dispose();
            }
        });
    }

    EnergyWidgetViewModel.prototype.buildSolarArray = function() {
        if (MainViewModel.canAfford(this.solarArrayPrice)) {
            MainViewModel.subtractGold(this.solarArrayPrice());
            this.solarArrays(this.solarArrays() + 1);
        }
    };

    EnergyWidgetViewModel.prototype.buildNuclearBattery = function() {
        if (MainViewModel.canAfford(this.nuclearBatteryPrice)) {
            MainViewModel.subtractGold(this.nuclearBatteryPrice());
            this.nuclearBatteries(this.nuclearBatteries() + 1);
            this.nuclearBatteryDepletion(1);
        }
    };

    EnergyWidgetViewModel.prototype.buildFusionReactor = function() {
        if (MainViewModel.canAfford(this.fusionReactorPrice)) {
            MainViewModel.subtractGold(this.fusionReactorPrice());
            this.fusionReactors(this.fusionReactors() + 1);
        }
    };

    EnergyWidgetViewModel.prototype.tryDrain = function(amount) {
        this.currentDrain(this.currentDrain() + amount);
        return this.currentDrain() <= this.production();
    };

    return EnergyWidgetViewModel;
});