# Kiosk Display Setup (Force EDID)

Guide for locking a monitor's resolution in Ubuntu for a kiosk setup, so the system always boots with the correct mode — even when the monitor is powered off or connected only after boot.

## Problem

When Ubuntu boots without an active monitor (powered off, cable disconnected, monitor in standby), the kernel doesn't receive EDID and can't determine supported modes. As a result:

- The output may not activate at all
- After connecting the monitor, the image appears at a low resolution (800x600, 1024x768)
- The `video=` parameter alone doesn't help, because it says "use this mode **if the monitor is detected**"

## Solution — Force EDID

Save the real monitor's EDID to a file and feed it to the kernel via GRUB. The kernel will always "think" the monitor is connected, activate the output, and set the correct resolution.

## Steps

### 1. Identify the output and current resolution

With the monitor connected and powered on:

```bash
for p in /sys/class/drm/*/status; do echo "$p: $(cat $p)"; done
```

Find the line marked `connected`, for example:
```
/sys/class/drm/card1-DP-1/status: connected
```

The connector name for GRUB is without the `card1-` prefix. In this example it's `DP-1`.

Check the resolution:

```bash
xrandr | grep -w connected
# or
cat /sys/class/drm/card1-DP-1/modes | head -5
```

### 2. Capture the monitor's EDID

```bash
sudo mkdir -p /lib/firmware/edid
sudo cp /sys/class/drm/card1-DP-1/edid /lib/firmware/edid/dp1-monitor.bin
```

### 3. Verify the EDID is valid

```bash
ls -la /lib/firmware/edid/dp1-monitor.bin
edid-decode /lib/firmware/edid/dp1-monitor.bin | head -20
```

The file should be ~128 or 256 bytes (not 0). If `edid-decode` is not installed:

```bash
sudo apt install edid-decode -y
```

### 4. Configure GRUB

Edit `/etc/default/grub`:

```bash
sudo nano /etc/default/grub
```

Update the `GRUB_CMDLINE_LINUX_DEFAULT` line:

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash drm.edid_firmware=DP-1:edid/dp1-monitor.bin video=DP-1:e"
```

Parameters explained:
- `drm.edid_firmware=DP-1:edid/dp1-monitor.bin` — kernel will use this EDID for the DP-1 output regardless of the monitor's actual state
- `video=DP-1:e` — the `e` suffix forces **enable** of the output even when no monitor is detected
- The resolution is taken from the EDID automatically (monitor's preferred mode)

### 5. Include EDID in initramfs

This is critical — without it the kernel won't find the file during early boot.

Create a hook script:

```bash
sudo nano /etc/initramfs-tools/hooks/edid-firmware
```

Contents:

```bash
#!/bin/sh
PREREQ=""
prereqs() { echo "$PREREQ"; }
case $1 in prereqs) prereqs; exit 0 ;; esac
. /usr/share/initramfs-tools/hook-functions
mkdir -p "${DESTDIR}/lib/firmware/edid"
cp /lib/firmware/edid/dp1-monitor.bin "${DESTDIR}/lib/firmware/edid/"
```

Make it executable and rebuild initramfs:

```bash
sudo chmod +x /etc/initramfs-tools/hooks/edid-firmware
sudo update-initramfs -u
```

### 6. Update GRUB and reboot

```bash
sudo update-grub
sudo reboot
```

## Verification after reboot

```bash
# Confirm kernel parameters were applied
cat /proc/cmdline

# Confirm EDID was actually loaded
sudo dmesg | grep -i edid
```

You should see something like:
```
Got external EDID base block from "edid/dp1-monitor.bin"
```

## Final test

1. Power off the monitor
2. Reboot the system (`sudo reboot`)
3. Wait 1-2 minutes
4. Power on the monitor

The correct resolution should appear immediately, without falling back to 800x600.

## Adapting for other outputs

If you have a different connector (HDMI, different number) — replace `DP-1` with yours. Examples:

| Output (from `/sys/class/drm/`) | GRUB parameter |
|---|---|
| `card0-HDMI-A-1` | `HDMI-A-1` |
| `card0-DP-1` | `DP-1` |
| `card1-DP-2` | `DP-2` |
| `card0-eDP-1` | `eDP-1` |

## Useful diagnostic commands

```bash
# Status of all outputs
for p in /sys/class/drm/*/status; do echo "$p: $(cat $p)"; done

# Current resolution (X11)
xrandr

# Monitor's preferred mode from EDID
cat /sys/class/drm/card1-DP-1/modes | head -1

# Full EDID breakdown
edid-decode /sys/class/drm/card1-DP-1/edid

# Kernel logs for DRM
sudo dmesg | grep -i -E "drm|edid|DP-1"
```

## Notes

- This method works at the kernel level and is independent of the display server (X11/Wayland)
- If GNOME/Wayland overrides settings after login — additionally lock `~/.config/monitors.xml` and copy it to `/var/lib/gdm3/.config/monitors.xml` for GDM
- When the monitor is replaced, the procedure must be repeated with the new EDID
