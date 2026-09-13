// ─── UTILS ──────────────────────────────────────────────
function setOut(id, text) {
  const box  = document.getElementById(id);
  const span = document.getElementById(id.replace('-output', '-out-text'));
  if (!span) return;
  span.textContent = text;
  box.classList.toggle('has-content', text.length > 0);
}

function copyOut(id) {
  const span = document.getElementById(id.replace('-output', '-out-text'));
  if (!span || !span.textContent) return;
  navigator.clipboard.writeText(span.textContent).then(() => {
    const btn = document.querySelector('#' + id + ' .copy-btn');
    btn.textContent = 'copied!';
    setTimeout(() => btn.textContent = 'copy', 1500);
  });
}

function switchTab(name) {
  document.querySelectorAll('.cipher-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  const tabs = document.querySelectorAll('.tab-btn');
  const map  = { caesar:0, vigenere:1, railfence:2, columnar:3 };
  tabs[map[name]].classList.add('active');
}

// ─── CAESAR ─────────────────────────────────────────────
function caesarShift(text, shift, decrypt) {
  if (decrypt) shift = (26 - shift % 26) % 26;
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch >= 'a' ? 97 : 65;
    return String.fromCharCode((ch.charCodeAt(0) - base + shift) % 26 + base);
  });
}
function caesarRun() {
  const text  = document.getElementById('c-input').value;
  const shift = parseInt(document.getElementById('c-shift').value) || 3;
  const dec   = document.getElementById('c-mode').value === 'dec';
  setOut('c-output', caesarShift(text, shift, dec));
}

// ─── VIGENÈRE ───────────────────────────────────────────
function vigenereProcess(text, key, decrypt) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key.length) return text;
  let ki = 0, out = '';
  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      const base  = ch >= 'a' ? 97 : 65;
      const shift = key.charCodeAt(ki % key.length) - 65;
      const s     = decrypt ? (26 - shift) % 26 : shift;
      out += String.fromCharCode((ch.charCodeAt(0) - base + s) % 26 + base);
      ki++;
    } else { out += ch; }
  }
  return out;
}
function vigenereRun() {
  const text = document.getElementById('v-input').value;
  const key  = document.getElementById('v-key').value || 'KEY';
  const dec  = document.getElementById('v-mode').value === 'dec';
  setOut('v-output', vigenereProcess(text, key, dec));
}

// ─── RAIL FENCE ─────────────────────────────────────────
function railFenceEncrypt(text, rails) {
  const fence = Array.from({ length: rails }, () => []);
  let rail = 0, dir = 1;
  for (const ch of text) {
    fence[rail].push(ch);
    if (rail === 0) dir = 1;
    else if (rail === rails - 1) dir = -1;
    rail += dir;
  }
  return fence.map(r => r.join('')).join('');
}

function railFenceDecrypt(text, rails) {
  const n = text.length;
  const pattern = [];
  let rail = 0, dir = 1;
  for (let i = 0; i < n; i++) {
    pattern.push(rail);
    if (rail === 0) dir = 1;
    else if (rail === rails - 1) dir = -1;
    rail += dir;
  }
  const indices = pattern.map((r, i) => [r, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const result  = new Array(n);
  for (let i = 0; i < n; i++) result[indices[i][1]] = text[i];
  return result.join('');
}

function railVisual(text, rails) {
  const rows = Array.from({ length: rails }, () => Array(text.length).fill(' '));
  let rail = 0, dir = 1;
  for (let i = 0; i < text.length; i++) {
    rows[rail][i] = text[i] || '·';
    if (rail === 0) dir = 1;
    else if (rail === rails - 1) dir = -1;
    rail += dir;
  }
  return rows.map((r, i) => `Rail ${i+1}: ${r.join('')}`).join('\n');
}

function railRun() {
  const raw   = document.getElementById('r-input').value;
  const rails = parseInt(document.getElementById('r-rails').value) || 3;
  const dec   = document.getElementById('r-mode').value === 'dec';
  const text  = raw.replace(/\s/g, '').toUpperCase();
  const out   = dec ? railFenceDecrypt(text, rails) : railFenceEncrypt(text, rails);
  document.getElementById('r-out-text').textContent = out;
  document.getElementById('r-output').classList.toggle('has-content', out.length > 0);
  document.getElementById('r-visual').textContent = text ? railVisual(dec ? out : text, rails) : '';
}

// ─── COLUMNAR TRANSPOSITION ─────────────────────────────
function columnarEncrypt(text, key) {
  text = text.replace(/\s/g, '').toUpperCase();
  key  = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key.length) return text;
  const cols   = key.length;
  const padded = text.padEnd(Math.ceil(text.length / cols) * cols, 'X');
  const grid   = [];
  for (let i = 0; i < padded.length; i += cols) grid.push(padded.slice(i, i + cols).split(''));
  const order = key.split('').map((ch, i) => [ch, i]).sort((a, b) => a[0].localeCompare(b[0])).map(x => x[1]);
  return order.map(c => grid.map(row => row[c]).join('')).join('');
}

function columnarDecrypt(text, key) {
  text = text.replace(/\s/g, '').toUpperCase();
  key  = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key.length) return text;
  const cols  = key.length;
  const rows  = Math.ceil(text.length / cols);
  const order = key.split('').map((ch, i) => [ch, i]).sort((a, b) => a[0].localeCompare(b[0])).map(x => x[1]);
  const grid  = Array.from({ length: rows }, () => new Array(cols).fill(''));
  let ptr = 0;
  for (const c of order) {
    for (let r = 0; r < rows; r++) {
      if (ptr < text.length) grid[r][c] = text[ptr++];
    }
  }
  return grid.map(r => r.join('')).join('').replace(/X+$/, '');
}

function columnarVisual(text, key) {
  text = text.replace(/\s/g, '').toUpperCase();
  key  = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!key.length || !text.length) return '';
  const cols   = key.length;
  const padded = text.padEnd(Math.ceil(text.length / cols) * cols, 'X');
  const grid   = [];
  for (let i = 0; i < padded.length; i += cols) grid.push(padded.slice(i, i + cols));
  const header = key.split('').join(' ');
  const rows   = grid.map(r => r.split('').join(' ')).join('\n');
  return `Key: ${header}\n${'─'.repeat(key.length * 2 - 1)}\n${rows}`;
}

function columnarRun() {
  const raw = document.getElementById('col-input').value;
  const key = document.getElementById('col-key').value || 'ZEBRAS';
  const dec = document.getElementById('col-mode').value === 'dec';
  const out = dec ? columnarDecrypt(raw, key) : columnarEncrypt(raw, key);
  document.getElementById('col-out-text').textContent = out;
  document.getElementById('col-output').classList.toggle('has-content', out.length > 0);
  document.getElementById('col-visual').textContent = columnarVisual(dec ? out : raw.replace(/\s/g, '').toUpperCase(), key);
}
