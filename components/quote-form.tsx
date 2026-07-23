"use client";

import { FormEvent, useState } from "react";
import styles from "./quote-form.module.css";

const choices = {
  property: ["2 BHK apartment", "3 BHK apartment", "4 BHK / Villa", "Single room", "Renovation"],
  budget: ["Under ₹5 lakh", "₹5–10 lakh", "₹10–20 lakh", "Above ₹20 lakh", "Not sure yet"],
  timeline: ["Immediately", "Within 1–3 months", "Within 3–6 months", "Just exploring"],
};

function SelectField({ label, name, options, value, active, onToggle, onSelect }: { label: string; name: string; options: string[]; value: string; active: boolean; onToggle: () => void; onSelect: (choice: string) => void }) {
  return <label className={styles.field}><span>{label}</span><input type="hidden" name={name} value={value} /><button type="button" className={`${styles.select} ${active ? styles.selectOpen : ""}`} onClick={onToggle} aria-expanded={active}>{value || "Select an option"}<i>⌄</i></button>{active && <div className={styles.options}>{options.map((option) => <button type="button" key={option} onClick={() => onSelect(option)}>{option}</button>)}</div>}</label>;
}

export function QuoteForm() {
  const [sent, setSent] = useState(false); const [error, setError] = useState(""); const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState({ property: "", budget: "", timeline: "" }); const [open, setOpen] = useState<keyof typeof selected | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!selected.property || !selected.budget || !selected.timeline) return setError("Please select your home type, budget and timeline.");
    setIsSubmitting(true); const form = new FormData(event.currentTarget);
    const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
    const result = await response.json(); setIsSubmitting(false); if (!response.ok) return setError(result.error ?? "Something went wrong. Please try again."); setSent(true);
  }
  if (sent) return <div className={styles.success}><p>Thank you</p><h3>Your enquiry is with us.</h3><span>We&apos;ll be in touch within two business days.</span></div>;
  const setChoice = (name: keyof typeof selected, value: string) => { setSelected({ ...selected, [name]: value }); setOpen(null); };
  return <form className={styles.form} onSubmit={submit}>
    <label className={styles.field}><span>Full name</span><input required name="name" placeholder="Your name" /></label>
    <label className={styles.field}><span>Phone number</span><input required name="phone" type="tel" placeholder="Your phone number" /></label>
    <label className={styles.field}><span>Email address</span><input required name="email" type="email" placeholder="you@example.com" /></label>
    <label className={styles.field}><span>City</span><input required name="city" placeholder="Your city" /></label>
    <SelectField label="Home type" name="property" options={choices.property} value={selected.property} active={open === "property"} onToggle={() => setOpen(open === "property" ? null : "property")} onSelect={(value) => setChoice("property", value)} />
    <SelectField label="Estimated budget" name="budget" options={choices.budget} value={selected.budget} active={open === "budget"} onToggle={() => setOpen(open === "budget" ? null : "budget")} onSelect={(value) => setChoice("budget", value)} />
    <SelectField label="Preferred timeline" name="timeline" options={choices.timeline} value={selected.timeline} active={open === "timeline"} onToggle={() => setOpen(open === "timeline" ? null : "timeline")} onSelect={(value) => setChoice("timeline", value)} />
    <label className={`${styles.field} ${styles.message}`}><span>Tell us about your project</span><textarea name="message" placeholder="Location, priorities, style references or anything else you would like us to know." rows={3} /></label>
    {error && <p className={styles.error} role="alert">{error}</p>}<button type="submit" className={styles.submit} disabled={isSubmitting}>{isSubmitting ? "Sending enquiry…" : "Send enquiry"}<i>↗</i></button><p className={styles.note}>Your details stay private and are used only to respond to your enquiry.</p>
  </form>;
}
