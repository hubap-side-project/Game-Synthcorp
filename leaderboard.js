// =============================================
//  SYNTHCORP — Leaderboard Engine
// =============================================
'use strict';

const PLAYER_KEY = 'synthcorp_player';
const SAVE_KEY   = 'synthcorp_v1';
const TOP_FIXED  = 10; // Toujours afficher le top N

let playerData   = null;
let allEntries   = [];

// ── INIT ──────────────────────────────────────
function init() {
  // Load player identity
  try { playerData = JSON.parse(localStorage.getItem(PLAYER_KEY)); } catch(e) {}

  // Load player score from local save
  let localScore = 0, localPrestige = 0;
  try {
    const save = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    localScore   = Math.floor(save.grandTotalCredits || save.totalCredits || 0);
    localPrestige = save.prestigeCount || 0;
  } catch(e) {}

  // Header name
  const nameEl = document.getElementById('lb-player-name');
  if (nameEl) nameEl.textContent = playerData?.name ? '// ' + playerData.name : '';

  // My card
  document.getElementById('lb-my-name').textContent  = playerData?.name || 'INCONNU';
  document.getElementById('lb-my-score').textContent = fmt(localScore) + ' ₢';
  document.getElementById('lb-my-prestige').textContent = localPrestige > 0
    ? '◉'.repeat(Math.min(localPrestige, 8)) : '';

  // Firebase
  if (!window.synthDB) {
    setStatus('Firebase non configuré', 'error');
    document.getElementById('lb-tbody').innerHTML =
      '<tr><td colspan="5" class="lb-loading">Configurez firebase-config.js pour activer le classement.</td></tr>';
    return;
  }

  setStatus('Connexion au réseau...', '');
  listenLeaderboard();
}

// ── REALTIME LISTENER ─────────────────────────
function listenLeaderboard() {
  window.synthDB.ref('synthcorp_scores')
    .orderByChild('score')
    .limitToLast(500)
    .on('value', snapshot => {
      const raw = snapshot.val() || {};
      allEntries = Object.entries(raw)
        .map(([id, v]) => ({
          id,
          name:        v.name || 'ANON',
          score:       v.score || 0,
          prestige:    v.prestige || 0,
          lastUpdated: v.lastUpdated || 0,
        }))
        .sort((a, b) => b.score - a.score);

      render(allEntries);
      setStatus('LIVE', 'live');
      document.getElementById('lb-total').textContent =
        allEntries.length + ' joueur' + (allEntries.length > 1 ? 's' : '') + ' enregistré' + (allEntries.length > 1 ? 's' : '');
    }, err => {
      setStatus('Erreur : ' + err.message, 'error');
    });
}

// ── RENDER ────────────────────────────────────
function render(entries) {
  const tbody  = document.getElementById('lb-tbody');
  const playerId = playerData?.id;

  // Find player index
  const playerIdx = playerId ? entries.findIndex(e => e.id === playerId) : -1;
  const playerRank = playerIdx >= 0 ? playerIdx + 1 : null;

  // Update my card rank
  document.getElementById('lb-my-rank').textContent = playerRank ? '#' + playerRank : 'Non classé';

  // Determine which indices to show
  // Always: 0..TOP_FIXED-1
  // If player outside top: also playerIdx-1, playerIdx, playerIdx+1
  const showSet = new Set();
  for (let i = 0; i < Math.min(TOP_FIXED, entries.length); i++) showSet.add(i);
  if (playerIdx >= TOP_FIXED) {
    if (playerIdx > 0) showSet.add(playerIdx - 1);
    showSet.add(playerIdx);
    if (playerIdx < entries.length - 1) showSet.add(playerIdx + 1);
  }

  tbody.innerHTML = '';

  let prevIndex = -1;
  let playerSectionAdded = false;

  const sortedIndices = Array.from(showSet).sort((a, b) => a - b);

  for (const i of sortedIndices) {
    const e    = entries[i];
    const rank = i + 1;
    const isMe = e.id === playerId;

    // Gap separator
    if (prevIndex >= 0 && i > prevIndex + 1) {
      const sep = document.createElement('tr');
      sep.className = 'lb-separator';
      sep.innerHTML = '<td colspan="5">· · ·</td>';
      tbody.appendChild(sep);
    }

    // Section header before player if outside top
    if (isMe && i >= TOP_FIXED && !playerSectionAdded) {
      playerSectionAdded = true;
      const sh = document.createElement('tr');
      sh.innerHTML = '<td colspan="5" class="lb-section-player">// VOTRE POSITION</td>';
      tbody.appendChild(sh);
    }

    const tr = buildRow(e, rank, isMe);
    tbody.appendChild(tr);
    prevIndex = i;
  }

  if (entries.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="lb-loading">Aucun joueur enregistré pour l\'instant.</td></tr>';
  }
}

function buildRow(entry, rank, isMe) {
  const tr = document.createElement('tr');

  let rowClass = 'lb-row';
  if (rank === 1) rowClass += ' rank-1';
  else if (rank === 2) rowClass += ' rank-2';
  else if (rank === 3) rowClass += ' rank-3';
  if (isMe) rowClass += ' lb-me';
  tr.className = rowClass;

  // Rank cell
  let rankDisplay, rankClass;
  if (rank === 1)      { rankDisplay = '🥇'; rankClass = 'top1'; }
  else if (rank === 2) { rankDisplay = '🥈'; rankClass = 'top2'; }
  else if (rank === 3) { rankDisplay = '🥉'; rankClass = 'top3'; }
  else                 { rankDisplay = '#' + rank; rankClass = 'regular'; }

  // Prestige dots (max 8)
  const prestigeStr = entry.prestige > 0
    ? '◉'.repeat(Math.min(entry.prestige, 8))
    : '—';

  tr.innerHTML = `
    <td class="lb-rank ${rankClass}">${rankDisplay}</td>
    <td class="lb-name">${escHtml(entry.name)}${isMe ? ' <span class="lb-you">YOU</span>' : ''}</td>
    <td class="lb-score">${fmt(entry.score)} ₢</td>
    <td class="lb-prestige-cell">${prestigeStr}</td>
    <td class="lb-time-cell">${timeAgo(entry.lastUpdated)}</td>
  `;
  return tr;
}

// ── STATUS ────────────────────────────────────
function setStatus(msg, type) {
  const statusEl = document.getElementById('lb-status');
  const textEl   = document.getElementById('lb-status-text');
  if (textEl) textEl.textContent = msg;
  if (statusEl) {
    statusEl.className = 'lb-status' + (type ? ' ' + type : '');
  }
}

// ── UTILS ─────────────────────────────────────
function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6)  return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3)  return (n / 1e3).toFixed(2) + 'K';
  return Math.floor(n).toString();
}

function timeAgo(ts) {
  if (!ts) return '—';
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60)    return 'maintenant';
  if (diff < 3600)  return Math.floor(diff / 60) + 'min';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h';
  return Math.floor(diff / 86400) + 'j';
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', init);
