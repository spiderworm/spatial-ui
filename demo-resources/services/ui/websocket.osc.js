
var response = "\
screens/0/id ,s \"weapons\"\n\
screens/0/label ,s \"Weapons\"\n\
screens/0/visualizations/0 ,s \"demo-resources/services/camera1.json\"\n\
screens/0/panels/0/label ,s \"Torpedos\"\n\
screens/0/panels/0/controls/0 ,s \"weapons/torpedos/stock\"\n\
screens/0/panels/0/controls/1 ,s \"systems/tubes\"\n\
screens/0/panels/0/controls/2 ,s \"engineering/energy/levels/tubes\"\n\
screens/0/panels/0/x ,i 0\n\
screens/0/panels/0/y ,i 0\n\
screens/0/panels/0/z ,i 1\n\
screens/0/panels/1/label ,s \"Phasers\"\n\
screens/0/panels/1/controls/0 ,s \"weapons/phasers/switch\"\n\
screens/0/panels/1/controls/1 ,s \"weapons/phasers/frequency\"\n\
screens/0/panels/1/controls/2 ,s \"engineering/energy/levels/phasers\"\n\
screens/0/panels/1/x ,i 0\n\
screens/0/panels/1/y ,i 8\n\
screens/0/panels/1/z ,i 2\n\
screens/0/panels/2/label ,s \"a test\"\n\
screens/0/panels/2/x ,i 0\n\
screens/0/panels/2/y ,i 14\n\
screens/0/panels/2/z ,i 3\n\
screens/0/panels/3/label ,s \"another test\"\n\
screens/0/panels/3/x ,i 7\n\
screens/0/panels/3/y ,i 14\n\
screens/0/panels/3/z ,i 4\n\
screens/1/id ,s \"engineering\"\n\
screens/1/label ,s \"Engineering\"\n\
screens/1/panels/0/label ,s \"Weapon Power Levels\"\n\
screens/1/panels/0/controls/0 ,s \"engineering/energy/levels/phasers\"\n\
screens/1/panels/0/controls/1 ,s \"engineering/energy/levels/tubes\"\n\
screens/1/panels/0/x ,i 0\n\
screens/1/panels/0/y ,i 0\n\
screens/1/panels/0/z ,i 5\n\
screens/1/panels/1/label ,s \"Helm Power Levels\"\n\
screens/1/panels/1/controls/0 ,s \"engineering/energy/levels/impulse\"\n\
screens/1/panels/1/x ,i 9\n\
screens/1/panels/1/y ,i 0\n\
screens/1/panels/1/z ,i 6\n\
screens/2/id ,s \"helm\"\n\
screens/2/label ,s \"Helm\"\n\
screens/2/panels/0/label ,s \"stuff\"\n\
screens/2/panels/0/controls/0 ,s \"helm/impulse\"\n\
screens/2/panels/0/controls/1 ,s \"engineering/energy/levels/impulse\"\n\
screens/2/panels/0/x ,i 0\n\
screens/2/panels/0/y ,i 0\n\
screens/2/panels/0/z ,i 7\n\
";


self.postMessage(response);

