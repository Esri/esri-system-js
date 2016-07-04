/*
  Copyright 2016 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

declare var System: any;
declare var require: Function;

module esriSystem {

    // return just the last part of a module name
    function moduleName(name: string, overrides?: any) {
        if (overrides && overrides[name]) {
            return overrides[name];
        } else {
            return name.match(/[^\/]+$/).shift();
        }
    }

    //get the module name from the url that system js thinks it's loading it from
    function getName(location: string) {
        let startIndex = location.lastIndexOf("esri");
        if (startIndex === -1) startIndex = location.lastIndexOf("dojo");
        return location.substring(startIndex, location.length);
    }

    function registerToOutModule(mods, names, options: any) {
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

    // takes an array of modules and registers them
    // with system.js using the given module name(s)
    function _register(mods, names: string[], options: any) {
        const opts = options || {};

        if (opts.outModuleName) {
            // register all modules into a new module w/ the given name (i.e. 'esri-mods')
            registerToOutModule(mods, names, opts);
            return;
        }

        //maintaining the module names so loop each module and register individually.
        for (var i = 0, len = mods.length; i < len; i++) {

            System.register(names[i], [], function (exp, idObj) {
                let name = getName(idObj.id);
                let index = names.indexOf(name);
                let mod = mods[index];
                let result = {
                    setters: [],
                    execute: () => {
                        //Make the name 'default' here as there is only one export per module so it is technically the default.
                        //Import using a default import statement - eg: import Map from 'esri/Map' 
                        //It's possible this may only compile using 'system' module type in some IDEs using the official typings file though.
                        exp("default", mod);
                    }
                };
                return result;
            });
        }
    }

    // load esri modules and expose via a System.js module
    export function register(moduleNames: string[], callback: Function, options) {
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