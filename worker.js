import { DurableObject } from "cloudflare:workers";

const INDEX_HTML = "<!doctype html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\" />\n  <meta name=\"theme-color\" content=\"#07111f\" />\n  <title>TIC TAC — Fous rires garantis</title>\n  <link rel=\"stylesheet\" href=\"/style.css\" />\n</head>\n<body>\n  <main id=\"app\"></main>\n  <script type=\"module\" src=\"/app.js\"></script>\n</body>\n</html>\n";
const STYLE_CSS = ":root {\n  color-scheme: dark;\n  --bg: #06101d;\n  --panel: #101b2c;\n  --panel2: #13213a;\n  --text: #f7f8ff;\n  --muted: #9eacc2;\n  --line: rgba(255,255,255,.09);\n  --purple: #7b42ff;\n  --pink: #ff3dad;\n  --orange: #ff8a24;\n  --blue: #28b5ff;\n  --green: #34d17f;\n  --danger: #ff4f68;\n  --shadow: 0 18px 60px rgba(0,0,0,.35);\n}\n* { box-sizing: border-box; }\nhtml, body { margin: 0; min-height: 100%; background: radial-gradient(circle at 50% 0, #142643 0, var(--bg) 42%, #040a12 100%); color: var(--text); font-family: Inter, ui-rounded, \"SF Pro Rounded\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif; }\nbody { min-height: 100svh; }\nbutton, input { font: inherit; }\nbutton { -webkit-tap-highlight-color: transparent; }\n#app { min-height: 100svh; }\n.screen { width: min(100%, 560px); min-height: 100svh; margin: 0 auto; padding: max(22px, env(safe-area-inset-top)) 18px max(28px, env(safe-area-inset-bottom)); display: flex; flex-direction: column; }\n.topbar { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px; }\n.brand { text-align:center; margin: 8px 0 22px; }\n.logo { font-size: clamp(38px, 11vw, 58px); font-weight: 1000; letter-spacing:-3px; line-height:.95; }\n.logo span:nth-child(1), .logo span:nth-child(5) { color:#ffbf37; text-shadow:0 0 18px #ff9b2b66; }\n.logo span:nth-child(2), .logo span:nth-child(6) { color:#ff45c5; text-shadow:0 0 18px #ff45c566; }\n.logo span:nth-child(3) { color:#8c5cff; text-shadow:0 0 18px #8c5cff66; }\n.logo span:nth-child(4) { color:#39c7ff; text-shadow:0 0 18px #39c7ff66; }\n.tagline { color:#d8dff0; font-weight:800; margin-top:8px; font-size:18px; }\n.subtle { color:var(--muted); font-size:14px; }\n.card { background: linear-gradient(180deg, rgba(25,42,70,.94), rgba(13,25,43,.94)); border:1px solid var(--line); border-radius:22px; box-shadow:var(--shadow); }\n.games { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px; }\n.game-card { min-height:126px; padding:18px 14px; position:relative; overflow:hidden; cursor:pointer; }\n.game-card .icon { font-size:34px; margin-bottom:12px; }\n.game-card h3 { margin:0; font-size:17px; }\n.game-card small { color:var(--muted); display:block; margin-top:5px; }\n.game-card.locked { opacity:.58; }\n.game-card.locked::after { content:\"Bientôt\"; position:absolute; right:10px; top:10px; font-size:11px; padding:5px 8px; border:1px solid var(--line); border-radius:999px; background:#0b1422; }\n.accent-purple { box-shadow: inset 0 0 0 1px rgba(123,66,255,.35), 0 12px 35px rgba(83,37,183,.16); }\n.accent-orange { box-shadow: inset 0 0 0 1px rgba(255,138,36,.32), 0 12px 35px rgba(255,138,36,.10); }\n.accent-blue { box-shadow: inset 0 0 0 1px rgba(40,181,255,.30), 0 12px 35px rgba(40,181,255,.10); }\n.accent-green { box-shadow: inset 0 0 0 1px rgba(52,209,127,.30), 0 12px 35px rgba(52,209,127,.10); }\n.btn { width:100%; border:0; border-radius:17px; min-height:56px; padding:14px 18px; color:white; font-weight:900; cursor:pointer; transition:transform .12s ease, opacity .12s ease; }\n.btn:active { transform:scale(.985); }\n.btn:disabled { opacity:.38; cursor:not-allowed; }\n.btn.primary { background:linear-gradient(90deg, #7048ff, #a34dff); box-shadow:0 12px 30px rgba(111,72,255,.28); }\n.btn.secondary { background:#15243b; border:1px solid var(--line); }\n.btn.danger { background:#3a1420; color:#ffbdc7; border:1px solid rgba(255,79,104,.35); }\n.btn.small { width:auto; min-height:42px; padding:9px 14px; border-radius:13px; }\n.stack { display:flex; flex-direction:column; gap:12px; }\n.row { display:flex; gap:10px; align-items:center; }\n.row > * { flex:1; }\n.section-title { margin: 8px 0 12px; font-size:20px; }\n.setting { padding:15px 16px; display:flex; justify-content:space-between; align-items:center; gap:14px; }\n.setting strong { font-size:17px; }\n.pill { flex:none; padding:7px 11px; border-radius:999px; background:#0c1728; border:1px solid var(--line); color:#e7ebf5; font-weight:800; }\n.chips { display:flex; flex-wrap:wrap; gap:8px; padding:14px 16px 17px; }\n.chip { padding:8px 11px; border-radius:999px; background:#151d31; border:1px solid rgba(123,66,255,.35); font-size:13px; font-weight:800; }\n.field { width:100%; min-height:54px; border-radius:16px; border:1px solid var(--line); background:#0b1627; color:white; padding:13px 15px; outline:none; }\n.field:focus { border-color:rgba(123,66,255,.8); box-shadow:0 0 0 3px rgba(123,66,255,.12); }\n.player-line { padding:12px 14px; display:flex; align-items:center; gap:11px; }\n.player-avatar { width:39px; height:39px; flex:none; border-radius:50%; display:grid; place-items:center; font-weight:1000; background:linear-gradient(135deg,#7048ff,#e24cff); }\n.player-name { font-weight:900; }\n.status-dot { width:9px; height:9px; border-radius:50%; background:#6d7d93; margin-left:auto; }\n.status-dot.on { background:#35db82; box-shadow:0 0 12px #35db82; }\n.back { border:0; background:#111e32; color:white; width:42px; height:42px; border-radius:13px; font-size:20px; }\n.page-title { font-size:27px; margin:0; }\n.footer-links { margin-top:auto; display:flex; justify-content:center; gap:24px; padding-top:22px; }\n.linkbtn { border:0; background:transparent; color:var(--muted); font-weight:800; padding:8px; }\n.hero-status { text-align:center; padding:20px; }\n.code { letter-spacing:4px; font-size:24px; font-weight:1000; }\n.notice { padding:12px 14px; border-radius:15px; background:#0f1a2b; color:#c8d1e3; border:1px solid var(--line); font-size:14px; }\n.wheel-wrap { flex:1; display:grid; place-items:center; min-height:430px; }\n.wheel { width:min(82vw, 360px); aspect-ratio:1; border-radius:50%; position:relative; border:8px solid #202d48; background: conic-gradient(from -6.9deg, #823cff 0 13.84deg, #ff42b3 13.84deg 27.68deg, #ff7e2b 27.68deg 41.52deg, #38c6ff 41.52deg 55.36deg, #39d184 55.36deg 69.2deg, #823cff 69.2deg 83.04deg, #ff42b3 83.04deg 96.88deg, #ff7e2b 96.88deg 110.72deg, #38c6ff 110.72deg 124.56deg, #39d184 124.56deg 138.4deg, #823cff 138.4deg 152.24deg, #ff42b3 152.24deg 166.08deg, #ff7e2b 166.08deg 179.92deg, #38c6ff 179.92deg 193.76deg, #39d184 193.76deg 207.6deg, #823cff 207.6deg 221.44deg, #ff42b3 221.44deg 235.28deg, #ff7e2b 235.28deg 249.12deg, #38c6ff 249.12deg 262.96deg, #39d184 262.96deg 276.8deg, #823cff 276.8deg 290.64deg, #ff42b3 290.64deg 304.48deg, #ff7e2b 304.48deg 318.32deg, #38c6ff 318.32deg 332.16deg, #39d184 332.16deg 346deg, #823cff 346deg 360deg); box-shadow:0 0 45px rgba(117,70,255,.35); transition:transform 3.2s cubic-bezier(.12,.72,.18,1); }\n.wheel::after { content:\"\"; position:absolute; inset:39%; border-radius:50%; background:#0b1424; border:5px solid #d7e2ff; box-shadow:0 0 24px rgba(255,255,255,.18); }\n.letter { position:absolute; left:50%; top:50%; width:26px; height:26px; margin:-13px; display:grid; place-items:center; font-weight:1000; font-size:12px; color:white; text-shadow:0 1px 3px #000; transform: rotate(calc(var(--i) * 13.846deg)) translateY(-145px) rotate(calc(var(--i) * -13.846deg)); z-index:2; }\n.pointer { position:absolute; top:-18px; left:50%; transform:translateX(-50%); width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:0;border-bottom:28px solid #fff; z-index:5; filter:drop-shadow(0 5px 8px #0008); }\n.timer { font-size:54px; font-weight:1000; letter-spacing:-2px; text-align:center; margin:6px 0 16px; }\n.timer.danger { color:#ff667d; animation:pulse .6s infinite alternate; }\n@keyframes pulse { to { transform:scale(1.045); } }\n.letter-badge { width:68px; height:68px; border-radius:22px; display:grid; place-items:center; margin:0 auto 6px; font-size:38px; font-weight:1000; background:linear-gradient(135deg,#6f44ff,#ff42bd); box-shadow:0 10px 28px rgba(123,66,255,.3); }\n.answers { display:flex; flex-direction:column; gap:10px; }\n.answer-row label { display:block; font-size:13px; color:#b4bfd1; margin:0 0 6px 3px; font-weight:800; }\n.answer-row input[disabled] { opacity:.66; }\n.review-cat { margin-bottom:16px; }\n.review-cat h3 { margin:0 0 9px; font-size:15px; color:#c7d0e1; }\n.review-answer { display:flex; align-items:center; gap:9px; padding:10px 12px; border-radius:14px; border:1px solid var(--line); background:#0c1727; margin:6px 0; }\n.review-answer.invalid { opacity:.45; text-decoration:line-through; border-color:rgba(255,79,104,.35); }\n.review-answer button { margin-left:auto; border:0; background:#17253a; color:white; width:36px; height:36px; border-radius:11px; }\n.score-line { display:flex; align-items:center; padding:13px 14px; gap:12px; }\n.score-line .points { margin-left:auto; font-size:20px; font-weight:1000; }\n.champion { text-align:center; margin:22px 0; position:relative; z-index:2; }\n.champion h1 { font-size:24px; margin:0 0 14px; color:#ffd65c; }\n.champion-name { font-size:clamp(34px,10vw,54px); font-weight:1000; text-shadow:0 0 28px rgba(255,73,194,.35); }\n.confetti { position:fixed; inset:0; pointer-events:none; overflow:hidden; z-index:20; }\n.confetti i { position:absolute; top:-18px; left:var(--x); width:10px; height:18px; border-radius:3px; background:hsl(var(--h) 90% 58%); transform:rotate(var(--r)); animation:fall var(--d) linear var(--delay) forwards; }\n@keyframes fall { to { transform:translate3d(var(--drift), 110vh,0) rotate(760deg); } }\n.modal { position:fixed; inset:0; background:rgba(2,7,13,.78); display:grid; place-items:center; padding:20px; z-index:30; backdrop-filter:blur(8px); }\n.modal .box { width:min(100%,500px); padding:22px; }\n.hidden { display:none !important; }\n.center { text-align:center; }\n.muted { color:var(--muted); }\n.spacer { height:10px; }\n";
const APP_JS = "const app = document.querySelector(\"#app\");\nconst CATEGORIES = [\"Pays\", \"Animal\", \"Métier\", \"Nourriture\", \"Couleur\", \"Objet\"];\nconst ALPHABET = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\".split(\"\");\nconst pathTag = location.pathname.match(/^\\/t\\/([^/]+)/)?.[1];\nconst tagId = decodeURIComponent(pathTag || localStorage.getItem(\"tictac.tagId\") || \"MANU-TEST\");\nlocalStorage.setItem(\"tictac.tagId\", tagId);\nconst deviceId = localStorage.getItem(\"tictac.deviceId\") || crypto.randomUUID();\nlocalStorage.setItem(\"tictac.deviceId\", deviceId);\n\nlet roomCode = localStorage.getItem(`tictac.room.${tagId}`) || null;\nlet ws = null;\nlet state = null;\nlet isHost = false;\nlet myPlayerId = localStorage.getItem(`tictac.player.${tagId}`) || null;\nlet timerHandle = null;\nlet phaseHandle = null;\nlet audioCtx = null;\nlet startSoundDoneForRound = 0;\nlet endSoundDoneForRound = 0;\n\nfunction unlockAudio() {\n  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n  if (audioCtx.state === \"suspended\") audioCtx.resume().catch(()=>{});\n}\ndocument.addEventListener(\"pointerdown\", unlockAudio, { once: true });\n\nfunction tone(freq, duration, type = \"sine\", gain = .05, delay = 0) {\n  if (!audioCtx) return;\n  const o = audioCtx.createOscillator();\n  const g = audioCtx.createGain();\n  o.type = type; o.frequency.value = freq;\n  g.gain.setValueAtTime(0.0001, audioCtx.currentTime + delay);\n  g.gain.exponentialRampToValueAtTime(gain, audioCtx.currentTime + delay + .01);\n  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);\n  o.connect(g); g.connect(audioCtx.destination);\n  o.start(audioCtx.currentTime + delay); o.stop(audioCtx.currentTime + delay + duration + .02);\n}\nfunction soundStart() { tone(740,.12,\"square\",.035); tone(980,.16,\"square\",.035,.13); }\nfunction soundBell() { tone(880,.55,\"sine\",.05); tone(1320,.7,\"sine\",.03,.04); tone(1760,.75,\"sine\",.018,.08); }\n\nconst esc = (s) => String(s ?? \"\").replace(/[&<>\"']/g, (c) => ({\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",'\"':\"&quot;\",\"'\":\"&#039;\"}[c]));\nconst btn = (label, cls=\"primary\", attrs=\"\") => `<button class=\"btn ${cls}\" ${attrs}>${label}</button>`;\nconst logo = () => `<div class=\"brand\"><div class=\"logo\"><span>T</span><span>I</span><span>C</span> <span>T</span><span>A</span><span>C</span></div><div class=\"tagline\">Fous rires garantis</div></div>`;\n\nasync function api(url, options={}) {\n  const res = await fetch(url, { ...options, headers: { \"content-type\":\"application/json\", ...(options.headers||{}) } });\n  const data = await res.json().catch(()=>({}));\n  if (!res.ok) throw new Error(data.error || \"Erreur réseau\");\n  return data;\n}\n\nasync function boot() {\n  try {\n    const active = await api(`/api/tag/${encodeURIComponent(tagId)}/active`);\n    if (active.active) {\n      roomCode = active.roomCode;\n      localStorage.setItem(`tictac.room.${tagId}`, roomCode);\n      connectRoom();\n      return;\n    }\n  } catch {}\n  renderHome();\n}\n\nfunction renderHome() {\n  clearLoops();\n  state = null; isHost = false;\n  app.innerHTML = `<section class=\"screen\">\n    ${logo()}\n    <div class=\"games\">\n      <div class=\"game-card card accent-purple\" id=\"petitBacCard\"><div class=\"icon\">📝</div><h3>Petit Bac</h3><small>10 manches · 60 s</small></div>\n      <div class=\"game-card card accent-orange locked\"><div class=\"icon\">🎭</div><h3>Mime</h3><small>À venir</small></div>\n      <div class=\"game-card card accent-blue locked\"><div class=\"icon\">❓</div><h3>Qui suis-je ?</h3><small>À venir</small></div>\n      <div class=\"game-card card accent-green locked\"><div class=\"icon\">⏱️</div><h3>Catégorie Chrono</h3><small>À venir</small></div>\n    </div>\n    <div class=\"stack\">\n      ${btn(\"Créer une partie\", \"primary\", `id=\"createBtn\"`)}\n      ${btn(\"Rejoindre une partie\", \"secondary\", `id=\"joinBtn\"`)}\n    </div>\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"settingsBtn\">⚙︎ Réglages</button><button class=\"linkbtn\" id=\"aboutBtn\">À propos</button></div>\n  </section>`;\n  document.querySelector(\"#createBtn\").onclick = renderSetup;\n  document.querySelector(\"#petitBacCard\").onclick = renderSetup;\n  document.querySelector(\"#joinBtn\").onclick = async () => {\n    try {\n      const active = await api(`/api/tag/${encodeURIComponent(tagId)}/active`);\n      if (!active.active) return toast(\"Aucune partie n’est ouverte sur cette puce.\");\n      roomCode = active.roomCode; localStorage.setItem(`tictac.room.${tagId}`, roomCode); connectRoom();\n    } catch(e) { toast(e.message); }\n  };\n  document.querySelector(\"#aboutBtn\").onclick = renderAbout;\n  document.querySelector(\"#settingsBtn\").onclick = () => toast(\"Réglages : le son sera activable/désactivable dans la version suivante.\");\n}\n\nfunction renderAbout() {\n  app.innerHTML = `<section class=\"screen\">\n    <div class=\"topbar\"><button class=\"back\" id=\"back\">‹</button><h1 class=\"page-title\">À propos</h1><span></span></div>\n    ${logo()}\n    <div class=\"card\" style=\"padding:20px\">\n      <p><strong>TIC TAC</strong> est un jeu multijoueur à partager directement depuis les téléphones.</p>\n      <p class=\"muted\">Aucune application à installer. La puce NFC ouvre l’accès au jeu et permet aux joueurs de rejoindre la même partie.</p>\n      <p class=\"muted\">Prototype V0.1 — Petit Bac en premier.</p>\n    </div>\n  </section>`;\n  document.querySelector(\"#back\").onclick = renderHome;\n}\n\nfunction renderSetup() {\n  const players = [];\n  const draw = () => {\n    app.innerHTML = `<section class=\"screen\">\n      <div class=\"topbar\"><button class=\"back\" id=\"back\">‹</button><h1 class=\"page-title\">Petit Bac</h1><span></span></div>\n      <div class=\"stack\">\n        <div class=\"card setting\"><span>Nombre de manches</span><strong>10</strong></div>\n        <div class=\"card setting\"><span>Temps par manche</span><strong>60 secondes</strong></div>\n        <div class=\"card\"><div class=\"setting\"><span>Catégorie</span></div><div class=\"chips\">${CATEGORIES.map(c=>`<span class=\"chip\">${c}</span>`).join(\"\")}</div></div>\n        <h2 class=\"section-title\">Joueurs</h2>\n        <div class=\"row\"><input class=\"field\" id=\"nameInput\" maxlength=\"24\" placeholder=\"Ajouter un prénom\"><button class=\"btn small primary\" id=\"addBtn\">Ajouter</button></div>\n        <div id=\"players\" class=\"stack\">${players.length ? players.map((p,i)=>`<div class=\"card player-line\"><div class=\"player-avatar\">${esc(p[0]?.toUpperCase()||\"?\")}</div><div class=\"player-name\">${esc(p)}</div><button class=\"back\" data-remove=\"${i}\" aria-label=\"Supprimer\">×</button></div>`).join(\"\") : `<div class=\"notice\">Aucun prénom au départ. C’est toi qui ajoutes les joueurs.</div>`}</div>\n        ${btn(\"Créer la partie\", \"primary\", `id=\"go\" ${players.length < 2 ? \"disabled\" : \"\"}`)}\n      </div>\n    </section>`;\n    document.querySelector(\"#back\").onclick = renderHome;\n    const input = document.querySelector(\"#nameInput\");\n    const add = () => {\n      const name = input.value.trim().replace(/\\s+/g,\" \").slice(0,24);\n      if (!name) return;\n      if (players.some(p=>p.toLowerCase()===name.toLowerCase())) return toast(\"Ce prénom est déjà dans la liste.\");\n      if (players.length >= 8) return toast(\"Maximum 8 joueurs.\");\n      players.push(name); draw();\n    };\n    document.querySelector(\"#addBtn\").onclick = add;\n    input.onkeydown = e => { if (e.key === \"Enter\") add(); };\n    document.querySelectorAll(\"[data-remove]\").forEach(b => b.onclick = () => { players.splice(Number(b.dataset.remove),1); draw(); });\n    const go = document.querySelector(\"#go\");\n    if (go) go.onclick = async () => {\n      go.disabled = true; go.textContent = \"Création…\";\n      try {\n        const out = await api(`/api/tag/${encodeURIComponent(tagId)}/create`, { method:\"POST\", body:JSON.stringify({ hostDeviceId:deviceId, players }) });\n        roomCode = out.roomCode; localStorage.setItem(`tictac.room.${tagId}`, roomCode); connectRoom();\n      } catch(e) { toast(e.message); go.disabled=false; go.textContent=\"Créer la partie\"; }\n    };\n  };\n  draw();\n}\n\nfunction connectRoom() {\n  if (!roomCode) return renderHome();\n  if (ws) try { ws.close(); } catch {}\n  const proto = location.protocol === \"https:\" ? \"wss:\" : \"ws:\";\n  ws = new WebSocket(`${proto}//${location.host}/api/room/${encodeURIComponent(roomCode)}/ws`);\n  renderConnecting();\n  ws.onopen = () => send({ type:\"hello\", deviceId });\n  ws.onmessage = (ev) => {\n    const msg = JSON.parse(ev.data);\n    if (msg.type === \"role\") {\n      isHost = msg.host;\n      if (msg.playerId) { myPlayerId = msg.playerId; localStorage.setItem(`tictac.player.${tagId}`, myPlayerId); }\n      if (state) renderState();\n    }\n    if (msg.type === \"claimed\") { myPlayerId = msg.playerId; isHost = msg.host; localStorage.setItem(`tictac.player.${tagId}`, myPlayerId); }\n    if (msg.type === \"error\") toast(msg.message);\n    if (msg.type === \"state\") { state = msg.state; renderState(); }\n  };\n  ws.onclose = () => { if (state?.status !== \"ended\") setTimeout(()=>{ if (roomCode) connectRoom(); }, 1200); };\n}\nfunction send(data) { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ ...data, deviceId })); }\nfunction renderConnecting() { app.innerHTML = `<section class=\"screen center\">${logo()}<div class=\"card hero-status\"><h2>Connexion à la partie…</h2><p class=\"muted\">${esc(roomCode||\"\")}</p></div></section>`; }\n\nfunction renderState() {\n  if (!state) return;\n  if (state.ended) return renderEnded();\n  if (!myPlayerId || !state.players.some(p=>p.id===myPlayerId && p.claimed)) return renderClaim();\n  if (state.status === \"lobby\") return renderLobby();\n  if (state.status === \"playing\") return renderRound();\n  if (state.status === \"review\") return renderReview();\n  if (state.status === \"roundResult\") return renderRoundResult();\n  if (state.status === \"finished\") return renderFinal();\n}\n\nfunction renderClaim() {\n  clearLoops();\n  app.innerHTML = `<section class=\"screen\">\n    ${logo()}\n    <div class=\"card hero-status\"><div class=\"subtle\">Partie ${esc(state.roomCode)}</div><h2>Choisis ton prénom</h2><p class=\"muted\">Les prénoms ont été ajoutés par l’hôte.</p></div>\n    <div class=\"stack\">${state.players.map(p=>`<button class=\"btn ${p.claimed ? \"secondary\" : \"primary\"}\" data-claim=\"${p.id}\" ${p.claimed ? \"disabled\" : \"\"}>${esc(p.name)}${p.claimed ? \" — pris\" : \"\"}</button>`).join(\"\")}</div>\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"quit\">Quitter la partie</button></div>\n  </section>`;\n  document.querySelectorAll(\"[data-claim]\").forEach(b=>b.onclick=()=>{ unlockAudio(); send({type:\"claim\", playerId:b.dataset.claim}); });\n  document.querySelector(\"#quit\").onclick = leaveLocal;\n}\n\nfunction renderLobby() {\n  clearLoops();\n  const connected = state.players.filter(p=>p.connected).length;\n  app.innerHTML = `<section class=\"screen\">\n    <div class=\"topbar\"><span></span><h1 class=\"page-title\">Petit Bac</h1><span></span></div>\n    <div class=\"card hero-status\"><div class=\"subtle\">Partie ${esc(state.roomCode)}</div><h2>Tout le monde est prêt ?</h2><p class=\"muted\">${connected}/${state.players.length} téléphone(s) connecté(s)</p></div>\n    <div class=\"stack\">${state.players.map(p=>`<div class=\"card player-line\"><div class=\"player-avatar\">${esc(p.name[0]?.toUpperCase())}</div><div><div class=\"player-name\">${esc(p.name)}</div><div class=\"subtle\">${p.id===myPlayerId ? \"Ce téléphone\" : p.claimed ? \"Prénom attribué\" : \"En attente\"}</div></div><span class=\"status-dot ${p.connected?\"on\":\"\"}\"></span></div>`).join(\"\")}</div>\n    <div class=\"spacer\"></div>\n    ${isHost ? btn(\"C’est parti !\", \"primary\", `id=\"start\" ${connected < 2 ? \"disabled\" : \"\"}`) : `<div class=\"notice center\">L’hôte lancera la partie.</div>`}\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"quit\">Quitter la partie</button>${isHost?`<button class=\"linkbtn\" id=\"end\">Terminer la session</button>`:\"\"}</div>\n  </section>`;\n  if (isHost && document.querySelector(\"#start\")) document.querySelector(\"#start\").onclick = ()=>{ unlockAudio(); send({type:\"startRound\"}); };\n  document.querySelector(\"#quit\").onclick = leaveLocal;\n  if (isHost) document.querySelector(\"#end\").onclick = ()=>{ if(confirm(\"Terminer la session pour tout le monde ?\")) send({type:\"endSession\"}); };\n}\n\nfunction phase() {\n  const now = Date.now();\n  if (now < state.roundStartsAt) return \"wheel\";\n  if (now < state.roundEndsAt) return \"answers\";\n  return \"expired\";\n}\n\nfunction renderRound() {\n  clearLoops();\n  const drawPhase = () => {\n    if (!state || state.status !== \"playing\") return;\n    const p = phase();\n    if (p === \"wheel\") renderWheel();\n    else if (p === \"answers\") renderAnswers();\n    else renderExpired();\n  };\n  drawPhase();\n  phaseHandle = setInterval(() => {\n    const p = phase();\n    if (p === \"answers\" && startSoundDoneForRound !== state.round) { startSoundDoneForRound = state.round; soundStart(); renderAnswers(); }\n    if (p === \"expired\") { clearInterval(phaseHandle); phaseHandle=null; renderExpired(); }\n  }, 100);\n}\n\nfunction renderWheel() {\n  const idx = ALPHABET.indexOf(state.letter);\n  const target = 360*6 - idx*(360/26);\n  app.innerHTML = `<section class=\"screen center\">\n    <div class=\"subtle\">Manche ${state.round}/10</div><h1 class=\"page-title\">La roue choisit la lettre…</h1>\n    <div class=\"wheel-wrap\"><div style=\"position:relative\"><div class=\"pointer\"></div><div class=\"wheel\" id=\"wheel\">${ALPHABET.map((l,i)=>`<span class=\"letter\" style=\"--i:${i}\">${l}</span>`).join(\"\")}</div></div></div>\n    <div class=\"notice\">Toutes les lettres A à Z sont conservées.</div>\n  </section>`;\n  requestAnimationFrame(()=>requestAnimationFrame(()=>{ const w=document.querySelector(\"#wheel\"); if(w) w.style.transform=`rotate(${target}deg)`; }));\n}\n\nfunction renderAnswers() {\n  if (startSoundDoneForRound !== state.round) { startSoundDoneForRound = state.round; soundStart(); }\n  const mine = state.answers?.[myPlayerId] || {};\n  app.innerHTML = `<section class=\"screen\">\n    <div class=\"topbar\"><div class=\"subtle\">Manche ${state.round}/10</div><strong>${esc(state.players.find(p=>p.id===myPlayerId)?.name||\"\")}</strong></div>\n    <div class=\"letter-badge\">${esc(state.letter)}</div><div class=\"timer\" id=\"timer\">60</div>\n    <div class=\"answers\">${CATEGORIES.map(c=>`<div class=\"answer-row\"><label>${c}</label><input class=\"field\" data-cat=\"${c}\" maxlength=\"40\" autocomplete=\"off\" autocapitalize=\"words\" value=\"${esc(mine[c]||\"\")}\" placeholder=\"Réponse en ${esc(state.letter)}…\"></div>`).join(\"\")}</div>\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"quit\">Quitter la partie</button></div>\n  </section>`;\n  document.querySelectorAll(\"[data-cat]\").forEach(input=>{\n    let t;\n    input.oninput = ()=>{ clearTimeout(t); t=setTimeout(()=>send({type:\"answer\", category:input.dataset.cat, value:input.value}),100); };\n  });\n  document.querySelector(\"#quit\").onclick = leaveLocal;\n  updateTimer();\n  timerHandle=setInterval(updateTimer,100);\n}\nfunction updateTimer() {\n  const el=document.querySelector(\"#timer\"); if(!el || !state) return;\n  const ms=Math.max(0,state.roundEndsAt-Date.now());\n  const sec=Math.ceil(ms/1000); el.textContent=String(sec).padStart(2,\"0\");\n  if(sec<=10) el.classList.add(\"danger\");\n  if(ms<=0) { clearInterval(timerHandle); timerHandle=null; renderExpired(); }\n}\n\nfunction renderExpired() {\n  clearLoops();\n  if (endSoundDoneForRound !== state.round) { endSoundDoneForRound = state.round; soundBell(); }\n  app.innerHTML = `<section class=\"screen center\">${logo()}<div class=\"card hero-status\"><div class=\"timer\">00</div><h2>Temps écoulé</h2><p class=\"muted\">Les réponses sont verrouillées. Plus personne ne peut écrire.</p></div><div class=\"notice\">Cloche de fin de manche.</div></section>`;\n  send({type:\"expireRound\"});\n}\n\nfunction renderReview() {\n  clearLoops();\n  app.innerHTML = `<section class=\"screen\">\n    <div class=\"topbar\"><span class=\"subtle\">Manche ${state.round}/10</span><h1 class=\"page-title\">Réponses</h1><span></span></div>\n    <div class=\"notice\">Une réponse non vide est comptée comme valable sauf si l’hôte la refuse. Les doublons valent 1 point, les réponses uniques 2 points.</div>\n    <div class=\"spacer\"></div>\n    ${CATEGORIES.map(cat=>`<div class=\"review-cat\"><h3>${cat}</h3>${state.players.map(p=>{\n      const value=state.answers?.[p.id]?.[cat]||\"\"; const key=`${cat}::${p.id}`; const invalid=Boolean(state.invalid?.[key]);\n      return `<div class=\"review-answer ${invalid?\"invalid\":\"\"}\"><strong>${esc(p.name)}</strong><span>${value?esc(value):\"—\"}</span>${isHost&&value?`<button data-invalid-cat=\"${cat}\" data-invalid-player=\"${p.id}\">${invalid?\"↩\":\"×\"}</button>`:\"\"}</div>`;\n    }).join(\"\")}</div>`).join(\"\")}\n    ${isHost ? btn(\"Valider la manche\", \"primary\", `id=\"score\"`) : `<div class=\"notice center\">L’hôte valide les réponses.</div>`}\n  </section>`;\n  document.querySelectorAll(\"[data-invalid-cat]\").forEach(b=>b.onclick=()=>send({type:\"toggleInvalid\",category:b.dataset.invalidCat,playerId:b.dataset.invalidPlayer}));\n  if(isHost) document.querySelector(\"#score\").onclick=()=>send({type:\"scoreRound\"});\n}\n\nfunction ranking() {\n  return [...state.players].sort((a,b)=>(state.totals?.[b.id]||0)-(state.totals?.[a.id]||0));\n}\nfunction renderRoundResult() {\n  clearLoops();\n  const rank=ranking();\n  app.innerHTML=`<section class=\"screen\">\n    <div class=\"topbar\"><span class=\"subtle\">Manche ${state.round}/10</span><h1 class=\"page-title\">Classement</h1><span></span></div>\n    <div class=\"stack\">${rank.map((p,i)=>`<div class=\"card score-line\"><div class=\"player-avatar\">${i+1}</div><div><div class=\"player-name\">${esc(p.name)}</div><div class=\"subtle\">+${state.roundScores?.[p.id]||0} cette manche</div></div><div class=\"points\">${state.totals?.[p.id]||0} pts</div></div>`).join(\"\")}</div>\n    <div class=\"spacer\"></div>${isHost?btn(`Manche ${state.round+1} — C’est parti !`,\"primary\",`id=\"next\"`):`<div class=\"notice center\">En attente de l’hôte…</div>`}\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"quit\">Quitter la partie</button></div>\n  </section>`;\n  if(isHost) document.querySelector(\"#next\").onclick=()=>send({type:\"startRound\"});\n  document.querySelector(\"#quit\").onclick=leaveLocal;\n}\n\nfunction renderFinal() {\n  clearLoops();\n  const rank=ranking();\n  const best=state.totals?.[rank[0]?.id]||0;\n  const winners=rank.filter(p=>(state.totals?.[p.id]||0)===best);\n  app.innerHTML=`<section class=\"screen\">\n    <div class=\"champion\"><h1>🏆 ${winners.length>1?\"Champions de la partie\":\"Champion de la partie\"}</h1><div class=\"champion-name\">${winners.map(w=>esc(w.name)).join(\" & \")}</div><div class=\"tagline\">${best} points</div></div>\n    <div class=\"stack\">${rank.map((p,i)=>`<div class=\"card score-line\"><div class=\"player-avatar\">${i+1}</div><div class=\"player-name\">${esc(p.name)}</div><div class=\"points\">${state.totals?.[p.id]||0} pts</div></div>`).join(\"\")}</div>\n    <div class=\"spacer\"></div>${isHost?btn(\"Retour aux jeux\",\"primary\",`id=\"backGames\"`):`<div class=\"notice center\">Partie terminée.</div>`}\n    <div class=\"footer-links\"><button class=\"linkbtn\" id=\"quit\">Quitter la partie</button>${isHost?`<button class=\"linkbtn\" id=\"end\">Terminer la session</button>`:\"\"}</div>\n    <div class=\"confetti\" id=\"confetti\"></div>\n  </section>`;\n  confetti();\n  if(isHost) {\n    document.querySelector(\"#backGames\").onclick=()=>send({type:\"backToLobby\"});\n    document.querySelector(\"#end\").onclick=()=>{ if(confirm(\"Terminer la session pour tout le monde ?\")) send({type:\"endSession\"}); };\n  }\n  document.querySelector(\"#quit\").onclick=leaveLocal;\n}\n\nfunction confetti() {\n  const box=document.querySelector(\"#confetti\"); if(!box) return;\n  box.innerHTML=Array.from({length:90},()=>`<i style=\"--x:${Math.random()*100}%;--h:${Math.random()*360};--r:${Math.random()*360}deg;--d:${2.8+Math.random()*2.5}s;--delay:${Math.random()*.8}s;--drift:${-70+Math.random()*140}px\"></i>`).join(\"\");\n  setTimeout(()=>{ if(box) box.remove(); },6500);\n}\nfunction renderEnded() {\n  clearLoops();\n  localStorage.removeItem(`tictac.room.${tagId}`); roomCode=null;\n  app.innerHTML=`<section class=\"screen center\">${logo()}<div class=\"card hero-status\"><h2>Session terminée</h2><p class=\"muted\">La prochaine partie repartira avec une nouvelle liste de prénoms.</p></div>${btn(\"Retour à l’accueil\",\"primary\",`id=\"home\"`)}</section>`;\n  document.querySelector(\"#home\").onclick=renderHome;\n}\nfunction leaveLocal() {\n  if (ws?.readyState === WebSocket.OPEN) {\n    try { ws.send(JSON.stringify({ type:\"leave\", deviceId })); } catch {}\n    const closing = ws; ws = null;\n    setTimeout(()=>{ try { closing.close(); } catch {} }, 120);\n  } else if (ws) { try { ws.close(); } catch {} ws = null; }\n  localStorage.removeItem(`tictac.room.${tagId}`);\n  localStorage.removeItem(`tictac.player.${tagId}`);\n  roomCode=null; myPlayerId=null; state=null; renderHome();\n}\nfunction clearLoops(){ if(timerHandle){clearInterval(timerHandle);timerHandle=null;} if(phaseHandle){clearInterval(phaseHandle);phaseHandle=null;} }\nfunction toast(message) {\n  const old=document.querySelector(\"#toast\"); if(old) old.remove();\n  const el=document.createElement(\"div\"); el.id=\"toast\"; el.textContent=message; Object.assign(el.style,{position:\"fixed\",left:\"50%\",bottom:\"calc(22px + env(safe-area-inset-bottom))\",transform:\"translateX(-50%)\",background:\"#f7f8ff\",color:\"#07111f\",padding:\"12px 16px\",borderRadius:\"14px\",fontWeight:\"900\",zIndex:99,maxWidth:\"90%\",boxShadow:\"0 15px 50px #0008\"}); document.body.appendChild(el); setTimeout(()=>el.remove(),2600);\n}\n\nboot();\n";


