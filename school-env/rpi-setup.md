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

Install unclutter
sudo apt-get install unclutter

Login to gtcr.io with token
Look for a token on MacBookPro home directory.
docker login ghcr.io -u olehvavryniv

Add env variables
sudo pico /etc/profile
Add to end of file
export SCREEN_ID=
export SCREEN_TOKEN=
export ORGANIZATION_NAME=
Reboot

Download docker-compose file
mkdir vscreen
curl https://olehvavryniv.github.io/vsceens/school-env/docker-compose.yml --output ~/vscreen/docker-compose.yml

Setup autorun
sudo pico /etc/xdg/lxsession/LXDE-pi/autostart
Add to file:
@unclutter -idle 0
/home/pi/vscreen/start.sh


Create file:
/home/pi/vscreen/start.sh
with:

curl https://olehvavryniv.github.io/vsceens/school-env/docker-compose.yml --output /home/pi/vscreen/docker-compose.yml

docker-compose -f ~/vscreen/docker-compose.yml pull
docker-compose -f ~/vscreen/docker-compose.yml up -d

until [ "`docker inspect -f {{.State.Running}} vscreen_frontend_1`"=="true" ]; do
    sleep 1;
done;

/usr/bin/chromium-browser --kiosk --ignore-certificate-errors --disable-restore-session-state --disk-cache-dir=/dev/null --autoplay-policy=no-user-gesture-required http://localhost



Setup reboot
sudo crontab -e
and add to file
@midnight /sbin/shutdown -r now