declare var System: any;
declare var require: Function;

module esriSystem {

  // return just the last part of a module name
  function moduleName(name, overrides) {
    if (overrides && overrides[name]) {
      return overrides[name];
    } else {
      return name.match(/[^\/]+$/).shift();      
    }
  }

  // takes an array of modules and registers them as a module
  // with system.js using the given module name
  function _register(mods, names, options = {outModuleName: 'esri', moduleNameOverrides: null}) {
    System.register(options.outModuleName, [], function (exp) {
      return {
        setters: [],
        execute: function () {
          mods.map(function (mod, idx) {
            exp(moduleName(names[idx], options.moduleNameOverrides), mod);
          });
        }
      };
    });
  }
  
  // load esri modules and expose via a System.js module
  export function register (moduleNames: string[], callback: Function, options) {
    // TODO: config should be optional, parse from arguments
    
    // call Dojo's require to load esri modules
    require(moduleNames, function (...modules) {
  
      // register a System.js module to wrap the required modules
      _register(modules, moduleNames, options);
  
      // call callback (if any)
      if (callback) {
        callback();
      }
    });
  };
}