const CATEGORIES = ["Pays", "Animal", "Métier", "Nourriture", "Couleur", "Objet"];
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const JSON_HEADERS = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const clean = (value, max = 32) => String(value ?? "").trim().replace(/\s+/g, " ").slice(0, max);
const norm = (value) => clean(value, 64).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const code = (len = 6) => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
};
const id = () => crypto.randomUUID();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/health") return json({ ok: true, service: "TIC TAC", version: "0.1.0" });

    let m = path.match(/^\/api\/tag\/([^/]+)\/active$/);
    if (m && request.method === "GET") {
      const tagId = decodeURIComponent(m[1]);
      const stub = env.TAGS.get(env.TAGS.idFromName(tagId));
      return stub.fetch("https://tag.local/active");
    }

    m = path.match(/^\/api\/tag\/([^/]+)\/create$/);
    if (m && request.method === "POST") {
      const tagId = decodeURIComponent(m[1]);
      const body = await request.json().catch(() => ({}));
      const hostDeviceId = clean(body.hostDeviceId, 80);
      const names = Array.isArray(body.players) ? body.players.map((n) => clean(n, 24)).filter(Boolean) : [];
      const unique = [...new Set(names.map((n) => n.toLocaleLowerCase("fr")))];
      if (!hostDeviceId) return json({ error: "hostDeviceId manquant" }, 400);
      if (names.length < 2 || names.length > 8 || unique.length !== names.length) {
        return json({ error: "Prévoir 2 à 8 prénoms différents." }, 400);
      }

      const roomCode = code(6);
      const roomStub = env.ROOMS.get(env.ROOMS.idFromName(roomCode));
      const init = await roomStub.fetch("https://room.local/init", {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({ roomCode, tagId, hostDeviceId, players: names })
      });
      if (!init.ok) return init;

      const tagStub = env.TAGS.get(env.TAGS.idFromName(tagId));
      await tagStub.fetch("https://tag.local/set", {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({ roomCode })
      });
      return json({ ok: true, roomCode });
    }

    m = path.match(/^\/api\/room\/([^/]+)\/(state|ws)$/);
    if (m) {
      const roomCode = decodeURIComponent(m[1]);
      const action = m[2];
      const stub = env.ROOMS.get(env.ROOMS.idFromName(roomCode));
      const target = new URL(request.url);
      target.hostname = "room.local";
      target.pathname = `/${action}`;
      return stub.fetch(new Request(target, request));
    }

    // Interface intégrée : aucun dossier statique séparé n'est nécessaire.
    if (path === "/style.css") return new Response(STYLE_CSS, { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "no-cache" } });
    if (path === "/app.js") return new Response(APP_JS, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
    return new Response(INDEX_HTML, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" } });
  }
};

