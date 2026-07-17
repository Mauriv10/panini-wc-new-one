(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const rawConfig = window.WC_SUPABASE_CONFIG || window.SUPABASE_CONFIG || {};
  const config = {
    url: String(rawConfig.url || rawConfig.supabaseUrl || "").trim(),
    publishableKey: String(rawConfig.publishableKey || rawConfig.anonKey || rawConfig.key || "").trim()
  };
  const keyLooksValid = /^(sb_publishable_|eyJ)/.test(config.publishableKey);
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url) && keyLooksValid;
  const state = { client: null, session: null, localBypass: false, ready: false };

  function emit(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }
  function setMessage(text = "", success = false) {
    const node = $("#authMessage");
    if (!node) return;
    node.textContent = text;
    node.classList.toggle("success", success);
  }
  function setBusy(busy) {
    const node = $("#authGoogleButton");
    if (node) disabled(node, busy);
  }
  function disabled(node, value){ node.disabled=value; }
  function showAuthStep(step = "welcome") {
    $("#authWelcomeStep")?.classList.toggle("is-active", step === "welcome");
    $("#authLoginStep")?.classList.toggle("is-active", step === "login");
    setMessage();
  }
  function openGate({ login = false } = {}) {
    const gate = $("#authGate"); if (!gate) return;
    gate.hidden = false;
    document.body.classList.add("auth-locked");
    showAuthStep(login ? "login" : "welcome");
  }
  function closeGate() {
    const gate = $("#authGate"); if (!gate) return;
    gate.hidden = true;
    document.body.classList.remove("auth-locked");
  }
  function updateAccountUI() {
    const email = state.session?.user?.email || "";
    const status = $("#accountStatusLabel");
    const label = $("#accountEmailLabel");
    const action = $("#accountActionButton");
    if (!status || !label || !action) return;
    if (state.session) {
      status.textContent = "Sesión iniciada";
      label.textContent = email || "Cuenta conectada";
      action.textContent = "Cerrar sesión";
    } else {
      status.textContent = configured ? "Sin sesión" : "Modo local";
      label.textContent = configured ? "Inicia sesión para sincronizar" : "Supabase pendiente de configurar";
      action.textContent = "Iniciar sesión";
    }
  }
  async function oauth() {
    if (!state.client) return;
    setBusy(true); setMessage();
    const { error } = await state.client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href.split("#")[0].split("?")[0] }
    });
    if (error) { setMessage(error.message); setBusy(false); }
  }
  async function signOut() {
    if (state.client && state.session) await state.client.auth.signOut();
    state.localBypass = false;
    openGate(); updateAccountUI();
  }
  async function init() {
    const configuredPanel = $("#authConfiguredPanel");
    const setupPanel = $("#authSetupPanel");
    if (!configured || !window.supabase?.createClient) {
      if(configuredPanel) configuredPanel.hidden = true;
      if(setupPanel) setupPanel.hidden = false;
      const setupText = setupPanel?.querySelector("p");
      if (setupText) setupText.innerHTML = 'Revisa <code>supabase-config.js</code>: la URL y la Publishable key deben ser válidas.';
      openGate({login:true});
      state.ready = true; updateAccountUI(); emit("wc-auth-ready", { session: null, configured: false }); return;
    }
    setupPanel.hidden = true; configuredPanel.hidden = false;
    state.client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    window.wcSupabase = state.client;
    const { data } = await state.client.auth.getSession();
    state.session = data.session;
    state.client.auth.onAuthStateChange((event, session) => {
      state.session = session;
      if (session) closeGate(); else if (event === "SIGNED_OUT") openGate();
      updateAccountUI(); emit("wc-auth-changed", { event, session });
    });
    state.ready = true;
    if (state.session) closeGate(); else openGate();
    updateAccountUI(); emit("wc-auth-ready", { session: state.session, configured: true });
  }
  document.addEventListener("DOMContentLoaded", () => {
    $("#authWelcomeContinue")?.addEventListener("click", () => showAuthStep("login"));
    $("#authBackToWelcome")?.addEventListener("click", () => showAuthStep("welcome"));
    $("#authGoogleButton")?.addEventListener("click", oauth);
    $("#authLocalButton")?.addEventListener("click", () => { state.localBypass = true; closeGate(); updateAccountUI(); emit("wc-auth-local-bypass"); });
    $("#accountActionButton")?.addEventListener("click", () => state.session ? signOut() : openGate({login:true}));
    init().catch(error => { console.error(error); setMessage("No se pudo iniciar el sistema de cuentas."); openGate({login:true}); });
  });
  window.WCAuth = { get client(){ return state.client; }, get session(){ return state.session; }, get configured(){ return configured; }, open: () => openGate({login:true}), signOut };
})();
