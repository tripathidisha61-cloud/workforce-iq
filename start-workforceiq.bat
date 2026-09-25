@echo off
title WorkforceIQ - Autonomous HR Intelligence & Decision Orchestrator
echo =======================================================
echo   Starting WorkforceIQ Backend (Port 5000) and Frontend (Port 3000)
echo =======================================================
set PATH=C:\Users\DELL 7450\.gemini\antigravity\scratch\nodejs;%PATH%
start "WorkforceIQ Backend Server" cmd /k "cd /d %~dp0backend && node server.js"
start "WorkforceIQ Frontend Dev Server" cmd /k "cd /d %~dp0frontend && npm run dev"
echo.
echo   Backend running at: http://localhost:5000
echo   Frontend running at: http://localhost:3000
echo =======================================================
