sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install libapache2-mod-php5.6
sudo a2dismod php5
sudo a2enmod php5.6
sudo add-apt-repository ppa:ondrej/php5-compat
sudo apt-get update
apt-get install php5.6-mysql php-gettext php5.6-mbstring php-xdebug libapache2-mod-php5.6 php5.6-curl php5.6-gd php5.6-mcrypt php5.6-xml php5.6-xmlrpc
