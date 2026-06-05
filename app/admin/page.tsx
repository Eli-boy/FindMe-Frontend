"use client";

import { useEffect, useState } from "react";

const ADMIN_PASS = typeof window !== "undefined"
  ? sessionStorage.getItem("fm_admin_pass") || ""
  : "";

/* ── palette ── */
const D = "#0d1a0f";
const G = "#1db954";
const CARD = "#141f16";
const BORDER = "rgba(29,185,84,0.15)";

type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_method: string;
  items: any[];
  subtotal: number;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending:   "#f59e0b",
  packed:    "#3b82f6",
  delivered: "#1db954",
  cancelled: "#ef4444",
};

const tabs = ["📊 Overview", "📦 Orders", "👥 Customers", "⚙️ Settings"];

export default function AdminDashboard() {
  const [authed, setAuthed]     = useState(false);
  const [pass, setPass]         = useState("");
  const [passErr, setPassErr]   = useState(false);
  const [tab, setTab]           = useState(0);
  const [orders, setOrders]     = useState<Order[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState("");
  const [waNum, setWaNum]       = useState("2348073238118");
  const [discCode, setDiscCode] = useState("FINDME10");

  /* ── auth ── */
  const login = () => {
    if (pass === (process.env.NEXT_PUBLIC_ADMIN_PASS || "findme2026")) {
      setAuthed(true);
      sessionStorage.setItem("fm_admin", "1");
      sessionStorage.setItem("fm_admin_pass", pass);
    } else {
      setPassErr(true);
      setTimeout(() => setPassErr(false), 1200);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("fm_admin")) setAuthed(true);
  }, []);

  /* ── fetch orders via API (uses service role key — bypasses RLS) ── */
  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    const savedPass = sessionStorage.getItem("fm_admin_pass") || pass;
    fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_orders", password: savedPass }),
    })
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authed]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  /* ── update order status via API ── */
  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    const savedPass = sessionStorage.getItem("fm_admin_pass") || pass;
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_status", password: savedPass, id, status }),
    });
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
    showToast(`Order status updated to ${status}`);
    setSaving(false);
  };

  /* ── stats ── */
  const totalRevenue  = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders   = orders.length;
  const pending       = orders.filter((o) => o.status === "pending").length;
  const delivered     = orders.filter((o) => o.status === "delivered").length;

  const filtered = orders.filter((o) => {
    const matchSearch = !search ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      String(o.order_number).includes(search);
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  /* ── unique customers ── */
  const customers = Array.from(
    new Map(orders.map((o) => [o.customer_email, o])).values()
  );

  /* ── login screen ── */
  if (!authed) return (
    <div style={{ background: D, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(29,185,84,0.12)", border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>🔐</div>
        <h1 style={{ color: "#e8f5e8", fontWeight: 800, fontSize: 24, margin: "0 0 6px" }}>God Mode</h1>
        <p style={{ color: "#4a7a5a", fontSize: 13, marginBottom: 32 }}>FindMe Admin Dashboard</p>
        <input
          type="password"
          placeholder="Enter admin password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
          style={{
            width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 15,
            background: "rgba(255,255,255,0.05)",
            border: passErr ? "1.5px solid #ef4444" : `1.5px solid ${BORDER}`,
            color: "#e8f5e8", outline: "none", boxSizing: "border-box",
            fontFamily: "Syne, sans-serif", marginBottom: 14,
            transition: "border-color 0.2s",
          }}
        />
        {passErr && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 10 }}>Wrong password</p>}
        <button
          onClick={login}
          style={{ width: "100%", padding: 14, background: G, color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
        >
          Enter Dashboard →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: D, minHeight: "100vh", color: "#e8f5e8", fontFamily: "Syne, sans-serif" }}>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: G, color: "#000", padding: "12px 20px", borderRadius: 40, fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px rgba(29,185,84,0.4)" }}>
          ✓ {toast}
        </div>
      )}

      {/* ── ORDER DETAIL MODAL ── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22, color: "#e8f5e8" }}>Order #{selected.order_number}</h2>
                <p style={{ margin: "4px 0 0", color: "#4a7a5a", fontSize: 13 }}>{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#4a7a5a", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>

            {/* Customer */}
            <div style={{ background: "rgba(29,185,84,0.06)", borderRadius: 14, padding: "16px 20px", marginBottom: 20, border: `1px solid ${BORDER}` }}>
              <p style={{ margin: "0 0 6px", fontWeight: 700, color: G, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Customer</p>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#e8f5e8" }}>{selected.customer_name}</p>
              <p style={{ margin: "0 0 4px", color: "#4a7a5a", fontSize: 13 }}>{selected.customer_email}</p>
              <p style={{ margin: 0, color: "#4a7a5a", fontSize: 13 }}>{selected.customer_phone}</p>
            </div>

            {/* Items */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 12px", fontWeight: 700, color: G, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Items</p>
              {(selected.items || []).map((item: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${BORDER}`, fontSize: 14 }}>
                  <span style={{ color: "#e8f5e8" }}>{item.name} <span style={{ color: "#4a7a5a" }}>x{item.quantity}</span></span>
                  <span style={{ color: G, fontWeight: 700 }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontWeight: 800, fontSize: 16 }}>
                <span style={{ color: "#e8f5e8" }}>Total</span>
                <span style={{ color: G }}>₦{(selected.total || selected.subtotal || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery */}
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#4a7a5a", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
                {selected.delivery_method === "pickup" ? "Pickup" : "Delivery Address"}
              </p>
              <p style={{ margin: 0, color: "#e8f5e8", fontSize: 14 }}>
                {selected.delivery_method === "pickup" ? "🏪 Self Pickup" : `🚚 ${selected.delivery_address}`}
              </p>
            </div>

            {/* Status update */}
            <p style={{ margin: "0 0 10px", fontWeight: 700, color: G, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Update Status</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["pending", "packed", "delivered", "cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  disabled={saving}
                  style={{
                    padding: "9px 18px", borderRadius: 40, border: "none",
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                    cursor: "pointer", transition: "all 0.2s",
                    background: selected.status === s ? STATUS_COLORS[s] : "rgba(255,255,255,0.06)",
                    color: selected.status === s ? "#000" : "#4a7a5a",
                  }}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* WhatsApp customer */}
            <button
              onClick={() => window.open(`https://wa.me/${selected.customer_phone?.replace(/\D/g, "")}?text=Hello ${selected.customer_name}, regarding your FindMe order #${selected.order_number}`, "_blank")}
              style={{ width: "100%", marginTop: 20, padding: 13, background: "#25D366", color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
            >
              💬 Message Customer on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* ── SIDEBAR + MAIN ── */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        <div style={{ width: 240, background: CARD, borderRight: `1px solid ${BORDER}`, padding: "32px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
          <div style={{ padding: "0 24px 32px", borderBottom: `1px solid ${BORDER}` }}>
            <h1 style={{ fontWeight: 800, fontSize: 20, margin: 0, color: "#e8f5e8" }}>Find<span style={{ color: G }}>Me</span></h1>
            <p style={{ color: "#4a7a5a", fontSize: 12, margin: "4px 0 0", letterSpacing: 1 }}>GOD MODE</p>
          </div>
          <nav style={{ padding: "24px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                style={{
                  width: "100%", textAlign: "left", padding: "12px 16px", borderRadius: 12, border: "none",
                  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s",
                  background: tab === i ? "rgba(29,185,84,0.12)" : "transparent",
                  color: tab === i ? G : "#4a7a5a",
                  borderLeft: tab === i ? `3px solid ${G}` : "3px solid transparent",
                }}
              >{t}</button>
            ))}
          </nav>
          <div style={{ padding: "0 12px" }}>
            <button
              onClick={() => { sessionStorage.removeItem("fm_admin"); setAuthed(false); }}
              style={{ width: "100%", padding: "10px 16px", borderRadius: 12, border: `1px solid rgba(239,68,68,0.2)`, background: "rgba(239,68,68,0.06)", color: "#f87171", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              🚪 Sign Out
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: "40px 40px", overflowY: "auto" }}>

          {/* ── OVERVIEW ── */}
          {tab === 0 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 28, margin: "0 0 8px", color: "#e8f5e8" }}>Overview</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 36, fontSize: 14 }}>{new Date().toDateString()}</p>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40 }}>
                {[
                  { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: "💰", color: G },
                  { label: "Total Orders", value: totalOrders, icon: "📦", color: "#3b82f6" },
                  { label: "Pending", value: pending, icon: "⏳", color: "#f59e0b" },
                  { label: "Delivered", value: delivered, icon: "✅", color: G },
                ].map((s, i) => (
                  <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "24px 24px" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                    <p style={{ fontWeight: 800, fontSize: 28, color: s.color, margin: "0 0 4px", fontFamily: "Syne, sans-serif" }}>{s.value}</p>
                    <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#e8f5e8", marginBottom: 16 }}>Recent Orders</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {orders.slice(0, 5).map((o) => (
                  <div
                    key={o.id}
                    onClick={() => setSelected(o)}
                    style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                  >
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, color: "#e8f5e8", margin: "0 0 4px" }}>#{o.order_number} — {o.customer_name}</p>
                      <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontWeight: 800, color: G, fontSize: 15 }}>₦{(o.total || o.subtotal || 0).toLocaleString()}</span>
                      <span style={{ background: STATUS_COLORS[o.status] || "#4a7a5a", color: "#000", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                        {o.status || "pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === 1 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 28, margin: "0 0 4px", color: "#e8f5e8" }}>Orders</h2>
                  <p style={{ color: "#4a7a5a", fontSize: 14, margin: 0 }}>{filtered.length} orders</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    placeholder="Search name, email, #..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "10px 16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 40, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", width: 220 }}
                  />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ padding: "10px 16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 40, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", cursor: "pointer" }}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="packed">Packed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <p style={{ color: "#4a7a5a", textAlign: "center", padding: 40 }}>Loading orders...</p>
              ) : filtered.length === 0 ? (
                <p style={{ color: "#4a7a5a", textAlign: "center", padding: 40 }}>No orders found.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {filtered.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => setSelected(o)}
                      style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "18px 22px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(29,185,84,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📦</div>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: 15, color: "#e8f5e8", margin: "0 0 3px" }}>Order #{o.order_number}</p>
                            <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{o.customer_name} · {o.customer_email}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ color: "#4a7a5a", fontSize: 13 }}>{new Date(o.created_at).toLocaleDateString()}</span>
                          <span style={{ fontWeight: 800, color: G, fontSize: 16 }}>₦{(o.total || o.subtotal || 0).toLocaleString()}</span>
                          <span style={{ background: STATUS_COLORS[o.status || "pending"], color: "#000", padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                            {(o.status || "pending").charAt(0).toUpperCase() + (o.status || "pending").slice(1)}
                          </span>
                          <span style={{ background: "rgba(255,255,255,0.06)", color: "#4a7a5a", padding: "5px 12px", borderRadius: 20, fontSize: 12 }}>
                            {o.delivery_method === "pickup" ? "🏪 Pickup" : "🚚 Delivery"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {tab === 2 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 28, margin: "0 0 8px", color: "#e8f5e8" }}>Customers</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 28, fontSize: 14 }}>{customers.length} unique customers</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {customers.map((c, i) => {
                  const customerOrders = orders.filter((o) => o.customer_email === c.customer_email);
                  const spent = customerOrders.reduce((s, o) => s + (o.total || 0), 0);
                  return (
                    <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(29,185,84,0.12)", border: `1.5px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: G, flexShrink: 0 }}>
                          {c.customer_name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 15, color: "#e8f5e8", margin: "0 0 3px" }}>{c.customer_name}</p>
                          <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{c.customer_email} · {c.customer_phone}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontWeight: 800, color: G, fontSize: 16, margin: "0 0 2px" }}>₦{spent.toLocaleString()}</p>
                          <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{customerOrders.length} order{customerOrders.length !== 1 ? "s" : ""}</p>
                        </div>
                        <button
                          onClick={() => window.open(`https://wa.me/${c.customer_phone?.replace(/\D/g, "")}?text=Hello ${c.customer_name}, this is FindMe Nigeria!`, "_blank")}
                          style={{ padding: "8px 16px", background: "#25D366", border: "none", borderRadius: 40, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                        >
                          💬 WhatsApp
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 3 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 28, margin: "0 0 8px", color: "#e8f5e8" }}>Settings</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 36, fontSize: 14 }}>Manage your FindMe configuration</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 560 }}>
                {[
                  { label: "WhatsApp Number", desc: "Number that receives order notifications", value: waNum, set: setWaNum, icon: "📱" },
                  { label: "Discount Code", desc: "Code sent in order confirmation emails", value: discCode, set: setDiscCode, icon: "🎟️" },
                ].map((s, i) => (
                  <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 24 }}>{s.icon}</span>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 16, color: "#e8f5e8", margin: 0 }}>{s.label}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 13, margin: "3px 0 0" }}>{s.desc}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        value={s.value}
                        onChange={(e) => s.set(e.target.value)}
                        style={{ flex: 1, padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 12, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif" }}
                      />
                      <button
                        onClick={() => showToast(`${s.label} saved`)}
                        style={{ padding: "12px 20px", background: G, color: "#000", border: "none", borderRadius: 12, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}

                {/* Quick links */}
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20, padding: "24px" }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "#e8f5e8", margin: "0 0 16px" }}>🔗 Quick Links</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "View Live Website", href: "https://findme.com.ng" },
                      { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
                      { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
                      { label: "Resend Dashboard", href: "https://resend.com/emails" },
                    ].map((l, i) => (
                      <a key={i} href={l.href} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#e8f5e8", fontSize: 14, fontFamily: "Syne, sans-serif", transition: "border-color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                      >
                        {l.label} <span style={{ color: G }}>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
