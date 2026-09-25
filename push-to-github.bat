@echo off
title Push WorkforceIQ to GitHub
echo =======================================================
echo   Pushing WorkforceIQ to GitHub...
echo =======================================================
set PATH=C:\Users\DELL 7450\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd;%PATH%
cd /d "C:\Users\DELL 7450\Desktop\workforce-iq"
git add .
git commit -m "Deploy WorkforceIQ Full-Stack Prototype"
git branch -M main
git remote set-url origin https://github.com/tripathidisha61-cloud/workforce-iq.git
git push -u origin main
echo.
echo =======================================================
echo   Done! Check https://github.com/tripathidisha61-cloud/workforce-iq
echo =======================================================
pause
