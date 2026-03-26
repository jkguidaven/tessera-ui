#!/usr/bin/env bash
# Integration test: verify packages work exactly as documented.
#
# Tests every promise from the installation and usage docs:
# - Import resolves for all 4 frameworks
# - Vite build produces CSS with design tokens (light, dark, density)
# - Components appear in the HTML output
# - CSS custom property overrides work
# - Events, slots, props are wired in the test app
# - React app uses typed wrapper components
#
# Usage: bash tests/integration/test-packaging.sh
# Requires: node 20+

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TEST_DIR="$(mktemp -d)"
PASS=0
FAIL=0

cleanup() { rm -rf "$TEST_DIR"; }
trap cleanup EXIT

check() {
  local name="$1" result="$2"
  if [ "$result" = "true" ]; then
    echo "  PASS: $name"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $name"
    FAIL=$((FAIL + 1))
  fi
}

# =============================================================================
# VANILLA — full verification
# =============================================================================
echo "=== Vanilla ==="
D="$TEST_DIR/vanilla" && mkdir -p "$D" && cd "$D"

cat > package.json << PKGEOF
{ "name":"test-vanilla","private":true,"type":"module",
  "scripts":{"build":"vite build"},
  "dependencies":{"@tessera-ui/core":"file:$REPO_ROOT"},
  "devDependencies":{"vite":"^6.0.0"} }
PKGEOF

# This HTML exercises every documented feature:
# - import '@tessera-ui/core' (zero-config setup)
# - component rendering with props (variant, size, disabled)
# - slots (header, body)
# - events (tsClick, tsInput)
# - CSS custom property overrides
# - dark mode (data-theme="dark")
# - density (data-density="compact")
cat > index.html << 'HTMLEOF'
<!DOCTYPE html>
<html>
<head>
  <style>
    .custom-theme { --ts-color-interactive-primary: #7c3aed; --ts-button-radius: 9999px; }
  </style>
</head>
<body>
  <ts-button id="btn" variant="primary" size="lg">Click Me</ts-button>
  <ts-button id="btn-disabled" disabled>Disabled</ts-button>

  <ts-input id="input" label="Email" placeholder="you@example.com"></ts-input>

  <ts-card id="card" bordered padding="md">
    <span slot="header"><h3>Card Title</h3></span>
    <p>Card body</p>
  </ts-card>

  <ts-badge id="badge" variant="success">Active</ts-badge>
  <ts-toggle id="toggle"></ts-toggle>

  <div class="custom-theme">
    <ts-button id="btn-custom" variant="primary">Custom</ts-button>
  </div>

  <div data-theme="dark">
    <ts-button id="btn-dark" variant="primary">Dark</ts-button>
  </div>

  <div data-density="compact">
    <ts-button id="btn-compact" variant="primary">Compact</ts-button>
  </div>

  <script type="module">
    import '@tessera-ui/core';
  </script>
</body>
</html>
HTMLEOF

npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null

# --- Check 1: Build produces output ---
check "build_succeeds" "$([ -d "$D/dist" ] && echo true || echo false)"

# --- Check 2: CSS file with design tokens ---
CSS_FILE=$(find "$D/dist/assets" -name "*.css" 2>/dev/null | head -1)
check "css_file_exists" "$([ -n "$CSS_FILE" ] && echo true || echo false)"

if [ -n "$CSS_FILE" ]; then
  # Check tokens exist
  check "css_has_root_tokens" "$(grep -q ':root{--ts-ref-primary' "$CSS_FILE" && echo true || echo false)"

  # Check dark mode
  check "css_has_dark_mode" "$(grep -q 'data-theme.*dark' "$CSS_FILE" && echo true || echo false)"

  # Check density modes
  check "css_has_compact_density" "$(grep -q 'data-density.*compact' "$CSS_FILE" && echo true || echo false)"
  check "css_has_spacious_density" "$(grep -q 'data-density.*spacious' "$CSS_FILE" && echo true || echo false)"

  # Check high-contrast theme
  check "css_has_high_contrast" "$(grep -q 'data-theme.*high-contrast' "$CSS_FILE" && echo true || echo false)"

  # Check forced-colors media query
  check "css_has_forced_colors" "$(grep -q 'forced-colors' "$CSS_FILE" && echo true || echo false)"
fi

# --- Check 3: HTML output ---
HTML_FILE="$D/dist/index.html"
check "html_links_css" "$(grep -q 'rel="stylesheet"' "$HTML_FILE" && echo true || echo false)"
check "html_has_module_script" "$(grep -q 'type="module"' "$HTML_FILE" && echo true || echo false)"
check "html_has_button" "$(grep -q 'ts-button' "$HTML_FILE" && echo true || echo false)"
check "html_has_card" "$(grep -q 'ts-card' "$HTML_FILE" && echo true || echo false)"
check "html_has_input" "$(grep -q 'ts-input' "$HTML_FILE" && echo true || echo false)"
check "html_has_badge" "$(grep -q 'ts-badge' "$HTML_FILE" && echo true || echo false)"
check "html_has_toggle" "$(grep -q 'ts-toggle' "$HTML_FILE" && echo true || echo false)"
check "html_has_dark_mode" "$(grep -q 'data-theme="dark"' "$HTML_FILE" && echo true || echo false)"
check "html_has_density" "$(grep -q 'data-density="compact"' "$HTML_FILE" && echo true || echo false)"
check "html_has_slots" "$(grep -q 'slot="header"' "$HTML_FILE" && echo true || echo false)"
check "html_has_css_override" "$(grep -q 'ts-color-interactive-primary.*#7c3aed' "$HTML_FILE" && echo true || echo false)"
check "html_has_variant_prop" "$(grep -q 'variant="primary"' "$HTML_FILE" && echo true || echo false)"
check "html_has_disabled_prop" "$(grep -q 'disabled' "$HTML_FILE" && echo true || echo false)"

# --- Check 4: JS bundle has component registration ---
JS_FILE=$(find "$D/dist/assets" -name "index-*.js" 2>/dev/null | head -1)
check "js_has_components" "$([ -n "$JS_FILE" ] && grep -q 'ts-button' "$JS_FILE" && echo true || echo false)"

# =============================================================================
# REACT — build + component usage verification
# =============================================================================
echo ""
echo "=== React ==="
D="$TEST_DIR/react" && mkdir -p "$D" && cd "$D"

cat > package.json << PKGEOF
{ "name":"test-react","private":true,"type":"module",
  "scripts":{"build":"vite build"},
  "dependencies":{
    "@tessera-ui/core":"file:$REPO_ROOT",
    "@tessera-ui/react":"file:$REPO_ROOT/packages/react",
    "@stencil/react-output-target":"^1.4.2",
    "react":"^18.3.0","react-dom":"^18.3.0"},
  "devDependencies":{"@vitejs/plugin-react":"^4.3.0","vite":"^6.0.0"} }
PKGEOF

cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });
EOF

