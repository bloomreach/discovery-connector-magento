#!/usr/bin/env node
const commander = require("commander");
const path = require("path");
const shell = require("shelljs");

const { Command } = commander;
const program = new Command();
const options = {};

function getOptions() {
  options.debug = program.debug;
  options.verbose = program.verbose;
  options.pattern = program.pattern;

  return options;
}

program.version("0.0.1");
program.option(
  "-v, --verbose",
  "Outputs more detailed information during crashes."
);
program.option(
  "--debug [param]",
  `
    Provides debugging contextual information various commands might use to
    aid in developing Lyra.
  `
);
program.option(
  "-p, --pattern [param]",
  `
    Provides a pattern for certain operations to utilize. This is primarily
    used by unit tests to filter tests to specified tests.
  `
);

program
  .command("reset-package [directory]")
  .description(
    `
  DEBUGGING TOOL:
  This resets the projects package.json to an empty project thus allowing
  testing of the design system from scratch.
`
  )
  .action((directory) => {
    directory = directory || path.resolve(".");
    const installPath = path.resolve(directory);
    require("./commands/install")(installPath, true, false, getOptions()).catch(
      (err) => {
        console.warn("reset-package process exited unexpectedly");
        if (program.verbose) console.warn(err.stack || err.message);
      }
    );
  });

program
  .command("reset-files [directory]")
  .description(
    `
  DEBUGGING TOOL:
  This resets the projects file structure to an empty project thus allowing
  testing of the design system from scratch.
`
  )
  .action((directory) => {
    directory = directory || path.resolve(".");
    const installPath = path.resolve(directory);
    require("./commands/install")(installPath, false, true, getOptions()).catch(
      (err) => {
        console.warn("reset-files process exited unexpectedly");
        if (program.verbose) console.warn(err.stack || err.message);
      }
    );
  });

