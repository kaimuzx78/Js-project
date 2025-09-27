@echo off
cd /d "%~dp0"

for %%a in ("*.mp4") do (
    echo Processing: %%a
    ffmpeg -y -i "%%a" -ss 00:00:05 -vframes 1 "%%~na.jpg"
)

echo Done!
pause