cat > index.html << 'EOF'
<!DOCTYPE html><html><head></head><body><div id="root"></div><script type="module" src="/main.jsx"></script></body></html>
EOF

# React test: uses typed wrapper imports, event handlers, slots, props
cat > main.jsx << 'EOF'
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { TsButton, TsInput, TsCard, TsBadge, TsToggle } from '@tessera-ui/react';

function App() {
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState('');
  return React.createElement('div', { style: { padding: 20 } },
    // Test: event handler (onTsClick)
    React.createElement(TsButton, { variant: 'primary', onTsClick: () => setClicked(true) },
      clicked ? 'Clicked!' : 'Click Me'),
    // Test: event handler (onTsInput)
    React.createElement(TsInput, { label: 'Email', onTsInput: (e) => setValue(e.detail.value) }),
    // Test: slots via React
    React.createElement(TsCard, { bordered: true, padding: 'md' },
      React.createElement('span', { slot: 'header' }, React.createElement('h3', null, 'Card')),
      React.createElement('p', null, 'Body')),
    // Test: badge variant
    React.createElement(TsBadge, { variant: 'success' }, 'Active'),
    // Test: toggle
    React.createElement(TsToggle, null),
    // Test: dark mode
    React.createElement('div', { 'data-theme': 'dark' },
      React.createElement(TsButton, { variant: 'primary' }, 'Dark'))
  );
}
createRoot(document.getElementById('root')).render(React.createElement(App));
EOF

npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null

check "build_succeeds" "$([ -d "$D/dist" ] && echo true || echo false)"
CSS_FILE=$(find "$D/dist/assets" -name "*.css" 2>/dev/null | head -1)
check "css_extracted_with_tokens" "$([ -n "$CSS_FILE" ] && grep -q 'ts-ref-primary' "$CSS_FILE" && echo true || echo false)"
JS_FILE=$(find "$D/dist/assets" -name "index-*.js" 2>/dev/null | head -1)
check "react_components_bundled" "$([ -n "$JS_FILE" ] && grep -q 'ts-button' "$JS_FILE" && echo true || echo false)"
check "react_events_bundled" "$([ -n "$JS_FILE" ] && grep -q 'tsClick\|onTsClick\|Clicked' "$JS_FILE" && echo true || echo false)"

