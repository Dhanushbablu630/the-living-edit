"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./intro-loader.module.css";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timeout = window.setTimeout(() => setVisible(false), 1900); return () => window.clearTimeout(timeout); }, []);
  return <AnimatePresence>{visible && <motion.div className={styles.loader} initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}><div className={styles.room}><motion.span className={styles.wall} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65 }} /><motion.span className={styles.floor} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.25, duration: 0.65 }} /><motion.span className={styles.sofa} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.45 }} /><motion.span className={styles.lamp} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.35 }} /></div><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}><span>THE LIVING</span> EDIT</motion.p></motion.div>}</AnimatePresence>;
}
