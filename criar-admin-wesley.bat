@echo off
echo ========================================
echo Criando Usuario Administrador
echo ========================================
echo.
echo Email: farmaciaeconomica2407@gmail.com
echo Nome: Wesley Santos
echo.
echo Certifique-se de que o servidor backend esta rodando!
echo.
pause

cd backend
node create-admin-direct.js

pause