export class TagRegistry extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/active") {
      const data = await this.ctx.storage.get("active");
      if (!data) return json({ active: false });
      if (data.expiresAt && Date.now() > data.expiresAt) {
        await this.ctx.storage.delete("active");
        return json({ active: false });
      }
      return json({ active: true, roomCode: data.roomCode });
    }
    if (url.pathname === "/set" && request.method === "POST") {
      const body = await request.json();
      await this.ctx.storage.put("active", {
        roomCode: clean(body.roomCode, 12),
        expiresAt: Date.now() + 12 * 60 * 60 * 1000
      });
      return json({ ok: true });
    }
    if (url.pathname === "/clear" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const current = await this.ctx.storage.get("active");
      if (!current || !body.roomCode || current.roomCode === body.roomCode) {
        await this.ctx.storage.delete("active");
      }
      return json({ ok: true });
    }
    return new Response("Not found", { status: 404 });
  }
}

export class GameRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
    this.state = null;
    this.ready = this.ctx.blockConcurrencyWhile(async () => {
      this.state = await this.ctx.storage.get("state") || null;
    });
  }

  async save() {
    await this.ctx.storage.put("state", this.state);
  }

  connectedPlayerIds() {
    const set = new Set();
    for (const ws of this.ctx.getWebSockets()) {
      const att = ws.deserializeAttachment?.() || {};
      if (att.playerId) set.add(att.playerId);
    }
    return set;
  }

  publicState() {
    if (!this.state) return null;
    const connected = this.connectedPlayerIds();
    return {
      roomCode: this.state.roomCode,
      tagId: this.state.tagId,
      status: this.state.status,
      players: this.state.players.map((p) => ({
        id: p.id,
        name: p.name,
        claimed: Boolean(p.deviceId),
        connected: connected.has(p.id)
      })),
      totalRounds: 10,
      round: this.state.round,
      categories: CATEGORIES,
      letter: this.state.letter,
      roundStartsAt: this.state.roundStartsAt,
      roundEndsAt: this.state.roundEndsAt,
      answers: this.state.status === "review" || this.state.status === "roundResult" || this.state.status === "finished" ? this.state.answers : undefined,
      invalid: this.state.invalid,
      roundScores: this.state.roundScores,
      totals: this.state.totals,
      ended: this.state.status === "ended"
    };
  }

  async broadcast(extra = null) {
    const payload = JSON.stringify({ type: "state", state: this.publicState(), ...extra });
    for (const ws of this.ctx.getWebSockets()) {
      try { ws.send(payload); } catch {}
    }
  }

  isHost(deviceId) {
    return Boolean(deviceId && this.state && deviceId === this.state.hostDeviceId);
  }

  playerByDevice(deviceId) {
    return this.state?.players.find((p) => p.deviceId === deviceId) || null;
  }

  async fetch(request) {
    await this.ready;
    const url = new URL(request.url);

    if (url.pathname === "/init" && request.method === "POST") {
      if (this.state) return json({ ok: true, already: true });
      const body = await request.json();
      const names = body.players || [];
      this.state = {
        roomCode: clean(body.roomCode, 12),
        tagId: clean(body.tagId, 80),
        hostDeviceId: clean(body.hostDeviceId, 80),
        status: "lobby",
        players: names.map((name) => ({ id: id(), name: clean(name, 24), deviceId: null })),
        round: 0,
        letter: null,
        roundStartsAt: null,
        roundEndsAt: null,
        answers: {},
        invalid: {},
        roundScores: {},
        totals: {}
      };
      this.state.totals = Object.fromEntries(this.state.players.map((p) => [p.id, 0]));
      await this.save();
      return json({ ok: true });
    }

    if (!this.state) return json({ error: "Partie introuvable." }, 404);

    if (url.pathname === "/state") return json({ state: this.publicState() });

    if (url.pathname === "/ws") {
      if (request.headers.get("Upgrade") !== "websocket") return new Response("WebSocket required", { status: 426 });
      const pair = new WebSocketPair();
      const client = pair[0];
      const server = pair[1];
      this.ctx.acceptWebSocket(server);
      server.serializeAttachment({ deviceId: null, playerId: null });
      server.send(JSON.stringify({ type: "state", state: this.publicState() }));
      return new Response(null, { status: 101, webSocket: client });
    }

    return new Response("Not found", { status: 404 });
  }

  async webSocketMessage(ws, message) {
    await this.ready;
    let data;
    try { data = JSON.parse(typeof message === "string" ? message : new TextDecoder().decode(message)); }
    catch { return; }

    const type = data.type;
    const attachment = ws.deserializeAttachment?.() || { deviceId: null, playerId: null };

    if (type === "hello") {
      const deviceId = clean(data.deviceId, 80);
      const player = this.playerByDevice(deviceId);
      ws.serializeAttachment({ deviceId, playerId: player?.id || null });
      ws.send(JSON.stringify({ type: "role", host: this.isHost(deviceId), playerId: player?.id || null }));
      await this.broadcast();
      return;
    }

    if (type === "claim") {
      const deviceId = clean(data.deviceId, 80);
      const playerId = clean(data.playerId, 80);
      const player = this.state.players.find((p) => p.id === playerId);
      if (!player) return ws.send(JSON.stringify({ type: "error", message: "Joueur introuvable." }));
      const sameDeviceElsewhere = this.state.players.find((p) => p.deviceId === deviceId && p.id !== playerId);
      if (sameDeviceElsewhere) return ws.send(JSON.stringify({ type: "error", message: "Ce téléphone est déjà associé à un autre prénom." }));
      if (player.deviceId && player.deviceId !== deviceId) return ws.send(JSON.stringify({ type: "error", message: "Ce prénom est déjà pris sur un autre téléphone." }));
      player.deviceId = deviceId;
      ws.serializeAttachment({ deviceId, playerId });
      await this.save();
      ws.send(JSON.stringify({ type: "claimed", playerId, host: this.isHost(deviceId) }));
      await this.broadcast();
      return;
    }

    const deviceId = clean(data.deviceId || attachment.deviceId, 80);
    const player = this.playerByDevice(deviceId);

    if (type === "leave") {
      if (player) {
        player.deviceId = null;
        ws.serializeAttachment({ deviceId, playerId: null });
        await this.save();
        await this.broadcast();
      }
      return;
    }

    if (type === "startRound") {
      if (!this.isHost(deviceId)) return;
      if (!["lobby", "roundResult"].includes(this.state.status)) return;
      const nextRound = this.state.round + 1;
      if (nextRound > 10) return;
      const letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      const now = Date.now();
      this.state.round = nextRound;
      this.state.status = "playing";
      this.state.letter = letter;
      this.state.roundStartsAt = now + 3600;
      this.state.roundEndsAt = now + 3600 + 60_000;
      this.state.answers = Object.fromEntries(this.state.players.map((p) => [p.id, Object.fromEntries(CATEGORIES.map((c) => [c, ""]))]));
      this.state.invalid = {};
      this.state.roundScores = Object.fromEntries(this.state.players.map((p) => [p.id, 0]));
      await this.save();
      await this.broadcast();
      return;
    }

    if (type === "answer") {
      if (!player || this.state.status !== "playing") return;
      const now = Date.now();
      if (now < this.state.roundStartsAt || now >= this.state.roundEndsAt) return;
      const category = CATEGORIES.includes(data.category) ? data.category : null;
      if (!category) return;
      const value = clean(data.value, 40);
      this.state.answers[player.id] ||= {};
      this.state.answers[player.id][category] = value;
      await this.save();
      return;
    }

    if (type === "expireRound") {
      if (this.state.status !== "playing" || Date.now() < this.state.roundEndsAt) return;
      this.state.status = "review";
      await this.save();
      await this.broadcast();
      return;
    }

    if (type === "toggleInvalid") {
      if (!this.isHost(deviceId) || this.state.status !== "review") return;
      const category = CATEGORIES.includes(data.category) ? data.category : null;
      const playerId = clean(data.playerId, 80);
      if (!category || !this.state.players.some((p) => p.id === playerId)) return;
      const key = `${category}::${playerId}`;
      this.state.invalid[key] = !this.state.invalid[key];
      await this.save();
      await this.broadcast();
      return;
    }

    if (type === "scoreRound") {
      if (!this.isHost(deviceId) || this.state.status !== "review") return;
      const scores = Object.fromEntries(this.state.players.map((p) => [p.id, 0]));
      for (const category of CATEGORIES) {
        const groups = new Map();
        for (const p of this.state.players) {
          const answer = clean(this.state.answers?.[p.id]?.[category] || "", 40);
          const invalid = Boolean(this.state.invalid[`${category}::${p.id}`]);
          if (!answer || invalid) continue;
          const key = norm(answer);
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(p.id);
        }
        for (const ids of groups.values()) {
          const pts = ids.length === 1 ? 2 : 1;
          for (const playerId of ids) scores[playerId] += pts;
        }
      }
      this.state.roundScores = scores;
      for (const p of this.state.players) this.state.totals[p.id] = (this.state.totals[p.id] || 0) + (scores[p.id] || 0);
      this.state.status = this.state.round >= 10 ? "finished" : "roundResult";
      await this.save();
      await this.broadcast();
      return;
    }

    if (type === "backToLobby") {
      if (!this.isHost(deviceId)) return;
      this.state.status = "lobby";
      this.state.round = 0;
      this.state.letter = null;
      this.state.roundStartsAt = null;
      this.state.roundEndsAt = null;
      this.state.answers = {};
      this.state.invalid = {};
      this.state.roundScores = {};
      await this.save();
      await this.broadcast();
      return;
    }

    if (type === "endSession") {
      if (!this.isHost(deviceId)) return;
      this.state.status = "ended";
      await this.save();
      const tagStub = this.env.TAGS.get(this.env.TAGS.idFromName(this.state.tagId));
      await tagStub.fetch("https://tag.local/clear", {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({ roomCode: this.state.roomCode })
      });
      await this.broadcast();
    }
  }

  async webSocketClose() {
    await this.broadcast();
  }

  async webSocketError() {
    await this.broadcast();
  }
}
