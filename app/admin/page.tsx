"use client";

import { useEffect, useState } from "react";

const D = "#0d1a0f";
const G = "#1db954";
const CARD = "#141f16";
const BORDER = "rgba(29,185,84,0.15)";

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b", packed: "#3b82f6", delivered: "#1db954", cancelled: "#ef4444",
};

const PaymentBadge = ({ status }: { status?: string }) => {
  const paid = status === "paid";
  return (
    <span style={{
      background: paid ? "rgba(29,185,84,0.15)" : "rgba(239,68,68,0.12)",
      color: paid ? "#1db954" : "#f87171",
      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {paid ? "✅ Paid" : "⏳ Unpaid"}
    </span>
  );
};

type Order = {
  id: string; order_number: number; customer_name: string; customer_email: string;
  customer_phone: string; delivery_address: string; delivery_method: string;
  items: any[]; subtotal: number; total: number; status: string; created_at: string;
  payment_status?: string; paid_at?: string; pickup_code?: string; ready_notified_at?: string;
};

type CMSField = { key: string; value: string; type: string };
type Product  = { id: number; name: string; price: number; coming_soon: boolean; image: string; short_desc: string; description: string; features: string[]; category: string; active: boolean };
type Testimonial = { id: number; name: string; text: string; active: boolean };
type FAQ = { id: number; question: string; answer: string; active: boolean };
type Coupon = { id: number; code: string; discount: number; active: boolean; used_count: number; created_at: string };

const tabs = ["📊 Overview","📦 Orders","👥 Customers","🎨 CMS","🏷️ Products","💬 Testimonials","❓ FAQ","🎟️ Coupons","🖨️ Print & Export","⚙️ Settings"];

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
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: 10 });
  const [showNewCoupon, setShowNewCoupon] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastCoupon, setBroadcastCoupon] = useState<Coupon | null>(null);
  const [broadcastIdx, setBroadcastIdx] = useState(0);
  const [broadcastDone, setBroadcastDone] = useState(false);
  const [printCount, setPrintCount] = useState(100);
  const [printLoading, setPrintLoading] = useState(false);
  const [printDone, setPrintDone] = useState<{ count: number; csv: string } | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const generateAndExport = async () => {
    if (printCount < 1 || printCount > 300) { showToast("Enter a number between 1 and 300"); return; }
    setPrintLoading(true); setPrintDone(null);
    try {
      showToast("Generating " + printCount + " codes...");
      const res = await fetch("/api/admin", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate_qr_batch", password: sessionStorage.getItem("fm_admin_pass") || "findme2026", count: printCount }),
      });
      const data = await res.json();
      if (!data.codes?.length) { showToast("Failed: " + (data.error || "Unknown")); setPrintLoading(false); return; }
      const allCodes = data.codes.map((code: string) => {
        const scanUrl = "https://app.findme.com.ng/scan/" + code;
        return { code, scan_url: scanUrl, qr_api_url: "https://api.qrserver.com/v1/create-qr-code/?size=600x600&ecc=H&data=" + encodeURIComponent(scanUrl) };
      });
      const csv = ["code,scan_url,qr_preview_url", ...allCodes.map((c: any) => c.code + "," + c.scan_url + "," + c.qr_api_url)].join("\n");
      setPrintDone({ count: allCodes.length, csv });
      showToast(allCodes.length + " codes generated!");
    } catch (err: any) { showToast("Error: " + err.message); }
    setPrintLoading(false);
  };

  const downloadCSV = () => {
    if (!printDone) return;
    const blob = new Blob([printDone.csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "findme-qr-codes-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click(); URL.revokeObjectURL(url);
  };

  const saveCoupon = async (c: Coupon) => {
    await api("save_coupon", { coupon: c });
    setCoupons((prev) => prev.map((x) => x.id === c.id ? c : x));
    setEditCoupon(null); showToast("Coupon saved!");
  };

  const createCoupon = async () => {
    if (!newCoupon.code.trim()) return;
    const res = await api("create_coupon", { coupon: { code: newCoupon.code.trim().toUpperCase(), discount: newCoupon.discount } });
    if (res.coupon) { setCoupons((prev) => [res.coupon, ...prev]); setNewCoupon({ code: "", discount: 10 }); setShowNewCoupon(false); showToast("Coupon created!"); }
  };

  const toggleCoupon = async (c: Coupon) => {
    const updated = { ...c, active: !c.active };
    await api("save_coupon", { coupon: updated });
    setCoupons((prev) => prev.map((x) => x.id === c.id ? updated : x));
    showToast(updated.active ? "Coupon enabled" : "Coupon disabled");
  };

  const deleteCoupon = async (id: number) => {
    await api("delete_coupon", { id });
    setCoupons((prev) => prev.filter((x) => x.id !== id));
    showToast("Coupon deleted");
  };

  const login = () => {
    if (pass === (process.env.NEXT_PUBLIC_ADMIN_PASS || "findme2026")) {
      setAuthed(true);
      sessionStorage.setItem("fm_admin", "1");
      sessionStorage.setItem("fm_admin_pass", pass);
    } else { setPassErr(true); setTimeout(() => setPassErr(false), 1200); }
  };

  useEffect(() => {
    if (sessionStorage.getItem("fm_admin")) {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    api("get_orders").then((d) => { setOrders(d.orders || []); setLoading(false); });
    api("get_cms").then((d) => setCms(d.cms || []));
    api("get_products").then((d) => setProducts(d.products || []));
    api("get_testimonials").then((d) => setTestimonials(d.testimonials || []));
    api("get_faqs").then((d) => setFaqs(d.faqs || []));
    api("get_coupons").then((d) => setCoupons(d.coupons || []));
  }, [authed]);

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await api("update_status", { id, status });
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);

    if (status === "packed") {
      try {
        const res = await fetch("/api/order-ready", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: id, password: sessionStorage.getItem("fm_admin_pass") || "findme2026" }),
        });
        const data = await res.json();
        if (data.success) {
          showToast("Status updated — Ready email sent! 📧");
        } else {
          showToast("Status updated, but email failed: " + (data.error || "unknown"));
        }
      } catch {
        showToast("Status updated, but email failed to send");
      }
    } else {
      showToast("Status updated");
    }
    setSaving(false);
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
    if (filter === "all") return ms;
    if (filter === "paid") return ms && o.payment_status === "paid";
    if (filter === "unpaid") return ms && o.payment_status !== "paid";
    return ms && o.status === filter;
  });
  const cmsVal = (key: string) => cms.find((c) => c.key === key)?.value || "";

  const inp = (extra = {}): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)",
    border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8",
    fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box", ...extra,
  });
  const btn = (extra = {}): React.CSSProperties => ({
    padding: "10px 20px", background: G, color: "#000", border: "none",
    borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", ...extra,
  });
  const card = (): React.CSSProperties => ({
    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 24, marginBottom: 16,
  });

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

      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: G, color: "#000", padding: "12px 20px", borderRadius: 40, fontWeight: 700, fontSize: 14 }}>✓ {toast}</div>}

      {/* ORDER MODAL */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: 32, maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22 }}>Order #{selected.order_number}</h2>
                  <PaymentBadge status={selected.payment_status} />
                </div>
                <p style={{ margin: 0, color: "#4a7a5a", fontSize: 13 }}>{new Date(selected.created_at).toLocaleString()}</p>
                {selected.paid_at && (
                  <p style={{ margin: "2px 0 0", color: "#1db954", fontSize: 12 }}>Paid on {new Date(selected.paid_at).toLocaleString()}</p>
                )}
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
              {selected.delivery_method === "pickup" && selected.pickup_code && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#4a7a5a", fontSize: 12 }}>Pickup Code:</span>
                  <span style={{ background: "rgba(29,185,84,0.15)", color: G, padding: "3px 10px", borderRadius: 8, fontWeight: 800, fontSize: 14, letterSpacing: 2 }}>{selected.pickup_code}</span>
                </div>
              )}
              {selected.ready_notified_at && (
                <p style={{ margin: "8px 0 0", color: G, fontSize: 12 }}>✅ Ready email sent {new Date(selected.ready_notified_at).toLocaleString()}</p>
              )}
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
            <button onClick={() => {
                let phone = (selected.customer_phone || "").replace(/\D/g, "");
                if (phone.startsWith("0")) phone = "234" + phone.slice(1);
                if (!phone.startsWith("234")) phone = "234" + phone;
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
                <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} style={{ ...inp(), cursor: "pointer" }}>
                  {["sticker","key","bundle","pet"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#e8f5e8" }}>
                  <input type="checkbox" checked={editProduct.active} onChange={(e) => setEditProduct({ ...editProduct, active: e.target.checked })} />
                  Active
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#e8f5e8" }}>
                  <input type="checkbox" checked={editProduct.coming_soon} onChange={(e) => setEditProduct({ ...editProduct, coming_soon: e.target.checked })} />
                  Coming Soon
                </label>
              </div>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 12, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Features (one per line)</p>
                <textarea value={(editProduct.features || []).join("\n")} onChange={(e) => setEditProduct({ ...editProduct, features: e.target.value.split("\n") })} rows={5} style={{ ...inp(), resize: "vertical" as any }} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => saveProduct(editProduct)} disabled={saving} style={btn({ flex: 1, padding: "12px", borderRadius: 12 })}>{saving ? "Saving..." : "Save Product"}</button>
                <button onClick={() => setEditProduct(null)} style={{ ...btn({ flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.06)", color: "#4a7a5a" }) }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <div style={{ width: 220, background: CARD, borderRight: `1px solid ${BORDER}`, padding: "28px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0, overflowY: "auto" }}>
          <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${BORDER}` }}>
            <h1 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Find<span style={{ color: G }}>Me</span></h1>
            <p style={{ color: "#4a7a5a", fontSize: 11, margin: "3px 0 0", letterSpacing: 1 }}>GOD MODE</p>
          </div>
          <nav style={{ padding: "16px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)}
                style={{ width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, border: "none",
                  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer",
                  background: tab === i ? "rgba(29,185,84,0.12)" : "transparent",
                  color: tab === i ? G : "#4a7a5a",
                  borderLeft: tab === i ? `3px solid ${G}` : "3px solid transparent" }}>
                {t}
              </button>
            ))}
          </nav>
          <div style={{ padding: "0 10px" }}>
            <button onClick={() => { sessionStorage.removeItem("fm_admin"); sessionStorage.removeItem("fm_admin_pass"); setAuthed(false); }}
              style={{ width: "100%", padding: "9px 14px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)", color: "#f87171", fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
              🚪 Sign Out
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, padding: "36px 36px", overflowY: "auto" }}>

          {/* OVERVIEW */}
          {tab === 0 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>Overview</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 32, fontSize: 13 }}>{new Date().toDateString()}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 36 }}>
                {[
                  { label: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: "💰", color: G },
                  { label: "Total Orders", value: orders.length, icon: "📦", color: "#3b82f6" },
                  { label: "Unpaid Orders", value: orders.filter((o) => o.payment_status !== "paid").length, icon: "⏳", color: "#f87171" },
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
                    <PaymentBadge status={o.payment_status} />
                    <span style={{ background: STATUS_COLORS[o.status] || "#4a7a5a", color: "#000", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{o.status || "pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS */}
          {tab === 1 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 3px" }}>Orders</h2>
                  <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{filtered.length} orders</p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inp({ width: 200, borderRadius: 40 }) }} />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ ...inp({ width: "auto", borderRadius: 40, cursor: "pointer" }) }}>
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
                      <PaymentBadge status={o.payment_status} />
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

          {/* CUSTOMERS */}
          {tab === 2 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 4px" }}>Customers</h2>
                  <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{customers.length} unique customers</p>
                </div>
                <button onClick={() => { setShowBroadcast(true); setBroadcastIdx(0); setBroadcastDone(false); setBroadcastCoupon(null); }}
                  style={{ padding: "10px 20px", background: G, color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  📣 Broadcast Coupon
                </button>
              </div>

              {showBroadcast && (
                <div style={{ background: CARD, border: `2px solid ${G}`, borderRadius: 20, padding: 28, marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 17, margin: "0 0 4px", color: "#e8f5e8" }}>📣 Broadcast Coupon</p>
                      <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>Send to all {customers.length} customers via WhatsApp one by one.</p>
                    </div>
                    <button onClick={() => setShowBroadcast(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#4a7a5a", fontSize: 16, cursor: "pointer" }}>✕</button>
                  </div>
                  {!broadcastDone && (
                    <div style={{ marginBottom: 20 }}>
                      <p style={{ fontWeight: 600, fontSize: 12, color: "#4a7a5a", textTransform: "uppercase" as const, letterSpacing: 1, margin: "0 0 10px" }}>Select Coupon</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {coupons.filter((cp) => cp.active).map((cp) => (
                          <button key={cp.id} onClick={() => setBroadcastCoupon(cp)}
                            style={{ padding: "10px 18px", borderRadius: 40, border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                              background: broadcastCoupon?.id === cp.id ? G : "rgba(29,185,84,0.1)", color: broadcastCoupon?.id === cp.id ? "#000" : G }}>
                            {cp.code} — {cp.discount}% off
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {broadcastCoupon && !broadcastDone && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <p style={{ fontSize: 13, color: "#4a7a5a", margin: 0 }}>Progress: {broadcastIdx} / {customers.length}</p>
                        <p style={{ fontSize: 13, color: G, fontWeight: 700, margin: 0 }}>{Math.round(broadcastIdx / customers.length * 100)}%</p>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 40, height: 6, overflow: "hidden" }}>
                        <div style={{ background: G, height: "100%", width: `${(broadcastIdx / customers.length) * 100}%`, borderRadius: 40 }} />
                      </div>
                    </div>
                  )}
                  {broadcastDone && (
                    <div style={{ background: "rgba(29,185,84,0.1)", border: `1px solid ${G}`, borderRadius: 14, padding: "14px 18px", marginBottom: 16 }}>
                      <p style={{ margin: 0, color: G, fontWeight: 700, fontSize: 15 }}>✅ Broadcast complete! Sent to {customers.length} customers.</p>
                    </div>
                  )}
                  {broadcastCoupon && !broadcastDone && (
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        onClick={() => {
                          const customer = customers[broadcastIdx];
                          if (!customer) { setBroadcastDone(true); return; }
                          let phone = (customer.customer_phone || "").replace(/\D/g, "");
                          if (phone.startsWith("0")) phone = "234" + phone.slice(1);
                          if (!phone.startsWith("234")) phone = "234" + phone;
                          const msg = "Hello " + customer.customer_name + "! Here's a special discount just for you:\n\n*" + broadcastCoupon.code + "* — " + broadcastCoupon.discount + "% off your next FindMe order\n\nShop now: https://findme.com.ng/shop";
                          window.open("https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(msg), "_blank");
                          const next = broadcastIdx + 1;
                          if (next >= customers.length) { setBroadcastDone(true); } else { setBroadcastIdx(next); }
                        }}
                        style={{ flex: 1, padding: "12px 20px", background: "#25D366", color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                        {broadcastIdx === 0 ? "▶ Start Broadcast" : `💬 Send to ${customers[broadcastIdx]?.customer_name} (${broadcastIdx + 1}/${customers.length})`}
                      </button>
                      {broadcastIdx > 0 && (
                        <button onClick={() => { setBroadcastIdx(0); setBroadcastDone(false); }}
                          style={{ padding: "12px 18px", background: "rgba(255,255,255,0.06)", color: "#4a7a5a", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                          Reset
                        </button>
                      )}
                    </div>
                  )}
                  {broadcastDone && (
                    <button onClick={() => { setShowBroadcast(false); setBroadcastIdx(0); setBroadcastDone(false); setBroadcastCoupon(null); }}
                      style={{ padding: "12px 24px", background: G, color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                      Done ✓
                    </button>
                  )}
                </div>
              )}

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
                      <div style={{ position: "relative" }}>
                        <button onClick={() => { const el = document.getElementById("cm-" + i); if (el) el.style.display = el.style.display === "none" ? "block" : "none"; }}
                          style={{ padding: "7px 14px", background: "rgba(29,185,84,0.12)", border: `1px solid ${BORDER}`, borderRadius: 40, color: G, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                          🎟️ Send Coupon
                        </button>
                        <div id={"cm-" + i} style={{ display: "none", position: "absolute", top: "calc(100% + 8px)", right: 0, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 10, zIndex: 100, minWidth: 210, boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
                          <p style={{ margin: "0 0 8px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1, padding: "0 4px" }}>Pick a coupon</p>
                          {coupons.filter((cp) => cp.active).map((cp) => (
                            <button key={cp.id}
                              onClick={() => {
                                let phone = (c.customer_phone || "").replace(/\D/g, "");
                                if (phone.startsWith("0")) phone = "234" + phone.slice(1);
                                if (!phone.startsWith("234")) phone = "234" + phone;
                                const msg = "Hello " + c.customer_name + "! Here's a special discount:\n\n*" + cp.code + "* — " + cp.discount + "% off\n\nhttps://findme.com.ng/shop";
                                window.open("https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(msg), "_blank");
                                const el = document.getElementById("cm-" + i); if (el) el.style.display = "none";
                              }}
                              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "9px 12px", background: "transparent", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "Syne, sans-serif", marginBottom: 4 }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(29,185,84,0.08)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                              <span style={{ fontWeight: 700, color: G, fontSize: 13, letterSpacing: 1 }}>{cp.code}</span>
                              <span style={{ color: "#4a7a5a", fontSize: 12 }}>{cp.discount}% off</span>
                            </button>
                          ))}
                          {coupons.filter((cp) => cp.active).length === 0 && <p style={{ color: "#4a7a5a", fontSize: 12, padding: "4px 8px", margin: 0 }}>No active coupons.</p>}
                        </div>
                      </div>
                      <button onClick={() => {
                          let phone = (c.customer_phone || "").replace(/\D/g, "");
                          if (phone.startsWith("0")) phone = "234" + phone.slice(1);
                          if (!phone.startsWith("234")) phone = "234" + phone;
                          window.open("https://api.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent("Hello " + c.customer_name + ", this is FindMe Nigeria!"), "_blank");
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

          {/* CMS */}
          {tab === 3 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>🎨 CMS</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 28, fontSize: 13 }}>Changes go live immediately after saving.</p>
              <div style={card()}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>🦸 Hero Section</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Main Headline", key: "hero_headline" },
                    { label: "Sub Headline", key: "hero_subheadline" },
                    { label: "Description", key: "hero_description" },
                    { label: "Hero Image Path", key: "hero_image" },
                    { label: "Banner Text", key: "banner_text" },
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
              <div style={card()}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>📍 Pickup Location</p>
                <p style={{ color: "#4a7a5a", fontSize: 12, margin: "0 0 12px" }}>Shown in the "Order Ready" email for self-pickup orders.</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input defaultValue={cmsVal("pickup_location")} id="cms-pickup_location" style={inp()} placeholder="e.g. FindMe Office, 12 Example Street, Lagos" />
                  <button onClick={() => { const el = document.getElementById("cms-pickup_location") as HTMLInputElement; saveCms("pickup_location", el.value); }} style={btn()}>Save</button>
                </div>
              </div>
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

          {/* PRODUCTS */}
          {tab === 4 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>🏷️ Products</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Click any product to edit.</p>
              {products.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: "48px 24px" }}>
                  <p style={{ color: "#4a7a5a", fontSize: 14 }}>No products found. Run the SQL to insert your products.</p>
                </div>
              ) : products.map((p) => (
                <div key={p.id} style={{ ...card(), display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 8 }}
                  onClick={() => setEditProduct({ ...p })}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: "#1a3a2a", overflow: "hidden", flexShrink: 0 }}>
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
              ))}
            </div>
          )}

          {/* TESTIMONIALS */}
          {tab === 5 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>💬 Testimonials</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Edit customer testimonials on the homepage.</p>
              {testimonials.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: 40 }}><p style={{ color: "#4a7a5a" }}>No testimonials yet.</p></div>
              ) : testimonials.map((t) => (
                editTestimonial?.id === t.id ? (
                  <div key={t.id} style={{ ...card(), marginBottom: 8 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <input value={editTestimonial.name} onChange={(e) => setEditTestimonial({ ...editTestimonial, name: e.target.value })} placeholder="Name" style={inp()} />
                      <textarea value={editTestimonial.text} onChange={(e) => setEditTestimonial({ ...editTestimonial, text: e.target.value })} rows={3} style={{ ...inp(), resize: "vertical" as any }} />
                      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                        <input type="checkbox" checked={editTestimonial.active} onChange={(e) => setEditTestimonial({ ...editTestimonial, active: e.target.checked })} /> Show on website
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
              ))}
            </div>
          )}

          {/* FAQ */}
          {tab === 6 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>❓ FAQ</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 24, fontSize: 13 }}>Edit FAQs shown on the FAQ page.</p>
              {faqs.length === 0 ? (
                <div style={{ ...card(), textAlign: "center", padding: 40 }}><p style={{ color: "#4a7a5a" }}>No FAQs yet.</p></div>
              ) : faqs.map((f) => (
                editFaq?.id === f.id ? (
                  <div key={f.id} style={{ ...card(), marginBottom: 8 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <input value={editFaq.question} onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })} placeholder="Question" style={inp()} />
                      <textarea value={editFaq.answer} onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })} rows={4} style={{ ...inp(), resize: "vertical" as any }} />
                      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                        <input type="checkbox" checked={editFaq.active} onChange={(e) => setEditFaq({ ...editFaq, active: e.target.checked })} /> Show on website
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
              ))}
            </div>
          )}

          {/* COUPONS */}
          {tab === 7 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 4px" }}>🎟️ Coupons</h2>
                  <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>{coupons.length} codes · {coupons.reduce((s, c) => s + (c.used_count || 0), 0)} total uses</p>
                </div>
                <button onClick={() => setShowNewCoupon(!showNewCoupon)}
                  style={{ padding: "10px 20px", background: G, color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  + New Coupon
                </button>
              </div>
              {showNewCoupon && (
                <div style={{ background: CARD, border: `1px solid ${G}`, borderRadius: 18, padding: 24, marginBottom: 20 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 16px", color: G }}>Create New Coupon</p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div style={{ flex: 2, minWidth: 160 }}>
                      <p style={{ margin: "0 0 6px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Code</p>
                      <input placeholder="e.g. SUMMER25" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                        style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box" as const, letterSpacing: 1 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 120 }}>
                      <p style={{ margin: "0 0 6px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Discount %</p>
                      <input type="number" min={1} max={100} value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                        style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box" as const }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={createCoupon} style={{ padding: "11px 20px", background: G, color: "#000", border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Create</button>
                      <button onClick={() => setShowNewCoupon(false)} style={{ padding: "11px 16px", background: "rgba(255,255,255,0.06)", color: "#4a7a5a", border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
              {coupons.length === 0 ? (
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "48px 24px", textAlign: "center" }}>
                  <p style={{ color: "#4a7a5a" }}>No coupons yet.</p>
                </div>
              ) : coupons.map((c) => (
                editCoupon?.id === c.id ? (
                  <div key={c.id} style={{ background: CARD, border: `1.5px solid ${G}`, borderRadius: 18, padding: 20, marginBottom: 10 }}>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                      <div style={{ flex: 2, minWidth: 160 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Code</p>
                        <input value={editCoupon.code} onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value.toUpperCase() })}
                          style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box" as const, letterSpacing: 1 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Discount %</p>
                        <input type="number" min={1} max={100} value={editCoupon.discount} onChange={(e) => setEditCoupon({ ...editCoupon, discount: Number(e.target.value) })}
                          style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 10, color: "#e8f5e8", fontSize: 14, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box" as const }} />
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => saveCoupon(editCoupon)} style={{ padding: "10px 18px", background: G, color: "#000", border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditCoupon(null)} style={{ padding: "10px 14px", background: "rgba(255,255,255,0.06)", color: "#4a7a5a", border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={c.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "16px 20px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ background: "rgba(29,185,84,0.1)", border: `1px dashed ${G}`, borderRadius: 10, padding: "8px 16px" }}>
                        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: G, margin: 0, letterSpacing: 2 }}>{c.code}</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 22, color: "#e8f5e8", margin: "0 0 2px" }}>{c.discount}% off</p>
                        <p style={{ color: "#4a7a5a", fontSize: 12, margin: 0 }}>Used {c.used_count || 0} time{c.used_count !== 1 ? "s" : ""} · {new Date(c.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => toggleCoupon(c)}
                        style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
                          background: c.active ? "rgba(29,185,84,0.12)" : "rgba(255,255,255,0.06)", color: c.active ? G : "#4a7a5a" }}>
                        {c.active ? "● Active" : "○ Disabled"}
                      </button>
                      <button onClick={() => setEditCoupon({ ...c })} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.06)", color: "#e8f5e8", border: "none", borderRadius: 20, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Edit</button>
                      <button onClick={() => deleteCoupon(c.id)} style={{ padding: "6px 14px", background: "rgba(239,68,68,0.08)", color: "#f87171", border: "none", borderRadius: 20, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Delete</button>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* PRINT & EXPORT */}
          {tab === 8 && (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 26, margin: "0 0 6px" }}>🖨️ Print & Export</h2>
              <p style={{ color: "#4a7a5a", marginBottom: 28, fontSize: 13 }}>Generate QR codes and export a CSV for your printing company.</p>
              <div style={{ background: "rgba(29,185,84,0.06)", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: G, margin: "0 0 12px" }}>📋 How to use with your printer</p>
                {["1. Enter how many QR codes you need and click Generate","2. Download the CSV file","3. Send the CSV + your tag design to the printing company","4. They use Variable Data Printing (VDP) to print each unique QR","5. Each QR links to https://app.findme.com.ng/scan/[code]"].map((t, i) => (
                  <p key={i} style={{ margin: "0 0 6px", fontSize: 13, color: "#4a7a5a" }}>{t}</p>
                ))}
              </div>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 18, padding: 28, marginBottom: 20 }}>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#e8f5e8", margin: "0 0 20px" }}>Generate New QR Codes</p>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "#4a7a5a", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Number of codes (max 300)</p>
                    <input type="number" min={1} max={300} value={printCount} onChange={(e) => setPrintCount(Number(e.target.value))}
                      style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${BORDER}`, borderRadius: 12, color: "#e8f5e8", fontSize: 16, outline: "none", fontFamily: "Syne, sans-serif", boxSizing: "border-box" as const, fontWeight: 700 }} />
                  </div>
                  <button onClick={generateAndExport} disabled={printLoading}
                    style={{ padding: "12px 28px", background: printLoading ? "#4a7a5a" : G, color: "#000", border: "none", borderRadius: 12, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: printLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap" as const }}>
                    {printLoading ? "Generating..." : "⚡ Generate & Export"}
                  </button>
                </div>
                {printLoading && <p style={{ marginTop: 12, fontSize: 13, color: G }}>⏳ Generating... please wait</p>}
              </div>
              {printDone && (
                <div style={{ background: CARD, border: `2px solid ${G}`, borderRadius: 18, padding: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(29,185,84,0.12)", border: `2px solid ${G}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✅</div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 18, color: "#e8f5e8", margin: "0 0 4px" }}>{printDone.count} QR codes generated!</p>
                      <p style={{ color: "#4a7a5a", fontSize: 13, margin: 0 }}>Ready to download and send to your printer.</p>
                    </div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontFamily: "monospace", fontSize: 12, color: "#9dbfa0", overflowX: "auto" as const }}>
                    <p style={{ margin: "0 0 4px", color: G, fontWeight: 700 }}>CSV Preview:</p>
                    {printDone.csv.split("\n").slice(0, 4).map((row, i) => <p key={i} style={{ margin: "0 0 2px" }}>{row}</p>)}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button onClick={downloadCSV} style={{ flex: 1, padding: "14px 24px", background: G, color: "#000", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>⬇️ Download CSV</button>
                    <button onClick={() => { setPrintDone(null); setPrintCount(100); }} style={{ padding: "14px 20px", background: "rgba(255,255,255,0.06)", color: "#4a7a5a", border: "none", borderRadius: 40, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Generate More</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {tab === 9 && (
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
                      <button onClick={() => { saveCms(s.key, s.val); showToast(s.label + " saved"); }} style={btn({ borderRadius: 10 })}>Save</button>
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
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", color: "#e8f5e8", fontSize: 13, marginBottom: 6 }}
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