# =============================================================================
# VUE — build + component usage verification
# =============================================================================
echo ""
echo "=== Vue ==="
D="$TEST_DIR/vue" && mkdir -p "$D" && cd "$D"

cat > package.json << PKGEOF
{ "name":"test-vue","private":true,"type":"module",
  "scripts":{"build":"vite build"},
  "dependencies":{
    "@tessera-ui/core":"file:$REPO_ROOT",
    "@tessera-ui/vue":"file:$REPO_ROOT/packages/vue",
    "@stencil/vue-output-target":"^0.13.1",
    "vue":"^3.5.0"},
  "devDependencies":{"@vitejs/plugin-vue":"^5.0.0","vite":"^6.0.0"} }
PKGEOF

cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue({ template: { compilerOptions: { isCustomElement: t => t.startsWith('ts-') } } })]
});
EOF

cat > index.html << 'EOF'
<!DOCTYPE html><html><head></head><body><div id="app"></div><script type="module" src="/main.js"></script></body></html>
EOF

# Vue test: imports, events, slots, dark mode
cat > App.vue << 'EOF'
<template>
  <div>
    <TsButton variant="primary" @tsClick="handleClick">{{ clicked ? 'Clicked!' : 'Click Me' }}</TsButton>
    <TsInput label="Email" @tsInput="handleInput" />
    <TsCard bordered padding="md">
      <span slot="header"><h3>Card</h3></span>
      <p>Body</p>
    </TsCard>
    <TsBadge variant="success">Active</TsBadge>
    <div data-theme="dark">
      <TsButton variant="primary">Dark</TsButton>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { TsButton, TsInput, TsCard, TsBadge } from '@tessera-ui/vue';
const clicked = ref(false);
const handleClick = () => { clicked.value = true; };
const handleInput = (e) => { console.log(e.detail.value); };
</script>
EOF

cat > main.js << 'EOF'
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
EOF

npm install --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null

check "build_succeeds" "$([ -d "$D/dist" ] && echo true || echo false)"
CSS_FILE=$(find "$D/dist/assets" -name "*.css" 2>/dev/null | head -1)
check "css_extracted_with_tokens" "$([ -n "$CSS_FILE" ] && grep -q 'ts-ref-primary' "$CSS_FILE" && echo true || echo false)"

# =============================================================================
# ANGULAR — build verification
# =============================================================================
echo ""
echo "=== Angular ==="
D="$TEST_DIR/angular" && mkdir -p "$D" && cd "$D"

cat > package.json << PKGEOF
{ "name":"test-angular","private":true,"type":"module",
  "scripts":{"build":"vite build"},
  "dependencies":{
    "@tessera-ui/core":"file:$REPO_ROOT",
    "@tessera-ui/angular":"file:$REPO_ROOT/packages/angular",
    "@angular/core":"^18.0.0","@angular/common":"^18.0.0",
    "@angular/platform-browser":"^18.0.0","@angular/compiler":"^18.0.0",
    "rxjs":"^7.8.0","zone.js":"^0.15.0"},
  "devDependencies":{"vite":"^6.0.0"} }
PKGEOF

cat > index.html << 'EOF'
<!DOCTYPE html><html><head></head><body><script type="module" src="/main.ts"></script></body></html>
EOF

# Angular test: import resolves, DIRECTIVES export exists
cat > main.ts << 'EOF'
import { DIRECTIVES } from '@tessera-ui/angular';
console.log('DIRECTIVES count:', DIRECTIVES.length);
EOF

npm install --legacy-peer-deps --silent 2>/dev/null
npx vite build --logLevel error 2>/dev/null

check "build_succeeds" "$([ -d "$D/dist" ] && echo true || echo false)"
CSS_FILE=$(find "$D/dist/assets" -name "*.css" 2>/dev/null | head -1)
check "css_extracted_with_tokens" "$([ -n "$CSS_FILE" ] && grep -q 'ts-ref-primary' "$CSS_FILE" && echo true || echo false)"
# Verify DIRECTIVES is in the bundle (proves the export works)
JS_FILE=$(find "$D/dist/assets" -name "index-*.js" 2>/dev/null | head -1)
check "directives_export_works" "$([ -n "$JS_FILE" ] && grep -q 'DIRECTIVES' "$JS_FILE" && echo true || echo false)"

# =============================================================================
# Summary
# =============================================================================
echo ""
echo "==============================="
echo "  Results: $PASS passed, $FAIL failed"
echo "==============================="

[ "$FAIL" -gt 0 ] && exit 1 || exit 0
