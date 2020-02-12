sudo apt update
sudo apt upgrade
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php7.3 apache2 git acl
sudo apt install php7.3-common php7.3-mysql php7.3-xml php7.3-xmlrpc php7.3-curl php7.3-gd php7.3-imagick php7.3-cli php7.3-dev php7.3-imap php7.3-mbstring php7.3-opcache php7.3-soap php7.3-zip php7.3-intl -y
# https://www.cloudbooklet.com/how-to-install-php-7-3-on-ubuntu-18-04/
# edit /etc/php/7.3/apache2/php.ini
# edit /etc/apache2/sites-enabled/000-default.conf
