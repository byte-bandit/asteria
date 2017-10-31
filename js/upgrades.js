define(['knockout'], function(ko) {

    function ResearchWidgetViewModel(params) {

        this.purchaseUpgrade = function(upgrade) {
            if (MainViewModel.canAfford(upgrade.price)) {
                MainViewModel.subtractGold(upgrade.price());
                upgrade.effect();
                upgrade.purchased(true);
                MainViewModel.Terminal.info(`Upgrade purchased: ${upgrade.name}.`);
            }
        }

        this.upgrades = [{
            purchased: ko.observable(false),
            name: 'Automated Mining',
            desc: 'Repairs the damanged Automatic Minig Module.',
            condition: ko.computed(() => true),
            price: () => 50,
            effect: function() { MainViewModel.unlockComponent(MainViewModel.minersUnlocked) }
        }, {
            purchased: ko.observable(false),
            name: 'Economy Info Module',
            desc: 'Enables economic feedback.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 100; }),
            price: () => 250,
            effect: function() { MainViewModel.unlockComponent(MainViewModel.economyUnlocked) }
        }, {
            purchased: ko.observable(false),
            name: 'Binary decrypter',
            desc: 'Unlocks research.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 1000; }),
            price: () => 1000,
            effect: () => MainViewModel.unlockComponent(MainViewModel.researchUnlocked)
        }, {
            purchased: ko.observable(false),
            name: 'LAM Reconstruction',
            desc: 'Enables large asteroid mining.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 10000; }),
            price: () => 10000,
            effect: () => MainViewModel.unlockComponent(MainViewModel.lamUnlocked)
        }, {
            purchased: ko.observable(false),
            name: 'Jumpdrive repairs',
            desc: 'Unlocks the ships jumpdrive.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 100000; }),
            price: () => 100000,
            effect: () => MainViewModel.unlockComponent(MainViewModel.jumpdriveUnlocked)
        }, {
            purchased: ko.observable(false),
            name: 'Automated Macro-Lasers',
            desc: 'Miners are twice as effective.',
            condition: ko.computed(function() { return MainViewModel.miners().length > 1; }),
            price: () => 500,
            effect: function() { MainViewModel.minerEfficency(MainViewModel.minerEfficency() * 2) }
        }, {
            purchased: ko.observable(false),
            name: 'Automated Macro-Lasers 2.0',
            desc: 'Miners are four times as effective.',
            condition: ko.computed(function() { return MainViewModel.miners().length > 1; }),
            price: () => 10000,
            effect: function() { MainViewModel.minerEfficency(MainViewModel.minerEfficency() * 2) }
        }, {
            purchased: ko.observable(false),
            name: 'Automated Macro-Lasers 4.0',
            desc: 'Miners are eight times as effective.',
            condition: ko.computed(function() { return MainViewModel.miners().length > 25; }),
            price: () => 50000,
            effect: function() { MainViewModel.minerEfficency(MainViewModel.minerEfficency() * 2) }
        }, {
            purchased: ko.observable(false),
            name: 'Automated Macro-Lasers 8.0',
            desc: 'Miners are 16 times as effective.',
            condition: ko.computed(function() { return MainViewModel.miners().length > 45; }),
            price: () => 250000,
            effect: function() { MainViewModel.minerEfficency(MainViewModel.minerEfficency() * 2) }
        }, {
            purchased: ko.observable(false),
            name: '10MW Laser',
            desc: 'Manual mining is ten times more effective.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 100; }),
            price: () => 1000,
            effect: function() { MainViewModel.manualEfficency(MainViewModel.manualEfficency() * 10) }
        }, {
            purchased: ko.observable(false),
            name: '100MW Laser',
            desc: 'Manual mining is ten times more effective.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 200; }),
            price: () => 10000,
            effect: function() { MainViewModel.manualEfficency(MainViewModel.manualEfficency() * 10) }
        }, {
            purchased: ko.observable(false),
            name: '1GW Laser',
            desc: 'Manual mining is four times more effective.',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 10000; }),
            price: () => 100000,
            effect: function() { MainViewModel.manualEfficency(MainViewModel.manualEfficency() * 4) }
        }, {
            purchased: ko.observable(false),
            name: '2.21GW Laser',
            desc: 'What the hell is a Gigawatt anyway?',
            condition: ko.computed(function() { return MainViewModel.totalGold() > 100000; }),
            price: () => 1000000,
            effect: function() { MainViewModel.manualEfficency(MainViewModel.manualEfficency() * 2) }
        }, {
            purchased: ko.observable(false),
            name: 'Sun trackers',
            desc: 'Tries to align the ship with the sun in order to minimize solar array output fluctuation.',
            condition: ko.computed(function() { return MainViewModel.Energy.solarArrays() > 5; }),
            price: () => 4000,
            effect: function() { MainViewModel.Energy.solarArraySunTrackingUnlocked(true); }
        }, {
            purchased: ko.observable(false),
            name: 'Nuclear batteries',
            desc: 'Enables a more stable energy production, but depletes over time.',
            condition: ko.computed(function() { return MainViewModel.Energy.solarArrays() > 10; }),
            price: () => 10000,
            effect: function() { MainViewModel.Energy.nuclearBatteriesUnlocked(true); }
        }, {
            purchased: ko.observable(false),
            name: 'Fusion reactors',
            desc: 'A powerful energy source which will not deplete like nuclear batteries.',
            condition: ko.computed(function() { return MainViewModel.Energy.nuclearBatteries() > 10; }),
            price: () => 100000,
            effect: function() { MainViewModel.Energy.fusionReactorsUnlocked(true); }
        }];

        MainViewModel.totalGold.subscribe(function(newValue) {
            if (newValue > 20) {
                MainViewModel.unlockComponent(MainViewModel.upgradesUnlocked);
                MainViewModel.Terminal.info(`RAW MEMORY EXTRACTED TO DATABASE DUMP.`)
                MainViewModel.Terminal.info(`PARSING DATABASE DUMP...`);
                MainViewModel.Terminal.info(`OPERATIONS: [AVAIL]`);
                this.dispose();
            }
        });
    }

    return ResearchWidgetViewModel;
});