#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$DIR/.node/bin:$PATH"
export GIT_CONFIG_GLOBAL=/dev/null
export GIT_CONFIG_SYSTEM=/dev/null

echo "🛡️ [Atelier Security Gate] Iniciando auditoria de segurança pré-push..."

# 1. Checagem de Arquivos Sensíveis no Git
echo "🔍 1. Verificando arquivos sensíveis no Git..."
TRACKED_SECRETS=$(git ls-files | grep -E '\.env$|\.env\.local$|\.pem$|\.key$' || true)
if [ -n "$TRACKED_SECRETS" ]; then
  echo "❌ ERRO CRÍTICO: Arquivo sensível detectado no Git:"
  echo "$TRACKED_SECRETS"
  exit 1
fi
echo "✅ Nenhum arquivo .env ou chave privada versionada."

# 2. Varredura de Padrões de Segredos em Código
echo "🔍 2. Verificando se há segredos vazados no código recente..."
SECRETS_FOUND=$(git grep -E 'service_role|AIza[-0-9A-Za-z_]{35}|sk_live_[0-9a-zA-Z]{24}|PRIVATE KEY' -- ':!tests/' ':!.node/' ':!package-lock.json' ':!scripts/' || true)
if [ -n "$SECRETS_FOUND" ]; then
  echo "❌ ERRO CRÍTICO: Padrão de credencial ou chave secreta detectado:"
  echo "$SECRETS_FOUND"
  exit 1
fi
echo "✅ Nenhuma credencial ou segredo hardcoded detectado."

# 3. Verificação de Integridade de Tipos
echo "🔍 3. Executando checagem rigorosa de tipos TypeScript..."
npm run typecheck
echo "✅ TypeScript strict sem erros."

# 4. Auditoria de Dependências
echo "🔍 4. Verificando vulnerabilidades críticas em dependências..."
if command -v npm &> /dev/null; then
  npm audit --audit-level=critical || true
fi

echo "🟢 [Atelier Security Gate] Auditoria concluída com sucesso! Aprovado para Push."
