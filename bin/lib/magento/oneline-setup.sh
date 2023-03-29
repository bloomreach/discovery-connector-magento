#!/bin/bash
set -o errexit

DOMAIN=${1:-magento.test}
VERSION=${2:-2.4.5-p1}
EDITION=${3:-community}
INSTALL_TEMPLATE_PATH=${4}

# We switched the template to a local copy of the template so we could modify
# the onelinesetup script to use a specific hash instead of master.
cat $INSTALL_TEMPLATE_PATH | bash

# &&'s are used below otherwise onelinesetup script fails/errors after bin/download
bin/download "${VERSION}" "${EDITION}" \
  && bin/setup "${DOMAIN}"
