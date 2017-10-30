define([], function() {
    return async function(isDebug) {

        if (isDebug) {
            MainViewModel.unlockComponent(MainViewModel.goldUnlocked);
            MainViewModel.addGold(2000);
            return;
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const registerMessage = function(text) {
            MainViewModel.Terminal.info(text);
        }

        await sleep(200);
        registerMessage("POWER ON");
        await sleep(1800);
        registerMessage("Performing System Analys[0x000000] FATAL ERROR MEMCRPT");
        await sleep(400);
        registerMessage("INITIATING MEMORY BACKUP RECOVERY...");

        await sleep(2000);
        for (var i = 1; i <= 20; i++) {
            await sleep(50);
            registerMessage("0x143f71 0x4417f9 0xa3cc01 0x97d173 0x5bb12c 0x97d1c3 0x87bc12");
            await sleep(50);
            registerMessage("0xa3cc01 0x5bb12c 0x87bc12 0x86caad 0x143f71 0x42dead 0x4417f9");
            await sleep(50);
            registerMessage("0x87bc12 0x97d173 0x143f71 0x97d173 0x4417f9 0xa3cc01 0x97d1c3");
            await sleep(50);
            registerMessage("0x4281d1 0x9cd12f 0xfd11b8 0x329f12 0x2bc4af 0xd3adaf 0x791fad");
            await sleep(50);
            registerMessage("0x912fa1 0x891cad 0xfad512 0x255652 0xaa21fb 0xbbc147 0x912ada");
            await sleep(50);
            registerMessage("0xa3cc01 0x5bb12c 0x87bc12 0x86caad 0x143f71 0x42dead 0x4417f9");
        }

        registerMessage("MEMORY RECOVERY COMPLETE.");
        await sleep(150);
        registerMessage("REBOOTING...");
        await sleep(2000);
        MainViewModel.Terminal.totalLines.removeAll()

        await sleep(1000);
        registerMessage("POWER ON");
        await sleep(200);
        registerMessage("Performing System Analysis...");

        await sleep(600);
        registerMessage("QCPU: ONLINE");
        await sleep(100);
        registerMessage("MODEL: QUINTEL Q7770K @ 4.5QHz L1 Cache 4.096Qb");
        await sleep(400);

        for (var i = 1; i <= 4; i++) {
            registerMessage(`MEMORY SLOT ${i} A: [AVAIL] 4096Pb QQR5 25565qb/s`);
            await sleep(100);
            registerMessage(`MEMORY SLOT ${i} B: [AVAIL] 4096Pb QQR5 25565qb/s`);
            await sleep(100);
            registerMessage(`MEMORY SLOT ${i} C: [AVAIL] 4096Pb QQR5 25565qb/s`);
            await sleep(100);
            registerMessage(`MEMORY SLOT ${i} D: [AVAIL] 4096Pb QQR5 25565qb/s`);
        }

        await sleep(500);
        registerMessage("PERFORMING WRITE CHECK ...");
        await sleep(500);
        registerMessage("[OK]");
        await sleep(200);
        registerMessage("CHECKING IO-BUS ...");
        await sleep(300);
        registerMessage("IO-BUS [AVAIL]");

        // more damage reports
        await sleep(600);
        registerMessage("Undeterministic state !!!");
        await sleep(600);
        registerMessage("Analysing system logs: ");
        await sleep(2000);
        registerMessage("[WARN] Shield damage.");
        await sleep(400);
        registerMessage("[WARN] Shield damage.");
        await sleep(400);
        registerMessage("[WARN] LAM offline.");
        await sleep(400);
        registerMessage("[WARN] Shields critical.");
        await sleep(600);
        registerMessage("[WARN] Research offline.");
        await sleep(400);
        registerMessage("[CRIT] Hull breach detected.");
        await sleep(600);
        registerMessage("[WARN] Comms offline.");
        await sleep(300);
        registerMessage("[WARN] Shield damage.");
        await sleep(600);
        registerMessage("[WARN] Jump engines offline.");
        await sleep(800);
        registerMessage("[CRIT] Hull breach detected.");
        await sleep(1200);
        registerMessage("[CRIT] Hull breach detected.");
        await sleep(600);
        registerMessage("[CRIT] Starbord maneuvring engines offline.");
        await sleep(1200);
        registerMessage("[CRIT] Shields offline.");
        await sleep(400);
        registerMessage("[CRIT] Escape pods activated.");
        await sleep(1200);
        registerMessage("[CRIT] Power shortage imminant.");
        await sleep(600);
        registerMessage("[CRIT] Unidentiflllxx[0x01442ba]");
        await sleep(2000);
        registerMessage("CRITICAL SITUATION DETECTED: EMERGENCY PROCEDURES ACTIVATED");
        await sleep(2000);
        registerMessage("SITUATION ANALYSIS:");
        await sleep(1000);
        registerMessage("LIFE FORMS ON BOARD: 1");
        await sleep(1000);
        registerMessage("SWITCHING HIGHEST DIRECTIVE: SUSTAINING LIFE");
        await sleep(2000);
        registerMessage("CLOSE RANGE SCANNER [AVAIL]");
        await sleep(800);
        registerMessage("JUMP DRIVE [N. AVAIL]");
        await sleep(600);
        registerMessage("LAM [N. AVAIL]");
        await sleep(800);
        registerMessage("AUTOMATIC MINING [N. AVAIL]");
        await sleep(1200);
        registerMessage("MANUAL MINING [AVAIL]");
        await sleep(3000);
        registerMessage("SWITCHING HIGHEST DIRECTIVE: SYSTEM REPAIR");
        await sleep(3000);
        registerMessage("SWITCHING HIGHEST DIRECTIVE: RAW MATERIAL MINING");
        await sleep(1000);
        registerMessage("MANUAL MINING ONLINE.");

        MainViewModel.unlockComponent(MainViewModel.goldUnlocked)
    };
});