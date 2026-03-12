// =============================================
//  SYNTHCORP — Cyberpunk Idle Game Engine
// =============================================

'use strict';

// ── BUILDINGS DEFINITION ──────────────────────
const BUILDINGS_DEF = [
  {
    id: 'ghost_node', name: 'Ghost Node', tier: 1,
    desc: 'Rogue process hijacking idle CPU cycles.',
    baseCost: 10, costMult: 1.15,
    baseProduction: { credits: 0.1, data: 0, energy: 0 },
    unlockAt: 0, tierColor: '#00e5ff',
  },
  {
    id: 'data_shard', name: 'Data Shard', tier: 2,
    desc: 'Fractured data crystals streaming raw packets.',
    baseCost: 100, costMult: 1.15,
    baseProduction: { credits: 0.5, data: 0.05, energy: 0 },
    unlockAt: 5, tierColor: '#00ff88',
  },
  {
    id: 'power_cell', name: 'Power Cell', tier: 3,
    desc: 'Stolen corp grid taps powering your network.',
    baseCost: 500, costMult: 1.15,
    baseProduction: { credits: 2, data: 0.1, energy: 0.2 },
    unlockAt: 10, tierColor: '#ffcc00',
  },
  {
    id: 'crypto_rig', name: 'Crypto Rig', tier: 4,
    desc: 'Quantum ASIC arrays mining dark-chain tokens.',
    baseCost: 3000, costMult: 1.15,
    baseProduction: { credits: 10, data: 0.5, energy: 0.5 },
    unlockAt: 25, tierColor: '#ff6600',
  },
  {
    id: 'neural_cluster', name: 'Neural Cluster', tier: 5,
    desc: 'Wetware-silicon hybrid processing mesh.',
    baseCost: 20000, costMult: 1.15,
    baseProduction: { credits: 60, data: 3, energy: 2 },
    unlockAt: 50, tierColor: '#aa44ff',
  },
  {
    id: 'corp_server', name: 'Corp Server', tier: 6,
    desc: 'Megacorp mainframe node under your control.',
    baseCost: 150000, costMult: 1.15,
    baseProduction: { credits: 400, data: 20, energy: 12 },
    unlockAt: 100, tierColor: '#ff00cc',
  },
  {
    id: 'quantum_nexus', name: 'Quantum Nexus', tier: 7,
    desc: 'Entangled quantum cores bending spacetime logic.',
    baseCost: 1200000, costMult: 1.15,
    baseProduction: { credits: 3000, data: 150, energy: 80 },
    unlockAt: 250, tierColor: '#ff0044',
  },
];

