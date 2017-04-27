// POM.Prefab.Schema.Routes
// A list of routes from POM modules

POM.Prefab.Schema.Routes = {
    
    // To add the routes for NAUTILUS modules, 
    // all we do here is list the modules we need. 
    // When we start building the routes table of the registry,
    // we'll create instances of each module in this list, 
    // then we'll build the routes using each of those instances,
    // along with the list of routes from NAUTILUS.App.Prefab.Schema.Routes.
    
    // ADDENDUM:
    // Because of the fucked-up way that using strings with the 'new'
    // constructor works, we gotta get creative with this.
    // This is how this is going to work:
    // For each module you want to import, you add the namespace as a string,
    // BUT WITHOUT THE PRECEDING 'NAUTILUS'. 
    // For example, instead of adding 'NAUTILUS.App.Lib.Butt', you would add
    // 'App.Lib.Butt', and then we'll create the new object using the form:
    // varName = new NAUTILUS[strArray[0]][strArray[1]][strArray[2]]();
    
    NAUT_IMPORTS: [
        // for the draw loop
        'App.Lib.Draw',
        
        
    ],
    
    
    
};