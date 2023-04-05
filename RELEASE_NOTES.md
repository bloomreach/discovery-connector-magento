## 1.6.1

## Fixed

- [`FIXED`]: Removed some debugging fragments left behind

## 1.6.0

## Added

- [`ADDED`]: Currency Symbol can now be configured in the extension settings

## Fixed

- [`FIXED`]: Addressed additional pixel event issues with the search page
- [`FIXED`]: Addressed issues with facets renering in the search results
- [`FIXED`]: Display Module version information in the module configuration Settings
- [`FIXED`]: Updated deploy-qa to target the Vultr Magento-Docker instance
- [`FIXED`]: Magento installation stabilized to a project hash instead of master to ensure the installation does not fail.

## 1.5.1

## Fixed

- [`FIXED`]: Addressed more SDK issues and reliability with loading and re-entrant problems

## 1.5.0

## Added

- [`ADDED`]: Created a DNS command to make it easier to visit the magento dev environment from a mobile device. Simply run the dns command then set your mobile device dns to the IP of your dev machine. Then magento.test will become available to the mobile device. (Mac only)
- [`ADDED`]: Template and SDK fixes have been applied, along with the introduction of additional properties being available within the search template like 'autoCorrectQuery' and response and facet sections with the raw property. Some of these properties represent the raw data retrieved from the API to provide wide open access to those details in the template.

## Fixed

- [`FIXED`]: Corrected method exists logic in ScriptInit to prevent errors on pages where the method does not exist.
- [`FIXED`]: SDK javascript is no longer minified, allowing for easier patching and debugging
- [`FIXED`]: Fetch method used has been modified to account for some nuances of magento automatically modifying/validating AJAX requests

## 1.4.1

## Fixed

- [`FIXED`]: Forced github to accept case change for api folder to be capitalized

## 1.4.0

## Added

- [`ADDED`]: Devops scripts for dev and installation have been added in

## Fixed

- [`FIXED`]: Updated README and added magento shut down process when dev is exited
- [`FIXED`]: Pr-release script has been fixed to work quicker and more stable within the gitlab environment
- [`FIXED`]: Magento Install has now been tested with troubleshooting across multiple devices
- [`FIXED`]: Pr-release adjusted from use of master to main

## 1.3.3

## Fixed

- [`FIXED`]: Additional release script fixes

## 1.3.0

## Added

- [`ADDED`]: Added in qa deploy script for easier to understand steps to get the current code base to QA
- [`ADDED`]: Adding bin scripts to aid in devops for this project

## Fixed

- [`FIXED`]: Add to cart events now work for product grids
- [`FIXED`]: Basket sent in pixel event is now populated with correct identifiers
- [`FIXED`]: Add to cart event no longer send pixel on validation failure
- [`FIXED`]: Adjustments to the pixel add to cart event identifiers completed
- [`FIXED`]: Added composer config that is required for installation of this extension
- [`FIXED`]: Merged in latest fixes for magento extension
- [`FIXED`]: Added composer config that is required for installation of this extension
- [`FIXED`]: Merged in latest fixes for magento extension

## 1.2.5

## Added

- [`ADDED`]: This is the initial project in it's state handed over from the BORN group.