// ── SKILL TREE DEFINITION ─────────────────────
const SKILLS_DEF = [
  // Branch 0 — HACKING (cyan) — credits multiplier
  {
    id: 'exploit_0day', branch: 0, tier: 0, name: 'Exploit 0day', icon: '⌥',
    desc: '+25% credits production', costData: 10, costEnergy: 0,
    requires: null, effect: { creditsMulti: 0.25 },
  },
  {
    id: 'neural_tap', branch: 0, tier: 1, name: 'Neural Tap', icon: '⊛',
    desc: '+50% credits production', costData: 60, costEnergy: 0,
    requires: 'exploit_0day', effect: { creditsMulti: 0.5 },
  },
  {
    id: 'dark_net', branch: 0, tier: 2, name: 'Dark Net', icon: '◈',
    desc: 'x2 credits production', costData: 300, costEnergy: 0,
    requires: 'neural_tap', effect: { creditsMulti: 1.0 },
  },
  {
    id: 'corp_breach', branch: 0, tier: 3, name: 'Corp Breach', icon: '⚔',
    desc: 'x4 credits production', costData: 1500, costEnergy: 0,
    requires: 'dark_net', effect: { creditsMulti: 3.0 },
  },
  // Branch 1 — TECH (green) — data & energy
  {
    id: 'overclock', branch: 1, tier: 0, name: 'Overclock', icon: '⚙',
    desc: '+50% data production', costData: 20, costEnergy: 0,
    requires: null, effect: { dataMulti: 0.5 },
  },
  {
    id: 'heat_sink', branch: 1, tier: 1, name: 'Heat Sink', icon: '❄',
    desc: '+50% energy production', costData: 100, costEnergy: 0,
    requires: 'overclock', effect: { energyMulti: 0.5 },
  },
  {
    id: 'quantum_loop', branch: 1, tier: 2, name: 'Quantum Loop', icon: '∞',
    desc: 'x2 data & energy', costData: 600, costEnergy: 0,
    requires: 'heat_sink', effect: { dataMulti: 1.0, energyMulti: 1.0 },
  },
  {
    id: 'singularity', branch: 1, tier: 3, name: 'Singularity', icon: '◉',
    desc: 'x2 ALL production', costData: 3000, costEnergy: 0,
    requires: 'quantum_loop', effect: { allMulti: 1.0 },
  },
  // Branch 2 — AUGMENTATION (magenta) — click & all
  {
    id: 'chrome_hands', branch: 2, tier: 0, name: 'Chrome Hands', icon: '✦',
    desc: 'x3 click power', costData: 30, costEnergy: 0,
    requires: null, effect: { clickMulti: 2.0 },
  },
  {
    id: 'reflex_boost', branch: 2, tier: 1, name: 'Reflex Boost', icon: '⚡',
    desc: '+50% all production', costData: 200, costEnergy: 0,
    requires: 'chrome_hands', effect: { allMulti: 0.5 },
  },
  {
    id: 'bio_matrix', branch: 2, tier: 2, name: 'Bio-Matrix', icon: '⬡',
    desc: 'x2 all production', costData: 1000, costEnergy: 0,
    requires: 'reflex_boost', effect: { allMulti: 1.0 },
  },
  {
    id: 'transcendence', branch: 2, tier: 3, name: 'Transcendence', icon: '★',
    desc: 'x5 all production', costData: 5000, costEnergy: 0,
    requires: 'bio_matrix', effect: { allMulti: 4.0 },
  },
  // Branch 3 — AUTOMATION (orange) — auto-click rate
  {
    id: 'auto_script', branch: 3, tier: 0, name: 'Auto-Script', icon: '⟳',
    desc: '0.5 auto-click/s — libère vos mains', costData: 50, costEnergy: 0,
    requires: null, effect: { autoClickRate: 0.5 },
  },
  {
    id: 'ghost_routine', branch: 3, tier: 1, name: 'Ghost Routine', icon: '⤿',
    desc: '+2 auto-clicks/s — daemon fantôme actif', costData: 300, costEnergy: 0,
    requires: 'auto_script', effect: { autoClickRate: 2 },
  },
  {
    id: 'daemon_core', branch: 3, tier: 2, name: 'Daemon Core', icon: '⟲',
    desc: '+8 auto-clicks/s — noyau autonome implanté', costData: 1500, costEnergy: 0,
    requires: 'ghost_routine', effect: { autoClickRate: 8 },
  },
  {
    id: 'neural_reflex', branch: 3, tier: 3, name: 'Neural Reflex', icon: '◎',
    desc: '+30 auto-clicks/s — réflexes synaptiques', costData: 6000, costEnergy: 0,
    requires: 'daemon_core', effect: { autoClickRate: 30 },
  },
];

const BRANCH_META = [
  { name: 'HACKING',    color: '#00e5ff', skills: ['exploit_0day','neural_tap','dark_net','corp_breach'] },
  { name: 'TECH',       color: '#00ff88', skills: ['overclock','heat_sink','quantum_loop','singularity'] },
  { name: 'AUGMENT',    color: '#ff00cc', skills: ['chrome_hands','reflex_boost','bio_matrix','transcendence'] },
  { name: 'AUTOMATION', color: '#ff6600', skills: ['auto_script','ghost_routine','daemon_core','neural_reflex'] },
];

// ── GAME STATE ────────────────────────────────
let state = {
  credits: 0,
  data: 0,
  energy: 0,
  totalCredits: 0,      // lifetime, resets on prestige
  grandTotalCredits: 0, // never resets
  synapticCores: 0,
  prestigeCount: 0,
  buildings: {},
  unlockedSkills: new Set(),
  playTime: 0,
  lastTick: Date.now(),
  milestones: new Set(),
  // Auto-click transient accumulators (not saved)
  _autoAccum: 0,
  _autoParticleAccum: 0,
};

