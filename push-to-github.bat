@echo off
title Push WorkforceIQ to GitHub
echo =======================================================
echo   Pushing WorkforceIQ to GitHub...
echo =======================================================

set PATH=C:\Users\DELL 7450\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd;%PATH%
cd /d "C:\Users\DELL 7450\Desktop\workforce-iq"

git config http.version HTTP/1.1
git config http.postBuffer 524288000

git add .
git commit -m "Update WorkforceIQ project changes"
git branch -M main
git push -u origin main

echo.
echo =======================================================
echo   Done! Check https://github.com/tripathidisha61-cloud/workforce-iq
echo =======================================================
pause
