# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

[Upcoming changes][unreleased]

## [v1.0.0-beta.0]
### Added
- option to maintain module names, offering compatibility with official type definitions

### Changed
- if no options are supplied to register(), default to maintaing module names

## [v0.0.3]

### Changed
- added comments about licensing and copyright
- minor formatting clean up

### Support
- Fleshed out README w/ Quick Start, Developer Instructions, etc
- Added CONTRIBUTING
- Added contributor info to packge.json and updated repo URL

## [v0.0.2]

### Changed
- allow user to supply partial options to esriSytem.register()
and use defaults for others #3

## [v0.0.1]

### Added
- esriSystem which exposes `.register()` which
loads esri modules and registers them w/ SystemJS

### Support
- installed typescript as a dev dependency and
added npm scripts to compile TS
- added .gitignore for TS ouput files and
.npmignore to include those files when publishing to NPM
- added "docs" to README and started CHANGELOG

[unreleased]: https://github.com/arcgis/esri-system-js/compare/v1.0.0-beta.0...HEAD
[v1.0.0-beta.0]: https://github.com/arcgis/esri-system-js/compare/v0.0.2...v1.0.0-beta.0
[v0.0.3]: https://github.com/arcgis/esri-system-js/compare/v0.0.2...v0.0.3
[v0.0.2]: https://github.com/arcgis/esri-system-js/compare/v0.0.1...v0.0.2
[v0.0.1]: https://github.com/arcgis/esri-system-js/commits/v0.0.1
