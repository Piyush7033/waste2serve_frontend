import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../styles/myDonations.css";
import bgImage from "../../utils/food donation project.webp";
import {
  UtensilsCrossed,
  MapPin,
  Package,
  Clock,
  Pencil,
  Trash2,
  X,
  Save,
  AlertTriangle,
  MailOpen,
  Search,
  ClipboardList,
  CheckCircle2,
  Timer,
  CircleDot,
  RefreshCw,
} from "lucide-react";

// =========================================
// STATUS CONFIG
// =========================================

const STATUS_META = {
  AVAILABLE: { label: "Available", cls: "md-badge-available", bar: "md-bar-available" },
  REQUESTED: { label: "Requested", cls: "md-badge-requested", bar: "md-bar-requested" },
  ACCEPTED:  { label: "Accepted",  cls: "md-badge-accepted",  bar: "md-bar-accepted"  },
};

const getStatus = (s) =>
  STATUS_META[s] ?? { label: s ?? "Unknown", cls: "md-badge-unknown", bar: "" };

const EMPTY_FORM = { title: "", description: "", quantity: "", location: "", expiryTime: "" };

// =========================================
// COMPONENT
// =========================================

const MyDonations = () => {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [filter, setFilter]       = useState("ALL");
  const [editId, setEditId]       = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(null);

  const getToken = () => localStorage.getItem("token");

  // =========================================
  // FETCH
  // =========================================

  useEffect(() => { fetchDonations(); }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/food/my", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setDonations(res.data || []);
    } catch {
      setError("Failed to load your donations.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DELETE
  // =========================================

  const deleteDonation = async (id) => {
    if (!window.confirm("Delete this donation?")) return;
    try {
      setDeleting(id);
      await API.delete(`/food/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setDonations((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert(err.response?.data || "Failed to delete.");
    } finally {
      setDeleting(null);
    }
  };

  // =========================================
  // EDIT
  // =========================================

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      title:       item.title       || "",
      description: item.description || "",
      quantity:    item.quantity    || "",
      location:    item.location    || "",
      expiryTime:  item.expiryTime
        ? new Date(item.expiryTime).toISOString().slice(0, 16)
        : "",
    });
  };

  const closeEdit = () => { setEditId(null); setForm(EMPTY_FORM); };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveUpdate = async () => {
    try {
      setSaving(true);
      const res = await API.put(`/food/${editId}`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setDonations((prev) =>
        prev.map((d) => (d.id === editId ? { ...d, ...res.data } : d))
      );
      closeEdit();
    } catch (err) {
      alert(err.response?.data || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // COUNTS + FILTER
  // =========================================

  const counts = {
    ALL:       donations.length,
    AVAILABLE: donations.filter((d) => d.status === "AVAILABLE").length,
    REQUESTED: donations.filter((d) => d.status === "REQUESTED").length,
    ACCEPTED:  donations.filter((d) => d.status === "ACCEPTED").length,
  };

  const filtered =
    filter === "ALL" ? donations : donations.filter((d) => d.status === filter);

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="md-page">

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div className="md-hero">
        <div className="md-hero-bg" style={{ backgroundImage: `url(${bgImage})` }} />

        <div className="md-hero-content">
          <div className="md-hero-text">
            <span className="md-eyebrow">Manage Your Contributions</span>
            <h1 className="md-hero-title">My Donations</h1>
            <p className="md-hero-sub">
              View, edit and manage all the food you've listed for donation.
            </p>
          </div>
          <div className="md-hero-icon-wrap">
            <UtensilsCrossed size={64} strokeWidth={1.2} />
          </div>
        </div>

        {/* STAT STRIP */}
        {!loading && !error && (
          <div className="md-stats">
            {[
              { label: "Total",     count: counts.ALL,       Icon: ClipboardList,  cls: "mds-total"     },
              { label: "Available", count: counts.AVAILABLE, Icon: CircleDot,      cls: "mds-available" },
              { label: "Requested", count: counts.REQUESTED, Icon: Timer,          cls: "mds-requested" },
              { label: "Accepted",  count: counts.ACCEPTED,  Icon: CheckCircle2,   cls: "mds-accepted"  },
            ].map(({ label, count, Icon, cls }) => (
              <div className={`md-stat ${cls}`} key={label}>
                <Icon size={22} strokeWidth={1.8} className="md-stat-icon" />
                <span className="md-stat-count">{count}</span>
                <span className="md-stat-label">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <div className="md-body">

        {/* LOADING */}
        {loading && (
          <div className="md-state">
            <div className="md-spinner-wrap">
              <RefreshCw size={36} className="md-spin-icon" />
            </div>
            <p className="md-state-title">Loading your donations...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="md-state md-state-error">
            <div className="md-state-icon-wrap error-wrap">
              <AlertTriangle size={32} strokeWidth={1.8} />
            </div>
            <p className="md-state-title">{error}</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && donations.length === 0 && (
          <div className="md-state">
            <div className="md-state-icon-wrap">
              <MailOpen size={36} strokeWidth={1.5} />
            </div>
            <p className="md-state-title">No donations yet</p>
            <p className="md-state-hint">Add food donations to see them listed here.</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && donations.length > 0 && (
          <>
            {/* FILTER TABS */}
            <div className="md-tabs-row">
              <div className="md-tabs">
                {[
                  { key: "ALL",       label: "All",       Icon: ClipboardList },
                  { key: "AVAILABLE", label: "Available", Icon: CircleDot     },
                  { key: "REQUESTED", label: "Requested", Icon: Timer         },
                  { key: "ACCEPTED",  label: "Accepted",  Icon: CheckCircle2  },
                ].map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    className={`md-tab ${filter === key ? "md-tab-active" : ""}`}
                    onClick={() => setFilter(key)}
                  >
                    <Icon size={14} strokeWidth={2} />
                    <span>{label}</span>
                    <span className="md-tab-count">{counts[key]}</span>
                  </button>
                ))}
              </div>
              <span className="md-showing">
                Showing <strong>{filtered.length}</strong> item{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* NO FILTER MATCH */}
            {filtered.length === 0 && (
              <div className="md-state">
                <div className="md-state-icon-wrap">
                  <Search size={32} strokeWidth={1.5} />
                </div>
                <p className="md-state-title">No {filter.toLowerCase()} donations found.</p>
              </div>
            )}

            {/* GRID */}
            <div className="md-grid">
              {filtered.map((item, i) => {
                const meta      = getStatus(item.status);
                const isExpired = item.expiryTime && new Date(item.expiryTime) < new Date();

                return (
                  <div
                    className="md-card"
                    key={item.id}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* CARD HEADER */}
                    <div className="md-card-header">
                      <div className="md-card-icon-wrap">
                        <UtensilsCrossed size={22} strokeWidth={1.8} />
                      </div>
                      <div className="md-card-title-block">
                        <h3 className="md-card-title">{item.title || "Untitled"}</h3>
                        <span className="md-card-id">ID #{item.id}</span>
                      </div>
                      <span className={`md-badge ${meta.cls}`}>
                        <span className="md-badge-dot" />
                        {meta.label}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    {item.description && (
                      <p className="md-card-desc">{item.description}</p>
                    )}

                    <hr className="md-card-divider" />

                    {/* INFO GRID */}
                    <div className="md-info-grid">

                      <div className="md-info-cell">
                        <MapPin size={16} strokeWidth={2} className="md-info-icon" />
                        <div>
                          <span className="md-info-label">Location</span>
                          <span className="md-info-val">{item.location || "N/A"}</span>
                        </div>
                      </div>

                      <div className="md-info-cell">
                        <Package size={16} strokeWidth={2} className="md-info-icon" />
                        <div>
                          <span className="md-info-label">Quantity</span>
                          <span className="md-info-val">{item.quantity || "N/A"}</span>
                        </div>
                      </div>

                      <div className="md-info-cell md-info-full">
                        <Clock size={16} strokeWidth={2} className={`md-info-icon ${isExpired ? "icon-expired" : ""}`} />
                        <div>
                          <span className="md-info-label">Expiry</span>
                          <span className={`md-info-val ${isExpired ? "md-expired" : ""}`}>
                            {item.expiryTime
                              ? new Date(item.expiryTime).toLocaleString("en-US", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "N/A"}
                            {isExpired && <span className="md-expired-tag"> · Expired</span>}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* STATUS BAR */}
                    <div className={`md-status-bar ${meta.bar}`} />

                    {/* ACTIONS */}
                    <div className="md-actions">
                      <button className="md-btn md-btn-edit" onClick={() => openEdit(item)}>
                        <Pencil size={15} strokeWidth={2} /> Edit
                      </button>
                      <button
                        className="md-btn md-btn-delete"
                        onClick={() => deleteDonation(item.id)}
                        disabled={deleting === item.id}
                      >
                        <Trash2 size={15} strokeWidth={2} />
                        {deleting === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ══════════════════════════════
          EDIT MODAL
      ══════════════════════════════ */}
      {editId && (
        <div className="md-overlay" onClick={closeEdit}>
          <div className="md-modal" onClick={(e) => e.stopPropagation()}>

            <div className="md-modal-header">
              <div className="md-modal-title">
                <Pencil size={18} strokeWidth={2} />
                <h2>Edit Donation</h2>
              </div>
              <button className="md-modal-close" onClick={closeEdit}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="md-modal-body">

              <div className="md-field">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Food title" />
              </div>

              <div className="md-field">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the food..."
                  rows={3}
                />
              </div>

              <div className="md-field-row">
                <div className="md-field">
                  <label>Quantity</label>
                  <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 5 kg" />
                </div>
                <div className="md-field">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="Pickup location" />
                </div>
              </div>

              <div className="md-field">
                <label>Expiry Date & Time</label>
                <input
                  type="datetime-local"
                  name="expiryTime"
                  value={form.expiryTime}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="md-modal-footer">
              <button className="md-btn md-btn-cancel" onClick={closeEdit}>
                <X size={15} strokeWidth={2} /> Cancel
              </button>
              <button className="md-btn md-btn-save" onClick={saveUpdate} disabled={saving}>
                <Save size={15} strokeWidth={2} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyDonations;
