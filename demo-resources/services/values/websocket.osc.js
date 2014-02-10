
var response = "\
/helm/impulse ,f 10\n\
/engineering/energy/levels/impulse ,f 150\n\
/engineering/energy/levels/tubes ,f 100\n\
/engineering/energy/levels/phasers ,f 25\n\
/weapons/ammo/torpedos ,f 15\n\
/weapons/phasers/enabled ,i 1\n\
/weapons/phasers/frequency ,s C\n\
/systems/tubes/1/currentAmmo ,s torpedos\n\
/systems/tubes/1/loadedPercent ,f 0.5\n\
/systems/tubes/1/fire ,i 0\n\
/systems/tubes/1/keepLoaded ,i 0\n\
/systems/tubes/1/autoFire ,i 0\n\
/systems/tubes/2/currentAmmo ,s nuke\n\
/systems/tubes/2/loadedPercent ,f 1\n\
/systems/tubes/2/fire ,i 0\n\
/systems/tubes/2/keepLoaded ,i 1\n\
/systems/tubes/2/autoFire ,i 1\n\
";

self.postMessage(response);

