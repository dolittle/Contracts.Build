# [3.0.0] - 2021-3-27 [PR: #13](https://github.com/dolittle/Protobuf/pull/13)
## Summary

Reimplemented the JS/TS generations scripts to clean up a little bit, and to support more of the features that makes sense for dolittle/Contracts. The grpc-web generation has been removed until we have more experience with it and need it again.

### Added

- Ignoring empty gRPC service files before publish
- Rewriting import paths to support more accurate package structure and multi-package generation

### Changed

- The JS _binary_ has been replaced with a commander CLI (supporting the same style of execution)

### Deprecated

- grpc-web generation is not supported for now until we need it again.


# [2.0.6] - 2021-3-24 [PR: #12](https://github.com/dolittle/Protobuf/pull/12)
## Summary

Set npm registry address to force use of NODE_AUTH_TOKEN


# [2.0.5] - 2021-3-24 [PR: #11](https://github.com/dolittle/Protobuf/pull/11)
## Summary

Use `npm version` to set new version before publishing package.


# [2.0.4] - 2021-3-24 [PR: #10](https://github.com/dolittle/Protobuf/pull/10)
## Summary

Change from using `yarn` to `npm` for publishing package.


# [2.0.3] - 2021-3-24 [PR: #9](https://github.com/dolittle/Protobuf/pull/9)
## Summary

Adds `always-auth: true` to fix authentication for `yarn publish`.


# [2.0.2] - 2021-3-24 [PR: #8](https://github.com/dolittle/Protobuf/pull/8)
## Summary
This PR is here to force a release of #7 . That PR included updates to the JS dependency versions, and added a release pipeline for NPM.

### Added

- Release pipeline for JS

### Fixed

- Updated JS dependencies


