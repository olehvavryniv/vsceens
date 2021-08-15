Check temp:
vcgencmd measure_temp

Install Docker
https://phoenixnap.com/kb/docker-on-raspberry-pi
sudo systemctl enable docker
sudo chmod 777 /var/run/docker.sock
sudo systemctl docker restart

Install coker-compose
sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
sudo pip3 install docker-compose

Login to gtcr.io with token
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
docker login ghcr.io -u olehvavryniv

Add env variables
sudo pico /etc/profile
Add to end of file
export SCREEN_ID=
export SCREEN_TOKEN=
export ORGANIZATION_NAME=

Reboot