// ── HELPERS ───────────────────────────────────
function fmt(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6)  return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3)  return (n / 1e3).toFixed(2) + 'K';
  return Math.floor(n).toString();
}
function fmtTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function buildingCount(id)  { return state.buildings[id] || 0; }
function buildingCost(def)  { return Math.floor(def.baseCost * Math.pow(def.costMult, buildingCount(def.id))); }
function isSkillUnlocked(id){ return state.unlockedSkills.has(id); }

// ── MULTIPLIERS ───────────────────────────────
function getMultipliers() {
  let creditsM = 1, dataM = 1, energyM = 1, allM = 1, clickM = 1;
  for (const id of state.unlockedSkills) {
    const s = SKILLS_DEF.find(s => s.id === id);
    if (!s) continue;
    const e = s.effect;
    if (e.creditsMulti) creditsM += e.creditsMulti;
    if (e.dataMulti)    dataM    += e.dataMulti;
    if (e.energyMulti)  energyM  += e.energyMulti;
    if (e.allMulti)     allM     += e.allMulti;
    if (e.clickMulti)   clickM   += e.clickMulti;
  }
  const prestigeBonus = 1 + state.synapticCores * 0.5;
  return {
    credits: creditsM * allM * prestigeBonus,
    data:    dataM    * allM * prestigeBonus,
    energy:  energyM  * allM * prestigeBonus,
    click:   clickM   * prestigeBonus,
  };
}

function getTotalProduction() {
  const mult = getMultipliers();
  let cps = 0, dps = 0, eps = 0;
  for (const def of BUILDINGS_DEF) {
    const cnt = buildingCount(def.id);
    if (cnt === 0) continue;
    cps += def.baseProduction.credits * cnt * mult.credits;
    dps += def.baseProduction.data    * cnt * mult.data;
    eps += def.baseProduction.energy  * cnt * mult.energy;
  }
  return { cps, dps, eps };
}

function getClickValue() {
  const mult = getMultipliers();
  const prod = getTotalProduction();
  const base = Math.max(1, prod.cps * 0.05);
  return Math.max(1, base * mult.click);
}

function getAutoClickRate() {
  let rate = 0;
  for (const id of state.unlockedSkills) {
    const s = SKILLS_DEF.find(s => s.id === id);
    if (s && s.effect.autoClickRate) rate += s.effect.autoClickRate;
  }
  return rate;
}

// ── PRESTIGE ──────────────────────────────────
function getPrestigeGain() {
  const n = Math.floor(Math.sqrt(state.totalCredits / 1e6));
  return Math.max(0, n);
}

function doPrestige() {
  const gain = getPrestigeGain();
  if (gain <= 0 || state.totalCredits < 1e6) return;

  state.credits = 0;
  state.data = 0;
  state.energy = 0;
  state.totalCredits = 0;
  state.buildings = {};
  state.unlockedSkills = new Set();
  state.synapticCores += gain;
  state.prestigeCount++;
  state._autoAccum = 0;
  state._autoParticleAccum = 0;

  syncScore();
  logMilestone(`NEURAL RESET #${state.prestigeCount} — +${gain} Synaptic Cores acquired`, 'prestige-log');
  toast(`NEURAL RESET — +${gain} SYNAPTIC CORES`);
  renderBuildings();
  renderSkills();
  updateUI();
}

// ── GAME TICK ─────────────────────────────────
function tick() {
  const now = Date.now();
  const dt = Math.min((now - state.lastTick) / 1000, 1);
  state.lastTick = now;
  state.playTime += dt;

  const prod = getTotalProduction();
  const earned = prod.cps * dt;
  state.credits      += earned;
  state.totalCredits += earned;
  state.grandTotalCredits += earned;
  state.data   += prod.dps * dt;
  state.energy += prod.eps * dt;

  // Auto-click
  const autoRate = getAutoClickRate();
  if (autoRate > 0) {
    const clickVal = getClickValue();
    const autoEarned = autoRate * clickVal * dt;
    state.credits           += autoEarned;
    state.totalCredits      += autoEarned;
    state.grandTotalCredits += autoEarned;

    // Accumulate for particle spawning (cap at 5 visual pulses/sec)
    state._autoAccum        += autoRate * dt;
    state._autoParticleAccum += dt;
  }

  checkMilestones();
}

