# esri-system-js
Load [ArcGIS API for JavaScript] modules using [SystemJS]

Provides a wrapper around [SystemJS]'s `register()` function
that will fist use Dojo's AMD loader to load Esri modules,
and then register a SystemJS module that will expose them.

## Quick Start
For example, if you wanted to use [ArcGIS API for JavaScript] modules in your [TypeScript] code in an [Angular 2] application.

1) Install:
```bash
npm install esri-system-js
```

2) Include (in index.html):
```
<!-- load SystemJS library -->
<script src="node_modules/systemjs/dist/system.src.js"></script>

<!-- load Esri library -->
<link rel="stylesheet" href="//js.arcgis.com/4.0/esri/css/main.css">
<script src="//js.arcgis.com/4.0/"></script>

<!-- load esri-system-js library -->
<script src="node_modules/esri-system-js/dist/esriSystem.js"></script>
```

3) Configure (in index.html):
```html
<script>
// configure system.js
System.config({
  packages: {
    app: {
      defaultExtension: 'js'
    }
  }
});

// load esri modules needed by this application
// and then regsiter each as it's own SystemJS module
esriSystem.register(
  // array of Esri module names to load and then register with SystemJS
  [
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/Home/HomeViewModel',
    'esri/request'
  ],

  // optional callback function
  function() {
    // then bootstrap application
    System.import('app/boot')
      .then(null, console.error.bind(console));
  });
</script>
```

4) Import modules (in app/boot.ts or any other application module):
```ts
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import esriRequest from 'esri/widgets/Home/HomeViewModel';
```

If you're writing your application code in TypeScript, you can now get type checking and intellisense for the above modules by downloading and using the [ArcGIS API for JavaScript type definitions].

## Registering as a Single Module

You can supply a third, optional argument to `esriSystem.register()` with options to register all the required Esri modules to a single new module. Note that registering all modules as a single SystemJS module will **not** work with the [ArcGIS API for JavaScript type definitions]). 

```js
// load esri modules needed by this application
// and then regsiter a new SystemJS module that exposes them
esriSystem.register(
  // array of Esri module names to load and then register with SystemJS
  [
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/Home/HomeViewModel',
    'esri/request'
  ],

  // optional callback function
  function() {
    // then bootstrap application
    System.import('app/boot')
      .then(null, console.error.bind(console));
  },
  // options to register a new, single SystemJS module
  {
    // name of SystemJS module that you will import from
    outModuleName: 'esri-mods',
    // by default each module will use everything after the last '/' in their name
    // however you can override that for specific modules here
    moduleNameOverrides: {
      'esri/request': 'esriRequest'
    }
  });
</script>
```

Now you can import these modules as follows:
```ts
import { Map, MapView, esriRequest } from 'esri-mods';
```

## Why?

The [ArcGIS API for JavaScript] is based on Dojo, which uses AMD modules, and [SystemJS] can load AMD modules, so why is this needed? We've not been able to figure out a way to have [SystemJS] load Esri's modules directly. As with other loaders that support AMD, the issue is around plugins. You can see a summary of the issue [here](https://twitter.com/tomwayson/status/709456083388014594).

## Example Applications
See these applications for examples of how to use this library:
- [jwasilgeo/angular2-esri-playground](https://github.com/jwasilgeo/angular2-esri-playground) - Angular 2 & Esri 4 [View it live](http://jwasilgeo.github.io/angular2-esri-playground/)

Have you built an application using esri-system-js? [Let us know](https://github.com/Esri/esri-system-js/issues/14) and we'll add it here.

## Development Instructions

Make sure you have [Node](http://nodejs.org/) installed.

1. [Fork and clone this repo](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-system-js` folder
3. Install the dependencies with `npm install`
4. run `npm start` from the command line. This will run the [TypeScript] compiler then start a local web server hosting the application under the `docs` folder
5. Modify the source files (under `src`)
6. Make a [pull request](https://help.github.com/articles/creating-a-pull-request) to contribute your changes

## Credit
This pattern was established by [@odoe](https://github.com/odoe/) in the [load.js](https://github.com/odoe/esrijs4-vm-angular2/blob/d309f546d1d183064e4b60d69ba88e9047ebc26c/app/load.ts) file of his [example of using ErsiJS 4.0 view models with Angular 2](https://github.com/odoe/esrijs4-vm-angular2).

Later, [@nickcam](https://github.com/nickcam) came up with [the idea to register one SystemJS module for each Esri module required and maintain the exact same module names](https://github.com/Esri/esri-system-js/pull/10), which makes it possible to use the [ArcGIS API for JavaScript type definitions] for the modules you import.

## Resources
* [ArcGIS API for JavaScript]
* [SystemJS]
* [TypeScript]
* [Angular 2]

[SystemJS]:https://github.com/systemjs/systemjs
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/
[TypeScript]:http://www.typescriptlang.org/
[ArcGIS API for JavaScript type definitions]:https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript
[Angular 2]:https://angular.io/

## Issues

Find a bug or want to request a new feature?  Please let us know by [submitting an issue](https://github.com/esri/esri-system-js/issues).  Thank you!

## Contributing

Anyone and everyone is welcome to contribute. Please see our [guidelines for contributing](https://github.com/Esri/esri-system-js/blob/master/CONTRIBUTING.md).

## Licensing
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

A copy of the license is available in the repository's [license.txt](https://raw.github.com/Esri/esri-system-js/master/LICENSE) file.

[](Esri Tags: ArcGIS Esri SystemJS TypeScript)
[](Esri Language: JavsScript)
