Check temp:
vcgencmd measure_temp
OR
cat /sys/class/thermal/thermal_zone1/temp

Settings:
sudo raspi-config
OR
wget https://raw.githubusercontent.com/mikerr/tinker-config/master/tinker-config
sudo sh tinker-config

Display
DMT mode 82
https://pimylifeup.com/raspberry-pi-screen-resolution/
https://www.raspberrypi.org/documentation/computers/configuration.html#hdmi-configuration
hdmi_group=2
hdmi_mode=82

TinkerBoard
DISPLAY=:0.0 xrandr --output "HDMI-1" --mode "1920x1080"


Install Docker
https://phoenixnap.com/kb/docker-on-raspberry-pi
sudo systemctl enable docker
sudo chmod 777 /var/run/docker.sock
sudo systemctl docker restart
OR
sudo systemctl restart docker

Install doker-compose
sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
sudo pip3 install setuptools wheel
sudo pip3 install docker-compose
OR
sudo pip3 install "docker-compose<1.28"
OR
sudo apt-get install docker-compose

Install unclutter
sudo apt-get install unclutter
OR
https://forums.raspberrypi.com/viewtopic.php?t=358285#p2175588

Login to gtcr.io with token
Look for a token on MacBookPro home directory.
docker login ghcr.io -u olehvavryniv

Add env variables
sudo pico /etc/profile
Add to end of file
export SCREEN_ID=
export SCREEN_TOKEN=
export ORGANIZATION_NAME=


Setup Chrome
https://www.linuxuprising.com/2021/04/how-to-enable-hardware-acceleration-in.html
https://gist.github.com/hartraft/0533f7167853484d4779999d53cf4adb


Download docker-compose file
mkdir vscreen
curl https://olehvavryniv.github.io/vsceens/school-env/docker-compose.yml --output ~/vscreen/docker-compose.yml
OR
curl https://raw.githubusercontent.com/olehvavryniv/vsceens/master/medical-env/docker-compose.yml --output ~/vscreen/docker-compose.yml

Setup autorun
sudo pico /etc/xdg/lxsession/LXDE-pi/autostart
OR
sudo pico /home/linaro/.config/lxsession/LXDE/autostart

Add to file:
@unclutter -idle 5
/home/pi/vscreen/start.sh

New RPI autorun:
mkdir /home/pi/.config/autostart
pico /home/pi/.config/autostart/vscreen.desktop

then:

[Desktop Entry]
Type=Application
Name=Vscreen
Exec=/home/pi/vscreen/start.sh


TinkerBoard:
@xterm -e '/home/linaro/vscreen/start.sh'

Copy logo!!!!


Create file:
/home/pi/vscreen/start.sh
CHMOD to 777!
with:

curl https://olehvavryniv.github.io/vsceens/school-env/docker-compose.yml --output /home/pi/vscreen/docker-compose.yml

sudo rm -f ~/vscreen/data/mongod.lock

docker-compose -f ~/vscreen/docker-compose.yml pull
docker-compose -f ~/vscreen/docker-compose.yml up -d

until [ "`docker inspect -f {{.State.Running}} vscreen_frontend_1`"=="true" ]; do
    sleep 1;
done;

/usr/bin/chromium-browser --kiosk --ignore-certificate-errors --disable-restore-session-state --disk-cache-dir=/dev/null --autoplay-policy=no-user-gesture-required http://localhost




TinkerBoard:

export SCREEN_ID=2
export SCREEN_TOKEN=V2J5Sm2QaDqjjgzkwuBwfLv5
export ORGANIZATION_NAME=school28

sleep 10
curl https://olehvavryniv.github.io/vsceens/school-env/docker-compose.yml --output /home/linaro/vscreen/docker-compose.yml

sudo rm -f ~/vscreen/data/mongod.lock

docker-compose -f ~/vscreen/docker-compose.yml pull
docker-compose -f ~/vscreen/docker-compose.yml up -d

sleep 10

/usr/bin/chromium --kiosk --ignore-certificate-errors --disable-restore-session-state --disk-cache-dir=/dev/null --autoplay-policy=no-user-gesture-required --ignore-gpu-blacklist=true http://localhost



On TinkerBoard
edit and set HDMI
sudo pico /etc/audio/audio.conf


Setup reboot
sudo crontab -e
and add to file
@midnight sudo reboot now