// ── MILESTONES ────────────────────────────────
const MILESTONE_LIST = [
  { id: 'm_100',   check: s => s.totalCredits >= 100,    msg: 'Premiers 100 ₢ obtenus' },
  { id: 'm_1k',    check: s => s.totalCredits >= 1000,   msg: '1 000 ₢ — Le réseau s\'éveille' },
  { id: 'm_10k',   check: s => s.totalCredits >= 10000,  msg: '10 000 ₢ — Netrunner confirmé' },
  { id: 'm_100k',  check: s => s.totalCredits >= 100000, msg: '100 000 ₢ — Fantôme du cyberespace' },
  { id: 'm_1m',    check: s => s.totalCredits >= 1000000,msg: '1M ₢ — NEURAL RESET disponible !' },
  { id: 'm_10m',   check: s => s.grandTotalCredits >= 10000000, msg: '10M ₢ — Légende de la Zone' },
  { id: 'm_s10',   check: s => s.synapticCores >= 10,    msg: '10 Synaptic Cores — Entité augmentée' },
];

function checkMilestones() {
  for (const m of MILESTONE_LIST) {
    if (!state.milestones.has(m.id) && m.check(state)) {
      state.milestones.add(m.id);
      logMilestone('◈ ' + m.msg, 'highlight-log');
    }
  }
}

// ── RENDER ────────────────────────────────────
let uiTick = 0;

function updateUI() {
  uiTick++;
  const prod = getTotalProduction();
  const mult = getMultipliers();

  // Resources
  document.getElementById('credits-val').textContent = fmt(state.credits);
  document.getElementById('data-val').textContent    = fmt(state.data);
  document.getElementById('energy-val').textContent  = fmt(state.energy);
  document.getElementById('synapse-val').textContent = state.synapticCores;

  document.getElementById('credits-rate').textContent = '+' + fmt(prod.cps) + '/s';
  document.getElementById('data-rate').textContent    = '+' + fmt(prod.dps) + '/s';
  document.getElementById('energy-rate').textContent  = '+' + fmt(prod.eps) + '/s';

  // Stats
  document.getElementById('total-credits').textContent  = fmt(state.totalCredits) + ' ₢';
  document.getElementById('total-cps').textContent      = fmt(prod.cps) + ' ₢/s';
  document.getElementById('prestige-bonus').textContent = 'x' + (1 + state.synapticCores * 0.5).toFixed(1);
  document.getElementById('playtime').textContent       = fmtTime(state.playTime);

  // Click reward
  document.getElementById('click-reward').textContent = '+' + fmt(getClickValue()) + ' ₢';

  // Auto-click rate display
  const autoRate = getAutoClickRate();
  const autoRateEl = document.getElementById('auto-click-rate');
  if (autoRateEl) {
    autoRateEl.textContent = autoRate > 0 ? fmt(autoRate) + '/s' : 'INACTIF';
    autoRateEl.style.color = autoRate > 0 ? '#ff6600' : '#334466';
  }

  // Auto-click visual feedback
  const hexEl = document.querySelector('.click-hex');
  if (hexEl) hexEl.classList.toggle('auto-active', autoRate > 0);

  // Spawn auto-click particles (max ~3/s visually)
  const PARTICLE_INTERVAL = Math.max(0.2, 1 / Math.min(autoRate, 5));
  if (autoRate > 0 && state._autoParticleAccum >= PARTICLE_INTERVAL) {
    state._autoParticleAccum = 0;
    spawnAutoParticle('+' + fmt(getClickValue() * autoRate * PARTICLE_INTERVAL) + ' ₢');
  }

  // Prestige
  const gain = getPrestigeGain();
  document.getElementById('prestige-gain').textContent = gain;
  const btnP = document.getElementById('btn-prestige');
  const canPrestige = state.totalCredits >= 1e6;
  btnP.disabled = !canPrestige;
  btnP.textContent = canPrestige
    ? `NEURAL RESET — GAGNER ${gain} CORES`
    : `NEURAL RESET — ${fmt(1e6 - state.totalCredits)} ₢ RESTANT`;

  // Building affordability
  for (const def of BUILDINGS_DEF) {
    const card = document.getElementById('bcard-' + def.id);
    if (!card) continue;
    const cost = buildingCost(def);
    const canBuy = state.credits >= cost;
    const totalOwned = state.grandTotalCredits + (state.totalCredits || 0);
    const isUnlocked = totalOwned >= def.unlockAt || state.grandTotalCredits >= def.unlockAt || state.totalCredits >= def.unlockAt;

    card.classList.toggle('locked', !isUnlocked);
    card.classList.toggle('affordable', isUnlocked && canBuy);

    const countEl = card.querySelector('.building-count');
    if (countEl) countEl.textContent = buildingCount(def.id);

    const costEl = card.querySelector('.cost-val');
    if (costEl) costEl.textContent = fmt(cost) + ' ₢';
  }

  // Skill node affordability
  for (const skill of SKILLS_DEF) {
    const el = document.getElementById('snode-' + skill.id);
    if (!el) return;
    const unlocked = isSkillUnlocked(skill.id);
    const reqOk = !skill.requires || isSkillUnlocked(skill.requires);
    const canAfford = state.data >= skill.costData;

    el.classList.toggle('maxed',    unlocked);
    el.classList.toggle('unlocked', unlocked);
    el.classList.toggle('locked',   !unlocked && !reqOk);

    const statusEl = el.querySelector('.node-status');
    if (statusEl) {
      if (unlocked) {
        statusEl.textContent = '✓ ACTIF';
        statusEl.style.color = '#00ff88';
      } else if (!reqOk) {
        statusEl.textContent = '🔒';
        statusEl.style.color = '#444';
      } else {
        statusEl.textContent = canAfford ? 'ACHETER' : fmt(skill.costData) + ' GB';
        statusEl.style.color = canAfford ? '#00e5ff' : '#664444';
      }
    }
  }
}

