

### ubuntu autorun
`mkdir -p ~/.config/autostart`
```
cat > ~/.config/autostart/chromium.desktop << EOF
[Desktop Entry]
Type=Application
Name=Chromium Startup
Exec=/home/YOUR_USERNAME/scripts/startup.sh
X-GNOME-Autostart-enabled=true
EOF
```

### to use 80 port
`echo 'net.ipv4.ip_unprivileged_port_start=80' | sudo tee -a /etc/sysctl.conf`
`sudo sysctl -p`

### startup.sh file
```
export SCREEN_ID=""
export SCREEN_TOKEN=""

sleep 30

docker compose -f ~/vscreen/docker-compose.yml down

sudo rm -f ~/vscreen/data/mongod.lock

docker compose -f ~/vscreen/docker-compose.yml up -d

sleep 30

/usr/bin/chromium-browser --kiosk --ignore-certificate-errors --disable-restore-session-state --disk-cache-dir=/dev/null --autoplay-policy=no-user-gesture-required http://localhost
```