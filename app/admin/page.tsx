"use client";

import { useEffect, useState } from "react";

const D = "#0d1a0f";
const G = "#1db954";
const CARD = "#141f16";
const BORDER = "rgba(29,185,84,0.15)";

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b", packed: "#3b82f6", delivered: "#1db954", cancelled: "#ef4444",
};

type Order = {
  id: string; order_number: number; customer_name: string; customer_email: string;
  customer_phone: string; delivery_address: string; delivery_method: string;
  items: any[]; subtotal: number; total: number; status: string; created_at: string;
};

type CMSField = { key: string; value: string; type: string };
type Product  = { id: number; name: string; price: number; coming_soon: boolean; image: string; short_desc: string; description: string; features: string[]; category: string; active: boolean };
type Testimonial = { id: number; name: string; text: string; active: boolean };
type FAQ = { id: number; question: string; answer: string; active: boolean };

const tabs = ["📊 Overview","📦 Orders","👥 Customers","🎨 CMS","🏷️ Products","💬 Testimonials","❓ FAQ","⚙️ Settings"];

const api = (action: string, extra = {}) =>
  fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, password: sessionStorage.getItem("fm_admin_pass") || "findme2026", ...extra }),
  }).then((r) => r.json());

export default function AdminDashboard() {
  const [authed, setAuthed]   = useState(false);
  const [pass, setPass]       = useState("");
  const [passErr, setPassErr] = useState(false);
  const [tab, setTab]         = useState(0);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState("");
  const [cms, setCms]         = useState<CMSField[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs]       = useState<FAQ[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editTestimonial, setEditTestimonial] = useState<Testimonial | null>(null);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);
  const [waNum, setWaNum]     = useState("2348073238118");
  const [discCode, setDiscCode] = useState("FINDME10");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const pw = () => sessionStorage.getItem("fm_admin_pass") || "findme2026";

  const login = () => {
    if (pass === (process.env.NEXT_PUBLIC_ADMIN_PASS || "findme2026")) {
      setAuthed(true);
      sessionStorage.setItem("fm_admin", "1");
      sessionStorage.setItem("fm_admin_pass", pass);
    } else { setPassErr(true); setTimeout(() => setPassErr(false), 1200); }
  };

  useEffect(() => {
    if (sessionStorage.getItem("fm_admin")) setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    api("get_orders").then((d) => { setOrders(d.orders || []); setLoading(false); });
    api("get_cms").then((d) => setCms(d.cms || []));
    api("get_products").then((d) => setProducts(d.products || []));
    api("get_testimonials").then((d) => setTestimonials(d.testimonials || []));
    api("get_faqs").then((d) => setFaqs(d.faqs || []));
  }, [authed]);

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await api("update_status", { id, status });
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
    showToast("Status updated"); setSaving(false);
  };

  const saveCms = async (key: string, value: string) => {
    await api("save_cms", { key, value });
    setCms((prev) => prev.map((c) => c.key === key ? { ...c, value } : c));
    showToast("Saved!");
  };

  const saveProduct = async (p: Product) => {
    setSaving(true);
    await api("save_product", { product: p });
    setProducts((prev) => prev.map((x) => x.id === p.id ? p : x));
    setEditProduct(null); showToast("Product saved!"); setSaving(false);
  };

  const saveTestimonial = async (t: Testimonial) => {
    await api("save_testimonial", { testimonial: t });
    setTestimonials((prev) => prev.map((x) => x.id === t.id ? t : x));
    setEditTestimonial(null); showToast("Testimonial saved!");
  };

  const saveFaq = async (f: FAQ) => {
    await api("save_faq", { faq: f });
    setFaqs((prev) => prev.map((x) => x.id === f.id ? f : x));
    setEditFaq(null); showToast("FAQ saved!");
  };

  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
  const customers = Array.from(new Map(orders.map((o) => [o.customer_email, o])).values());
  const filtered = orders.filter((o) => {
    const ms = !search || o.customer_name?.toLowerCase().includes(search.toLowerCase()) || String(o.order_number).includes(search);
    return ms && (filter === "all" || o.status === filter);
  });

  const cmsVal = (key: string) => cms.find((c) => c.key === key)?.value || "";

  /* ── INPUT STYLE ── */
  const inp = (extra = {}): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8",
    fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif",
    boxSizing: "border-box", ...extra,
  });

  const btn = (extra = {}): React.CSSProperties => ({
    padding: "10px 20px", background: G, color: "#000", border: "none",
    borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 700,
    fontSize: 13, cursor: "pointer", ...extra,
  });

  /* ── CARD STYLE ── */
  const card = (): React.CSSProperties => ({
    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 24, marginBottom: 16,
  });

  /* ── LOGIN ── */
  if (!authed) return (
    <div style={{ background: D, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>🔐</div>
        <h1 style={{ color: "#e8f5e8", fontWeight: 800, fontSize: 24, margin: "0 0 6px" }}>God Mode</h1>
        <p style={{ color: "#4a7a5a", fontSize: 13, marginBottom: 32 }}>FindMe Admin Dashboard</p>
        <input type="password" placeholder="Enter admin password" value={pass}
          onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()}
          style={{ ...inp(), marginBottom: 14, border: passErr ? "1.5px solid #ef4444" : `1.5px solid ${BORDER}` }} />
        {passErr && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 10 }}>Wrong password</p>}
        <button onClick={login} style={{ ...btn({ width: "100%", padding: 14, borderRadius: 40, fontSize: 15 }) }}>Enter Dashboard →</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: D, minHeight: "100vh", color: "#e8f5e8", fontFamily: "Syne, sans-serif" }}>

      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: G, color: "#000", padding: "12px 20px", borderRadius: 40, fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px rgba(29,185,84,0.4)" }}>✓ {toast}</div>}

      {/* ORDER MODAL */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22 }}>Order #{selected.order_number}</h2>
                <p style={{ margin: "4px 0 0", color: "#4a7a5a", fontSize: 13 }}>{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#4a7a5a", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ background: "rgba(29,185,84,0.06)", borderRadius: 12, padding: "14px 18px", marginBottom: 16, border: `1px solid ${BORDER}` }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: G, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Customer</p>
              <p style={{ margin: "0 0 2px", fontWeight: 700 }}>{selected.customer_name}</p>
              <p style={{ margin: 0, color: "#4a7a5a", fontSize: 13 }}>{selected.customer_email} · {selected.customer_phone}</p>
            </div>
            {(selected.items || []).map((item: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${BORDER}`, fontSize: 14 }}>
                <span>{item.name} <span style={{ color: "#4a7a5a" }}>x{item.quantity}</span></span>
                <span style={{ color: G, fontWeight: 700 }}>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontWeight: 800, fontSize: 16 }}>
              <span>Total</span><span style={{ color: G }}>₦{(selected.total || selected.subtotal || 0).toLocaleString()}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
              <p style={{ margin: "0 0 4px", color: "#4a7a5a", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{selected.delivery_method === "pickup" ? "Pickup" : "Delivery"}</p>
              <p style={{ margin: 0, fontSize: 14 }}>{selected.delivery_method === "pickup" ? "🏪 Self Pickup" : `🚚 ${selected.delivery_address}`}</p>
            </div>
            <p style={{ margin: "0 0 10px", fontWeight: 700, color: G, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Update Status</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {["pending","packed","delivered","cancelled"].map((s) => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} disabled={saving}
                  style={{ padding: "8px 16px", borderRadius: 40, border: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer",
                    background: selected.status === s ? STATUS_COLORS[s] : "rgba(255,255,255,0.06)",
                    color: selected.status === s ? "#000" : "#4a7a5a" }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                const phone = (selected.customer_phone || "").replace(/\D/g, "");
                const msg = "Hello " + selected.customer_name + ", regarding your FindMe order #" + selected.order_number;
                window.open("https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(msg), "_blank");
              }}
              style={{ width: "100%", padding: 12, background: "#25D366", color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              💬 Message on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT EDIT MODAL */}
      {editProduct && (
        <div onClick={() => setEditProduct(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20 }}>Edit Product</h2>
              <button onClick={() => setEditProduct(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, color: "#4a7a5a", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Product Name", key: "name" as keyof Product },
                { label: "Price (₦)", key: "price" as keyof Product },
                { label: "Image Path", key: "image" as keyof Product },
                { label: "Short Description", key: "short_desc" as keyof Product },
                { label: "Description", key: "description" as keyof Product },
              ].map((f) => (
                <div key={f.key}>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</p>
                  <input value={String(editProduct[f.key] ?? "")}
                    onChange={(e) => setEditProduct({ ...editProduct, [f.key]: f.key === "price" ? Number(e.target.value) : e.target.value })}
                    style={inp()} />
                </div>
              ))}
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 12, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Category</p>
                <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                  style={{ ...inp(), cursor: "pointer" }}>
                  {["sticker","key","bundle","pet"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#e8f5e8" }}>
                  <input type="checkbox" checked={editProduct.active} onChange={(e) => setEditProduct({ ...editProduct, active: e.target.checked })} />
                  Active (visible on site)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#e8f5e8" }}>
                  <input type="checkbox" checked={editProduct.coming_soon} onChange={(e) => setEditProduct({ ...editProduct, coming_soon: e.target.checked })} />
                  Coming Soon
                </label>
              </div>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 12, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Features (one per line)</p>
                <textarea value={(editProduct.features || []).join("\n")}
                  onChange={(e) => setEditProduct({ ...editProduct, features: e.target.value.split("\n") })}
                  rows={5} style={{ ...inp(), resize: "vertical" as any }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => saveProduct(editProduct)} disabled={saving} style={btn({ flex: 1, padding: "12px", borderRadius: 12 })}>
                  {saving ? "Saving..." : "Save Product"}
                </button>
                <button onClick={() => setEditProduct(null)} style={{ ...btn({ flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "#4a7a5a" }) }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        <div style={{ width: 220, background: CARD, borderRight: `1px solid ${BORDER}`, padding: "28px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
          <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${BORDER}` }}>
            <h1 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Find<span style={{ color: G }}>Me</span></h1>
            <p style={{ color: "#4a7a5a", fontSize: 11, margin: "3px 0 0", letterSpacing: 1 }}>GOD MODE</p>
          </div>
          <nav style={{ padding: "16px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)}
                style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, border: "none",
                  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s",
                  background: tab === i ? "rgba(29,185,84,0.12)" : "transparent",
                  color: tab === i ? G : "#4a7a5a",
                  borderLeft: tab === i ? `3px solid ${G}` : "3px solid transparent" }}>
                {t}
              </button>
            ))}
          </nav>
          <div style={{ padding: "0 10px" }}>
            <button onClick={() => { sessionStorage.removeItem("fm_admin"); sessionStorage.removeItem("fm_admin_pass"); setAuthed(false); }}
              style={{ width: "100%", padding: "9px 14px", borderRadius: 10, border: `1px solid rgba(239,68,68,0.2)`, background: "rgba(239,68,68,0.06)", color: "#f87171", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              🚪 Sign Out
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: "36px 36px", overflowY: "auto" }}>

          {/* ── OVERVIEW ── */}
          {tab === 0 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>Overview</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 32, fontSize: 13 }}>{new Date().toDateString()}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 36 }}>
                {[
                  { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: "💰", color: G },
                  { label: "Total Orders", value: orders.length, icon: "📦", color: "#3b82f6" },
                  { label: "Pending", value: orders.filter((o) => o.status === "pending").length, icon: "⏳", color: "#f59e0b" },
                  { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, icon: "✅", color: G },
                ].map((s, i) => (
                  <div key={i} style={card()}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                    <p style={{ fontWeight: 800, fontSize: 26, color: s.color, margin: "0 0 3px" }}>{s.value}</p>
                    <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recent Orders</h3>
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} onClick={() => setSelected(o)} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: 8 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 3px" }}>#{o.order_number} — {o.customer_name}</p>
                    <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{new Date(o.created_at).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 800, color: G, fontSize: 14 }}>₦{(o.total || o.subtotal || 0).toLocaleString()}</span>
                    <span style={{ background: STATUS_COLORS[o.status] || "#4a7a5a", color: "#000", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{o.status || "pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ORDERS ── */}
          {tab === 1 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 3px" }}>Orders</h2>
                  <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{filtered.length} orders</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                    style={{ ...inp({ width: 200, borderRadius: 40 }) }} />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)}
                    style={{ ...inp({ width: "auto", borderRadius: 40, cursor: "pointer" }) }}>
                    <option value="all">All</option>
                    {["pending","packed","delivered","cancelled"].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              {loading ? <p style={{ color: "#4a7a5a", textAlign: "center", padding: 40 }}>Loading...</p> :
                filtered.map((o) => (
                  <div key={o.id} onClick={() => setSelected(o)}
                    style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, cursor: "pointer", marginBottom: 8 }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.4)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateX(0)"; }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(29,185,84,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📦</div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>Order #{o.order_number}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{o.customer_name} · {o.customer_email}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#4a7a5a", fontSize: 12 }}>{new Date(o.created_at).toLocaleDateString()}</span>
                      <span style={{ fontWeight: 800, color: G, fontSize: 15 }}>₦{(o.total || o.subtotal || 0).toLocaleString()}</span>
                      <span style={{ background: STATUS_COLORS[o.status || "pending"], color: "#000", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                        {(o.status || "pending").charAt(0).toUpperCase() + (o.status || "pending").slice(1)}
                      </span>
                      <span style={{ background: "rgba(255,255,255,0.05)", color: "#4a7a5a", padding: "4px 10px", borderRadius: 20, fontSize: 11 }}>
                        {o.delivery_method === "pickup" ? "🏪 Pickup" : "🚚 Delivery"}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {tab === 2 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>Customers</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>{customers.length} unique customers</p>
              {customers.map((c, i) => {
                const co = orders.filter((o) => o.customer_email === c.customer_email);
                const spent = co.reduce((s, o) => s + (o.total || 0), 0);
                return (
                  <div key={i} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(29,185,84,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: G }}>
                        {c.customer_name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>{c.customer_name}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{c.customer_email} · {c.customer_phone}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontWeight: 800, color: G, fontSize: 15, margin: "0 0 1px" }}>₦{spent.toLocaleString()}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 11, margin: 0 }}>{co.length} order{co.length !== 1 ? "s" : ""}</p>
                      </div>
                      <button onClick={() => {
                        const phone = (c.customer_phone || "").replace(/\D/g, "");
                        const msg = "Hello " + c.customer_name + ", this is FindMe Nigeria!";
                        window.open("https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(msg), "_blank");
                      }}
                        style={{ padding: "7px 14px", background: "#25D366", border: "none", borderRadius: 40, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── CMS ── */}
          {tab === 3 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>🎨 CMS — Edit Website Content</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 28, fontSize: 13 }}>Changes go live on the website immediately after saving.</p>

              {/* HERO */}
              <div style={card()}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>🦸 Hero Section</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Main Headline", key: "hero_headline" },
                    { label: "Sub Headline", key: "hero_subheadline" },
                    { label: "Description", key: "hero_description" },
                    { label: "Hero Image Path (e.g. /eli2.png)", key: "hero_image" },
                    { label: "Banner Text (e.g. Now available in Nigeria)", key: "banner_text" },
                  ].map((f) => (
                    <div key={f.key}>
                      <p style={{ margin: "0 0 5px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input defaultValue={cmsVal(f.key)} id={`cms-${f.key}`} style={inp()} />
                        <button onClick={() => { const el = document.getElementById(`cms-${f.key}`) as HTMLInputElement; saveCms(f.key, el.value); }} style={btn()}>Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STATS */}
              <div style={card()}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>📊 Stats Bar</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "Stat 1 Number", key: "stat1_num" },
                    { label: "Stat 1 Label", key: "stat1_label" },
                    { label: "Stat 2 Number", key: "stat2_num" },
                    { label: "Stat 2 Label", key: "stat2_label" },
                    { label: "Stat 3 Number", key: "stat3_num" },
                    { label: "Stat 3 Label", key: "stat3_label" },
                    { label: "Stat 4 Number", key: "stat4_num" },
                    { label: "Stat 4 Label", key: "stat4_label" },
                  ].map((f) => (
                    <div key={f.key}>
                      <p style={{ margin: "0 0 5px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</p>
                      <div style={{ display: "flex", gap: 6 }}>
                        <input defaultValue={cmsVal(f.key)} id={`cms-${f.key}`} style={inp()} />
                        <button onClick={() => { const el = document.getElementById(`cms-${f.key}`) as HTMLInputElement; saveCms(f.key, el.value); }} style={btn({ padding: "10px 14px" })}>✓</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={card()}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>📢 CTA Section</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "CTA Headline", key: "cta_headline" },
                    { label: "CTA Subtext", key: "cta_subtext" },
                    { label: "CTA Button Text", key: "cta_button" },
                  ].map((f) => (
                    <div key={f.key}>
                      <p style={{ margin: "0 0 5px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input defaultValue={cmsVal(f.key)} id={`cms-${f.key}`} style={inp()} />
                        <button onClick={() => { const el = document.getElementById(`cms-${f.key}`) as HTMLInputElement; saveCms(f.key, el.value); }} style={btn()}>Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {tab === 4 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>🏷️ Products</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Click any product to edit name, price, image, description, features and availability.</p>
              {products.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: "48px 24px" }}>
                  <p style={{ color: "#4a7a5a", fontSize: 14 }}>No products found. Make sure you ran the SQL to create the products table and inserted your products.</p>
                </div>
              ) : (
                products.map((p) => (
                  <div key={p.id} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 8 }}
                    onClick={() => setEditProduct({ ...p })}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 12, background: "#1a3a2a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 3px" }}>{p.name}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>{p.category} · {p.coming_soon ? "Coming Soon" : `₦${Number(p.price).toLocaleString()}`}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ background: p.active ? "rgba(29,185,84,0.12)" : "rgba(255,255,255,0.05)", color: p.active ? G : "#4a7a5a", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                        {p.active ? "Active" : "Hidden"}
                      </span>
                      <span style={{ background: "rgba(255,255,255,0.06)", color: "#4a7a5a", padding: "4px 12px", borderRadius: 20, fontSize: 11 }}>Edit →</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── TESTIMONIALS ── */}
          {tab === 5 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>💬 Testimonials</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Edit customer testimonials shown on the homepage.</p>
              {testimonials.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: 40 }}>
                  <p style={{ color: "#4a7a5a" }}>No testimonials yet. Add them via Supabase or the SQL setup.</p>
                </div>
              ) : (
                testimonials.map((t) => (
                  editTestimonial?.id === t.id ? (
                    <div key={t.id} style={{ ...card(), marginBottom: 8 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input value={editTestimonial.name} onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })} placeholder="Name" style={inp()} />
                        <textarea value={editTestimonial.text} onChange={(e) => setEditTestimonial({ ...editTestimonial, text: e.target.value })} rows={3} style={{ ...inp(), resize: "vertical" as any }} />
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                          <input type="checkbox" checked={editTestimonial.active} onChange={(e) => setEditTestimonial({ ...editTestimonial, active: e.target.checked })} />
                          Show on website
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => saveTestimonial(editTestimonial)} style={btn({ flex: 1, borderRadius: 10 })}>Save</button>
                          <button onClick={() => setEditTestimonial(null)} style={{ ...btn({ flex: 1, borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#4a7a5a" }) }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={t.id} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{t.name}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0, fontStyle: "italic" }}>"{t.text}"</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ background: t.active ? "rgba(29,185,84,0.12)" : "rgba(255,255,255,0.05)", color: t.active ? G : "#4a7a5a", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                          {t.active ? "Visible" : "Hidden"}
                        </span>
                        <button onClick={() => setEditTestimonial({ ...t })} style={btn({ padding: "6px 14px", borderRadius: 8, fontSize: 12 })}>Edit</button>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
          )}

          {/* ── FAQ ── */}
          {tab === 6 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>❓ FAQ</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Edit frequently asked questions shown on the FAQ page.</p>
              {faqs.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: 40 }}>
                  <p style={{ color: "#4a7a5a" }}>No FAQs yet. Add them via Supabase SQL.</p>
                </div>
              ) : (
                faqs.map((f) => (
                  editFaq?.id === f.id ? (
                    <div key={f.id} style={{ ...card(), marginBottom: 8 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input value={editFaq.question} onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })} placeholder="Question" style={inp()} />
                        <textarea value={editFaq.answer} onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })} rows={4} style={{ ...inp(), resize: "vertical" as any }} />
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                          <input type="checkbox" checked={editFaq.active} onChange={(e) => setEditFaq({ ...editFaq, active: e.target.checked })} />
                          Show on website
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => saveFaq(editFaq)} style={btn({ flex: 1, borderRadius: 10 })}>Save</button>
                          <button onClick={() => setEditFaq(null)} style={{ ...btn({ flex: 1, borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "#4a7a5a" }) }}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={f.id} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{f.question}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{f.answer.slice(0, 100)}...</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <span style={{ background: f.active ? "rgba(29,185,84,0.12)" : "rgba(255,255,255,0.05)", color: f.active ? G : "#4a7a5a", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                          {f.active ? "Visible" : "Hidden"}
                        </span>
                        <button onClick={() => setEditFaq({ ...f })} style={btn({ padding: "6px 14px", borderRadius: 8, fontSize: 12 })}>Edit</button>
                      </div>
                    </div>
                  )
                ))
              )}
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === 7 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>⚙️ Settings</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 28, fontSize: 13 }}>Global configuration for FindMe</p>
              <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "WhatsApp Number", desc: "Receives order notifications", key: "whatsapp_number", icon: "📱", val: waNum, set: setWaNum },
                  { label: "Discount Code", desc: "Sent in confirmation emails", key: "discount_code", icon: "🎟️", val: discCode, set: setDiscCode },
                ].map((s, i) => (
                  <div key={i} style={card()}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{s.label}</p>
                        <p style={{ color: "#4a7a5a", fontSize: 12, margin: "2px 0 0" }}>{s.desc}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={s.val} onChange={(e) => s.set(e.target.value)} style={inp()} />
                      <button onClick={() => { saveCms(s.key, s.val); showToast(`${s.label} saved`); }} style={btn({ borderRadius: 10 })}>Save</button>
                    </div>
                  </div>
                ))}
                <div style={card()}>
                  <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 14px" }}>🔗 Quick Links</p>
                  {[
                    { label: "View Live Website", href: "https://findme.com.ng" },
                    { label: "Supabase Dashboard", href: "https://supabase.com/dashboard" },
                    { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
                    { label: "Resend Dashboard", href: "https://resend.com/emails" },
                  ].map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noreferrer"
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#e8f5e8", fontSize: 13, marginBottom: 6, transition: "border-color 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(29,185,84,0.3)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                      {l.label} <span style={{ color: G }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