// ── RENDER BUILDINGS ──────────────────────────
function renderBuildings() {
  const container = document.getElementById('buildings-list');
  container.innerHTML = '';

  for (const def of BUILDINGS_DEF) {
    const cost = buildingCost(def);
    const prod = def.baseProduction;
    const div = document.createElement('div');
    div.className = 'building-card locked';
    div.id = 'bcard-' + def.id;

    const prodStr = [
      prod.credits > 0 ? `${prod.credits} ₢/s` : '',
      prod.data    > 0 ? `${prod.data} GB/s` : '',
      prod.energy  > 0 ? `${prod.energy} ⚡/s` : '',
    ].filter(Boolean).join(' · ');

    div.innerHTML = `
      <div class="building-tier" style="background:${def.tierColor}"></div>
      <div class="building-top">
        <span class="building-name">${def.name}</span>
        <span class="building-count">0</span>
      </div>
      <div class="building-desc">${def.desc}</div>
      <div class="building-bottom">
        <div class="building-cost">Coût : <span class="cost-val">${fmt(cost)} ₢</span></div>
        <div class="building-production">${prodStr}</div>
      </div>
      <div class="building-bar" id="bbar-${def.id}"></div>
    `;

    div.addEventListener('click', () => buyBuilding(def));
    container.appendChild(div);
  }
}

// ── RENDER SKILLS ─────────────────────────────
function renderSkills() {
  const container = document.getElementById('skill-branches');
  container.innerHTML = '';

  for (const branch of BRANCH_META) {
    const branchDiv = document.createElement('div');
    branchDiv.className = 'skill-branch';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'branch-title';
    titleDiv.style.color = branch.color;
    titleDiv.style.borderBottomColor = branch.color + '44';
    titleDiv.style.textShadow = `0 0 8px ${branch.color}`;
    titleDiv.textContent = '// ' + branch.name;
    branchDiv.appendChild(titleDiv);

    const nodesDiv = document.createElement('div');
    nodesDiv.className = 'branch-nodes';

    for (const skillId of branch.skills) {
      const skill = SKILLS_DEF.find(s => s.id === skillId);
      if (!skill) continue;

      const node = document.createElement('div');
      node.className = 'skill-node locked';
      node.id = 'snode-' + skill.id;

      node.innerHTML = `
        <div class="node-icon">${skill.icon}</div>
        <div class="node-info">
          <div class="node-name">${skill.name}</div>
          <div class="node-effect">${skill.desc}</div>
        </div>
        <div style="text-align:right">
          <div class="node-cost">${skill.costData} GB</div>
          <div class="node-status">🔒</div>
        </div>
      `;

      node.addEventListener('click', () => buySkill(skill));
      nodesDiv.appendChild(node);
    }

    branchDiv.appendChild(nodesDiv);
    container.appendChild(branchDiv);
  }
}