program
  .command("dev")
  .description(
    `
  Starts up a developer environment that performs incremental builds while
  developing within this project.
`
  )
  .action(() => {
    require("./commands/dev")(getOptions()).catch((err) => {
      console.warn("dev process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("dev-link [link]")
  .description(
    `
  Starts up a developer environment that performs incremental builds while
  developing within the lib and app folders.
`
  )
  .action((link) => {
    require("./commands/dev-link")(
      link,
      path.resolve(process.cwd()),
      getOptions()
    ).catch((err) => {
      console.warn("dev-link process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("url [uri...]")
  .description(
    `
  Simple command to open a specified URL in the browser.
`
  )
  .action((uri) => {
    require("./commands/url")(uri).catch((err) => {
      console.warn("url process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("release [alternate]")
  .description(
    `
  Performs actions necessary to update the distribution of the project. This
  will automatically update release notes, tag the release, and commit and push
  to a 'release' branch which will be ready for merging into master and dev.
  This will also update a static release of the project that will make your test
  environment available as a static web page.

  Specify a dev version to work out of an alternative dev branch that is
  different from the main branch of development. You can specify:

  npm run release v1

  to make a release based on the dev-v1 branch. Specifying this alternate will make
`
  )
  .action((alternate) => {
    // Before starting the release script make sure our packages are up to date to the latest
    shell.exec("npm i");
    // Do a super fast TS check to rapid error out before any other steps take place
    require("./commands/ts")()
      // Do the full release cycle
      .then(() =>
        require("./commands/release")("bundle", alternate, getOptions())
      )
      .catch((err) =>
        console.warn(
          "Release process exited unexpectedly\n",
          err.stack || err.message
        )
      );
  });

program
  .command("release-notes")
  .description(
    `
    This runs the release-notes script. For this case, it will only display the
    release notes in the console. Actual generated release notes are a part of
    the release process.
  `
  )
  .action(() => {
    require("./commands/ts")()
      .then(() => {
        console.warn("TS check passed, generating notes...");
        // Before starting the release script make sure our packages are up to date to the latest
        require("./commands/release-notes")().catch((err) =>
          console.warn(
            "release-notes process exited unexpectedly",
            err.message || err.stack
          )
        );
      })
      .catch((err) => {
        console.warn(
          "Failed TS check. Release notes will not be produced until all TS errors are resolved."
        );
        console.warn(err.stack || err.message);
      });
  });

program
  .command("start [target]")
  .description(
    `
  This fires up a server to make any static content available for being served.

  There are a few options for what content will be served by this script:

    - The web app
    - Lyra API

  The start script will automatically pick the web app over the lyra files, but
  you can specify a target if you have a lyra API and a web app:

    - app
    - lyra
`
  )
  .action((target) => {
    require("./commands/start")(target, getOptions()).catch((err) => {
      console.warn("start process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("unit-test")
  .description(
    `
  Runs all unit tests in the unit-test folder.
`
  )
  .action(() => {
    require("./commands/unit-test")(getOptions()).catch((err) => {
      console.warn("unit-test process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("unit-test-dev")
  .description(
    `
  Starts up the unit tests in the unit-test folder. This also re-runs the tests
  automatically when changes are made to the tests or to the source code.
`
  )
  .action(() => {
    require("./commands/unit-test-dev")(getOptions()).catch((err) => {
      console.warn("unit-test-dev process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("unit-test-debug")
  .description(
    `
  This is the same as unit-test-dev, EXCEPT this will cause the process to halt
  and wait for a debugger to be attached before continuing.
  You can use the Chrome url: chrome://inspect/#devices
  to easily attach a chrome debugger when this is used.
`
  )
  .action(() => {
    require("./commands/unit-test-debug")().catch((err) => {
      console.warn("unit-test-debug process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("update")
  .description(
    `
  This scans your project to see if there are any changes needed to update your
  project to make it compliant with the latest design system.
`
  )
  .action(() => {
    require("./commands/update")().catch((err) => {
      console.warn("update process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("sync")
  .description(
    `
  This scans your project to look for any resources that should have
  automatically generated files be created, and will also look at generated
  files for files that should be removed. This will provide prompts for the
  actions so you can see what will happen before deciding if the sync should be
  allowed to take those actions.
`
  )
  .action(() => {
    require("./commands/sync")().catch((err) => {
      console.warn("sync process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("clean-dts")
  .description(
    `
  Sometimes fiddling around with build systems with typescript, you can mess up.
  You will know you messed up, because .d.ts files will show up next to ALL of
  your source code. This helps you clean up your shame without leaving a trace.
`
  )
  .action(() => {
    require("./commands/clean-dts")().catch((err) => {
      console.warn("clean-dts process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("clean")
  .description(
    `
  Cleans out build and cache files to help ensure a complete rebuild takes
  place.
`
  )
  .action(() => {
    require("./commands/clean")().catch((err) => {
      console.warn("clean process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("ts")
  .description(
    `
  Runs typescript compilation to check for errors. Does NOT emit files, thus is
  a good mechanism for checking a build before running a release. This can also
  be ran as a nodemon process to get continuous feedback while developing if
  needed.
`
  )
  .action(() => {
    require("./commands/ts")().catch((err) => {
      console.warn("ts process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("ticket [url] [name]")
  .description(
    `
  Creates a branch and sets up development against a specified ticket URL.
  Creating the ticket branch using this method will ensure the branch can
  quickly navigate to the associated ticket.
`
  )
  .action((url, name) => {
    require("./commands/ticket")(url, name).catch((err) => {
      console.warn("ticket process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("view-ticket")
  .description(
    `
  This command only works if you are on a ticket branch that was created via
  the ticket command. It will open the URL for the ticket in your default
  browser.
`
  )
  .action(() => {
    require("./commands/view-ticket")().catch((err) => {
      console.warn("view-ticket process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("pr-ticket [repoUrl] [repoType]")
  .description(
    `
  This command only works if you are on a ticket branch that was created via
  the ticket command. It will open the URL for the ticket in your default
  browser.
`
  )
  .action((repoUrl, repoType) => {
    require("./commands/pr-ticket")(repoUrl, repoType, getOptions()).catch(
      (err) => {
        console.warn("pr-ticket process exited unexpectedly");
        console.warn(err.stack || err.message);
      }
    );
  });

program
  .command("pr-release [repoUrl] [repoType]")
  .description(
    `
  This command will open two release PRs for your project. These PRs will be for
  the current release branch to be merged to dev and master.
`
  )
  .action((repoUrl, repoType) => {
    require("./commands/pr-release")(repoUrl, repoType, getOptions()).catch(
      (err) => {
        console.warn("pr-release process exited unexpectedly");
        console.warn(err.stack || err.message);
        process.exit(1);
      }
    );
  });

program
  .command("fix-mac-firewall")
  .description(
    `
  While developing (especially with the npm module 'n') you will get caught into
  a mac system loop where every build will cause an "accept incoming network"
  prompt. Running this should fix the issue (you may see the prompt one more
  time).
`
  )
  .action(() => {
    require("./commands/fix-mac-firewall")().catch((err) => {
      console.warn("fix-mac-firewall process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("skeleton")
  .description(
    `
  This converts a project that is a skeleton project into a new project with
  specific configuration fields getting populated for the new project. This also
  establishes the project under a new repository effectively breaking the
  skeleton project from it's source repo.
`
  )
  .action(() => {
    require("./commands/skeleton")(getOptions()).catch((err) => {
      console.warn("skeleton process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("new-component [name...]")
  .description(
    `
  Performs all of the steps necessary to create a new library component. This
  includes creating the component and all of the test files/fragments needed to
  make the component show up in storybook.

  Provide a name as the last argument if you wish to bypass the prompts asking
  for one.
`
  )
  .action((name) => {
    require("./commands/new-component")(name.join(" "), getOptions()).catch(
      (err) => {
        console.warn("new-component process exited unexpectedly");
        if (program.verbose) console.warn(err.stack || err.message);
      }
    );
  });

program
  .command("edit-component [name...]")
  .description(
    `
  Performs all of the steps necessary to create a new library component. This
  includes creating the component and all of the test files/fragments needed to
  make the component show up in storybook.

  Provide a name as the last argument if you wish to bypass the prompts asking
  for one.
`
  )
  .action((name) => {
    require("./commands/edit-component")(name.join(" "), getOptions()).catch(
      (err) => {
        console.warn("edit-component process exited unexpectedly");
        if (program.verbose) console.warn(err.stack || err.message);
      }
    );
  });

program
  .command("generate-iconset")
  .description(
    `
  Import all SVGs in icon-master-list.js into the Icon primitive
`
  )
  .action((name) => {
    require("./commands/generate-iconset")().catch((err) => {
      console.warn("generate-iconset process exited unexpectedly");
      if (program.verbose) console.warn(err.stack || err.message);
    });
  });

program
  .command("deploy-qa [src] [dest]")
  .description(
    `
  This deploys the extension as is applied to YOUR CURRENT LOCAL dev server. The
  dest provided should be the project folder on the QA server (such as
  /home/magento/server/) where the .magento folder is located.
`
  )
  .action((src, dest) => {
    require("./commands/deploy-qa")({ src, dest }).catch((err) => {
      console.warn("deploy-qa process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("magento-install")
  .description(
    `
  This performs the initial configuration of this project to have a magento
  installation available in this project folder. This script will create a
  .magento folder that will contain the magento installation.

  You MUST have docker desktop installed and runnig for this to work.
`
  )
  .action((src, dest) => {
    require("./commands/magento-install")({ src, dest }).catch((err) => {
      console.warn("magento-install process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("magento-post-install")
  .description(
    `
  Performs all of the post install tasks for magento. Normally this is run from
  the install script, but if you need to run it again or the install script failed to run this portion
  you can use this command.
`
  )
  .action(() => {
    require("./commands/magento-post-install")().catch((err) => {
      console.warn("magento-post-install process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("magento-uninstall")
  .description(
    `
  Performs the tasks necessary to remove the magento installation. This includes
  deleting the .magento folder and removing the magento docker containers and
  volumes.
`
  )
  .action((src, dest) => {
    require("./commands/magento-uninstall")({ src, dest }).catch((err) => {
      console.warn("magento-uninstall process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("magento-sync-plugin")
  .description(
    `
  Syncs all dev files into your local magento instance. This is the same as the
  dev command but only runs once.
`
  )
  .action((src, dest) => {
    require("./commands/magento-sync-plugin")({ src, dest }).catch((err) => {
      console.warn("magento-sync-plugin process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program
  .command("dns")
  .description(
    `
  Runs a DNS server using dnsmasq that uses the conf file found at
  /usr/local/etc/dnsmasq.conf
  which is the brew installation of dnsmasq.
`
  )
  .action(() => {
    require("./commands/dns")(getOptions()).catch((err) => {
      console.warn("dns process exited unexpectedly");
      console.warn(err.stack || err.message);
    });
  });

program.parse(process.argv);
