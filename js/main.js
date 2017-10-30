var MainViewModel = {};

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'text': '../lib/text',
        'view': '../html'
    }
});

define(['knockout', 'terminal', 'energy', 'economy', 'lam', 'jumpdrive', 'rd'], function(ko, terminal, energy, economy, lam, jumpdrive, rd) {

    MainViewModel.gold = ko.observable(0);
    MainViewModel.totalGold = ko.observable(0);
    MainViewModel.miners = ko.observableArray([]);
    MainViewModel.minerEfficency = ko.observable(1);
    MainViewModel.manualEfficency = ko.observable(1);
    MainViewModel.goldUnlocked = ko.observable(false);
    MainViewModel.economyUnlocked = ko.observable(false);
    MainViewModel.minersUnlocked = ko.observable(false);
    MainViewModel.researchUnlocked = ko.observable(false);
    MainViewModel.upgradesUnlocked = ko.observable(false);
    MainViewModel.energyUnlocked = ko.observable(false);
    MainViewModel.lamUnlocked = ko.observable(false);
    MainViewModel.jumpdriveUnlocked = ko.observable(false);

    MainViewModel.addGold = function(amount) {
        this.gold(this.gold() + amount);
        this.totalGold(this.totalGold() + amount);
    };

    MainViewModel.canAfford = function(price) {
        return this.gold() > price();
    };

    MainViewModel.subtractGold = function(amount) {
        this.gold(this.gold() - amount);
    };

    MainViewModel.unlockComponent = function(component) {
        component(true);
        setTimeout(() => component(false), 50);
        setTimeout(() => component(true), 100);
        setTimeout(() => component(false), 120);
        setTimeout(() => component(true), 140);
        setTimeout(() => component(false), 160);
        setTimeout(() => component(true), 200);
        setTimeout(() => component(false), 300);
        setTimeout(() => component(true), 400);
        setTimeout(() => component(false), 600);
        setTimeout(() => component(true), 900);
        setTimeout(() => component(false), 1000);
        setTimeout(() => component(true), 1500);
    }

    MainViewModel.Economy = new economy();
    MainViewModel.Energy = new energy();
    MainViewModel.Terminal = new terminal();
    MainViewModel.LAM = new lam();
    MainViewModel.Jumpdrive = new jumpdrive();
    MainViewModel.Research = new rd();

    ko.components.register('research', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.Research;
            }
        },
        template: { require: 'text!view/rd.html' }
    });

    ko.components.register('upgrades', {
        viewModel: { require: 'upgrades.js' },
        template: { require: 'text!view/upgrades.html' }
    });

    ko.components.register('economy', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.Economy;
            }
        },
        template: { require: 'text!view/economy.html' }
    });

    ko.components.register('terminal', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.Terminal;
            }
        },
        template: { require: 'text!view/terminal.html' }
    });

    ko.components.register('energy', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.Energy;
            }
        },
        template: { require: 'text!view/energy.html' }
    });

    ko.components.register('lam', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.LAM;
            }
        },
        template: { require: 'text!view/lam.html' }
    });

    ko.components.register('jumpdrive', {
        viewModel: {
            createViewModel: function(params, componentInfo) {
                return MainViewModel.Jumpdrive;
            }
        },
        template: { require: 'text!view/jumpdrive.html' }
    });

    ko.applyBindings(MainViewModel);

    require(['bootsequence'], boot => boot(true));
});