// ── ACTIONS ───────────────────────────────────
function buyBuilding(def) {
  const cost = buildingCost(def);
  if (state.credits < cost) return;
  state.credits -= cost;
  state.buildings[def.id] = (state.buildings[def.id] || 0) + 1;

  const cnt = buildingCount(def.id);
  if ([1, 5, 10, 25, 50, 100, 200].includes(cnt)) {
    logMilestone(`${def.name} x${cnt} déployé`, 'highlight-log');
  }
}

function buySkill(skill) {
  if (isSkillUnlocked(skill.id)) return;
  if (skill.requires && !isSkillUnlocked(skill.requires)) return;
  if (state.data < skill.costData) return;

  state.data -= skill.costData;
  state.unlockedSkills.add(skill.id);
  logMilestone(`Compétence débloquée : ${skill.name}`, 'highlight-log');
  toast('SKILL UNLOCKED: ' + skill.name.toUpperCase());
}

function handleClick() {
  const val = getClickValue();
  state.credits      += val;
  state.totalCredits += val;
  state.grandTotalCredits += val;
  spawnParticle('+' + fmt(val) + ' ₢');
}

// ── PARTICLES ─────────────────────────────────
function spawnParticle(text) {
  const container = document.getElementById('click-particles');
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = text;
  el.style.left = (40 + Math.random() * 80) + 'px';
  el.style.top  = (40 + Math.random() * 80) + 'px';
  container.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function spawnAutoParticle(text) {
  const container = document.getElementById('click-particles');
  const el = document.createElement('div');
  el.className = 'particle auto-particle';
  el.textContent = text;
  el.style.left = (10 + Math.random() * 140) + 'px';
  el.style.top  = (10 + Math.random() * 140) + 'px';
  container.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

// ── TOAST ─────────────────────────────────────
let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

// ── MILESTONE LOG ─────────────────────────────
function logMilestone(msg, cls = '') {
  const container = document.getElementById('log-entries');
  const time = fmtTime(state.playTime);
  const entry = document.createElement('div');
  entry.className = 'log-entry ' + cls;
  entry.innerHTML = `<span class="log-time">[${time}]</span>${msg}`;
  container.prepend(entry);
  if (container.children.length > 30) container.lastChild.remove();
}

// ── PLAYER / FIREBASE ─────────────────────────
const PLAYER_KEY = 'synthcorp_player';
let playerData = null; // { id, name }

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function initPlayer() {
  try { playerData = JSON.parse(localStorage.getItem(PLAYER_KEY)); } catch(e) {}
  if (playerData?.id && playerData?.name) {
    document.getElementById('header-player-name').textContent = '// ' + playerData.name;
    document.getElementById('name-modal').classList.add('hidden');
  } else {
    // Show modal — blur game underneath
    document.getElementById('name-modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('name-input').focus(), 300);
  }
}

function confirmName() {
  const raw = document.getElementById('name-input').value.trim().toUpperCase();
  const errorEl = document.getElementById('name-modal-error');
  if (raw.length < 2) { errorEl.textContent = 'Minimum 2 caractères'; return; }
  if (raw.length > 20) { errorEl.textContent = 'Maximum 20 caractères'; return; }
  if (!/^[A-Z0-9_\-\.]+$/.test(raw)) { errorEl.textContent = 'Caractères autorisés : A-Z 0-9 _ - .'; return; }

  const existing = (() => { try { return JSON.parse(localStorage.getItem(PLAYER_KEY)); } catch(e) {} return null; })();
  playerData = { id: existing?.id || generateId(), name: raw };
  localStorage.setItem(PLAYER_KEY, JSON.stringify(playerData));

  document.getElementById('header-player-name').textContent = '// ' + playerData.name;
  document.getElementById('name-modal').classList.add('hidden');
  syncScore();
  logMilestone(`Bienvenue dans le réseau, ${playerData.name}`, 'highlight-log');
}

function syncScore() {
  if (!window.synthDB || !playerData?.id) return;
  window.synthDB.ref('synthcorp_scores/' + playerData.id).set({
    name:        playerData.name,
    score:       Math.floor(state.grandTotalCredits),
    prestige:    state.prestigeCount,
    lastUpdated: Date.now(),
  });
}

// ── SAVE / LOAD ───────────────────────────────
const SAVE_KEY = 'synthcorp_v1';

function saveGame() {
  const data = {
    credits:            state.credits,
    data:               state.data,
    energy:             state.energy,
    totalCredits:       state.totalCredits,
    grandTotalCredits:  state.grandTotalCredits,
    synapticCores:      state.synapticCores,
    prestigeCount:      state.prestigeCount,
    buildings:          state.buildings,
    unlockedSkills:     Array.from(state.unlockedSkills),
    playTime:           state.playTime,
    milestones:         Array.from(state.milestones),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  toast('SAUVEGARDE OK');
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.credits           = data.credits || 0;
    state.data              = data.data || 0;
    state.energy            = data.energy || 0;
    state.totalCredits      = data.totalCredits || 0;
    state.grandTotalCredits = data.grandTotalCredits || 0;
    state.synapticCores     = data.synapticCores || 0;
    state.prestigeCount     = data.prestigeCount || 0;
    state.buildings         = data.buildings || {};
    state.unlockedSkills    = new Set(data.unlockedSkills || []);
    state.playTime          = data.playTime || 0;
    state.milestones        = new Set(data.milestones || []);
  } catch(e) {
    console.error('Save corrupted', e);
  }
}

function hardReset() {
  if (!confirm('WIPE ALL DATA? Cette action est irréversible.')) return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

// ── OFFLINE PROGRESS ──────────────────────────
function applyOfflineProgress() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    const lastSaveTime = saved.lastSaveTime || Date.now();
    const offlineSec = Math.min((Date.now() - lastSaveTime) / 1000, 3600 * 4);
    if (offlineSec < 10) return;

    const prod = getTotalProduction();
    const earned = prod.cps * offlineSec * 0.5; // 50% offline rate
    state.credits      += earned;
    state.totalCredits += earned;
    state.grandTotalCredits += earned;
    state.data   += prod.dps * offlineSec * 0.5;
    state.energy += prod.eps * offlineSec * 0.5;

    if (earned > 10) toast(`OFFLINE: +${fmt(earned)} ₢ pendant ${fmtTime(offlineSec)}`);
  } catch(e) {}
}

// Save timestamp
function saveWithTimestamp() {
  const raw = localStorage.getItem(SAVE_KEY);
  const existing = raw ? JSON.parse(raw) : {};
  existing.lastSaveTime = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(existing));
}

// ── INIT ──────────────────────────────────────
function init() {
  loadGame();
  renderBuildings();
  renderSkills();
  applyOfflineProgress();
  updateUI();
  state.lastTick = Date.now();

  // Game loop — 20 ticks/sec
  setInterval(() => {
    tick();
    updateUI();
  }, 50);

  // Autosave + score sync every 30s
  setInterval(() => {
    saveWithTimestamp();
    saveGame();
    syncScore();
  }, 30000);

  // Event listeners
  document.getElementById('click-area').addEventListener('click', handleClick);
  document.getElementById('btn-prestige').addEventListener('click', doPrestige);
  document.getElementById('btn-save').addEventListener('click', () => { saveWithTimestamp(); saveGame(); syncScore(); });
  document.getElementById('btn-hard-reset').addEventListener('click', hardReset);
  document.getElementById('btn-name-confirm').addEventListener('click', confirmName);
  document.getElementById('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') confirmName(); });

  initPlayer();
  logMilestone('Système SYNTHCORP initialisé', '');
}

document.addEventListener('DOMContentLoaded', init);
