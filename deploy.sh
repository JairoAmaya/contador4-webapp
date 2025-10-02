#!/bin/bash

# Script de despliegue directo en Vercel
# --------------------------------------
# Requisitos previos:
# 1. Tener Node.js v18+ instalado
# 2. Instalar CLI de Vercel: npm install -g vercel
# 3. Iniciar sesión en Vercel una vez: vercel login

echo "🚀 Instalando dependencias..."
npm install

echo "⚙️ Compilando proyecto..."
npm run build

echo "🌍 Desplegando en Vercel (modo producción)..."
vercel --prod
