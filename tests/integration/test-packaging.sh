#!/usr/bin/env bash
# Integration test: verify all 4 packages build correctly with Vite
# and produce a CSS file with design tokens.
#
# Usage: bash tests/integration/test-packaging.sh
# Requires: node 20+, npm

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TEST_DIR="$(mktemp -d)"
PASS=0
FAIL=0

cleanup() { rm -rf "$TEST_DIR"; }
trap cleanup EXIT

check_result() {
  local name="$1" dir="$2"
  local css_file
  css_file=$(find "$dir/dist/assets" -name "*.css" 2>/dev/null | head -1)
  if [ -n "$css_file" ] && grep -q "ts-ref-primary" "$css_file" && grep -q "data-theme" "$css_file"; then
    echo "  PASS: $name"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $name — no CSS with design tokens in build output"
    FAIL=$((FAIL + 1))
  fi
}

# --- Test 1: Vanilla ---
echo "=== Vanilla ==="
D="$TEST_DIR/vanilla" && mkdir -p "$D" && cd "$D"
node -e "
const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify({
  name: 'test-vanilla', private: true, type: 'module',
  scripts: { build: 'vite build' },
  dependencies: { '@tessera-ui/core': 'file:$REPO_ROOT' },
  devDependencies: { vite: '^6.0.0' }
}));
fs.writeFileSync('index.html', '<!DOCTYPE html><html><head></head><body><ts-button>T</ts-button><script type=\"module\" src=\"/main.js\"></script></body></html>');
fs.writeFileSync('main.js', \"import '@tessera-ui/core';\");
"
npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null
check_result "Vanilla" "$D"

# --- Test 2: React ---
echo "=== React ==="
D="$TEST_DIR/react" && mkdir -p "$D" && cd "$D"
node -e "
const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify({
  name: 'test-react', private: true, type: 'module',
  scripts: { build: 'vite build' },
  dependencies: {
    '@tessera-ui/core': 'file:$REPO_ROOT',
    '@tessera-ui/react': 'file:$REPO_ROOT/packages/react',
    '@stencil/react-output-target': '^1.4.2',
    react: '^18.3.0', 'react-dom': '^18.3.0'
  },
  devDependencies: { '@vitejs/plugin-react': '^4.3.0', vite: '^6.0.0' }
}));
fs.writeFileSync('vite.config.js', \"import{defineConfig}from'vite';import react from'@vitejs/plugin-react';export default defineConfig({plugins:[react()]})\");
fs.writeFileSync('index.html', '<!DOCTYPE html><html><head></head><body><div id=\"root\"></div><script type=\"module\" src=\"/main.jsx\"></script></body></html>');
fs.writeFileSync('main.jsx', \"import React from'react';import{createRoot}from'react-dom/client';import{TsButton}from'@tessera-ui/react';createRoot(document.getElementById('root')).render(React.createElement(TsButton,{variant:'primary'},'T'));\");
"
npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null
check_result "React" "$D"

# --- Test 3: Vue ---
echo "=== Vue ==="
D="$TEST_DIR/vue" && mkdir -p "$D" && cd "$D"
node -e "
const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify({
  name: 'test-vue', private: true, type: 'module',
  scripts: { build: 'vite build' },
  dependencies: {
    '@tessera-ui/core': 'file:$REPO_ROOT',
    '@tessera-ui/vue': 'file:$REPO_ROOT/packages/vue',
    '@stencil/vue-output-target': '^0.13.1',
    vue: '^3.5.0'
  },
  devDependencies: { '@vitejs/plugin-vue': '^5.0.0', vite: '^6.0.0' }
}));
fs.writeFileSync('vite.config.js', \"import{defineConfig}from'vite';import vue from'@vitejs/plugin-vue';export default defineConfig({plugins:[vue({template:{compilerOptions:{isCustomElement:t=>t.startsWith('ts-')}}})]})\");
fs.writeFileSync('index.html', '<!DOCTYPE html><html><head></head><body><div id=\"app\"></div><script type=\"module\" src=\"/main.js\"></script></body></html>');
fs.writeFileSync('App.vue', '<template><TsButton variant=\"primary\">T</TsButton></template><script setup>import{TsButton}from\"@tessera-ui/vue\";</script>');
fs.writeFileSync('main.js', \"import{createApp}from'vue';import App from'./App.vue';createApp(App).mount('#app');\");
"
npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null
check_result "Vue" "$D"

# --- Test 4: Angular ---
echo "=== Angular ==="
D="$TEST_DIR/angular" && mkdir -p "$D" && cd "$D"
node -e "
const fs = require('fs');
fs.writeFileSync('package.json', JSON.stringify({
  name: 'test-angular', private: true, type: 'module',
  scripts: { build: 'vite build' },
  dependencies: {
    '@tessera-ui/core': 'file:$REPO_ROOT',
    '@tessera-ui/angular': 'file:$REPO_ROOT/packages/angular',
    '@angular/core': '^18.0.0', '@angular/common': '^18.0.0',
    '@angular/platform-browser': '^18.0.0', '@angular/compiler': '^18.0.0',
    rxjs: '^7.8.0', 'zone.js': '^0.15.0'
  },
  devDependencies: { vite: '^6.0.0' }
}));
fs.writeFileSync('index.html', '<!DOCTYPE html><html><head></head><body><script type=\"module\" src=\"/main.ts\"></script></body></html>');
fs.writeFileSync('main.ts', \"import '@tessera-ui/angular';\");
"
npm install --legacy-peer-deps --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null
check_result "Angular" "$D"

# --- Summary ---
echo ""
echo "==============================="
echo "  Results: $PASS passed, $FAIL failed"
echo "==============================="

[ "$FAIL" -gt 0 ] && exit 1 || exit 0
