"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState(""); const [error, setError] = useState(""); const router = useRouter();
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); const result = await response.json(); if (!response.ok) return setError(result.error); router.push("/admin"); router.refresh(); }
  return <main className={styles.login}><div><a href="/" className={styles.logo}>THE LIVING <span>EDIT</span></a><p>Private studio access</p><h1>Welcome back.</h1><form onSubmit={submit}><label>Owner password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" /></label>{error && <small>{error}</small>}<button type="submit">Enter dashboard <span>↗</span></button></form></div></main>;
}
