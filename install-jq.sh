if [ "$(id -u)" != "0" ]; then
   echo -e "\e[31mThis script must be run as root\e[39m" 1>&2
   exit 1
fi

wget https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
chmod +x jq-linux64
mv jq-linux64 jq
mv jq /usr/local/bin/

jq --version

if [ $? -eq 0 ]; then
	echo 'done installing jq'
	exit 0
fi

if [ $? -eq 0 ]; then
	echo 'install jq failed'
	exit 0
fi
