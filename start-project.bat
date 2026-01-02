@echo off
echo Starting Artist CRM Project...
cd /d "d:\React Native Project\artist-crm"
echo Current directory: %CD%
echo.
echo Installing dependencies...
npm install
echo.
echo Starting Expo...
npx expo start
pause
