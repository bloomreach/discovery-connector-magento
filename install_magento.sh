mkdir ./.magento
cd ./.magento
curl -s https://raw.githubusercontent.com/markshust/docker-magento/master/lib/onelinesetup | bash -s -- magento.test 2.4.5-p1 community
bin/magento sampledata:deploy
bin/magento setup:upgrade
bin/magento module:disable Magento_TwoFactorAuth
