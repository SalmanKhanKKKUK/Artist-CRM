@echo off
cd /d "d:\React Native Project\artist-crm"
if exist "contexts\DarkModeContext.tsx" del "contexts\DarkModeContext.tsx"
if exist "contexts\ThemeContext.tsx" del "contexts\ThemeContext.tsx"
echo Files deleted successfully
pause
