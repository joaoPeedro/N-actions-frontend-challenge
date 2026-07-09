import { Link, useLocation } from "react-router";

import styles from "./AppHeader.module.css";
import { Stack } from "@ds/design-system";

export function AppHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={styles.header} role="banner">
      <Stack direction="horizontal" justify="space-between" align="center" className={styles.inner}>
          <Link to="/" className={styles.logoLink} aria-label="Nordic Auctions home">
            <span className={styles.logoMark} aria-hidden="true">
              N
            </span>
            <span className={styles.logoText}>Auctions</span>
          </Link>
          <span className={styles.divider} aria-hidden="true" />
          <Link
            to="/"
            className={`${styles.navLink} ${isHome ? styles.navLinkActive : ""}`}
          >
            Public Vehicle Sales
          </Link>
      </Stack>
    </header>
  );
}
