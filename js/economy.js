define(['knockout'], function(ko) {

    function miner() {
        setInterval(() => this.update(), 1000);
    }

    miner.prototype.update = function() {
        if (MainViewModel.Energy.tryDrain(MainViewModel.Economy.minerCostKw())) {
            MainViewModel.addGold(MainViewModel.minerEfficency());
        }
    };

    function EconomyWidgetViewModel(params) {
        this.minerCost = ko.computed(function() { return 10 + Math.floor(Math.pow(MainViewModel.miners().length, 2.5)); });
        this.minerCostKw = ko.computed(() => 15 * MainViewModel.minerEfficency());
    }

    EconomyWidgetViewModel.prototype.mineGoldCommand = function() {
        MainViewModel.addGold(MainViewModel.manualEfficency());
    };

    EconomyWidgetViewModel.prototype.recruitMinerCommand = function() {
        if (MainViewModel.canAfford(this.minerCost)) {
            MainViewModel.subtractGold(this.minerCost());
            MainViewModel.miners.push(new miner());
        }
    };

    return EconomyWidgetViewModel;
});