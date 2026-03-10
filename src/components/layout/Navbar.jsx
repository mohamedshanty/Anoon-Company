// components/layout/Navbar.jsx
import NavbarClient from "./navbar/NavbarClient";
import NavbarGuard from "./navbar/NavbarGuard";

export default function Navbar() {
  return (
    <NavbarGuard>
      <NavbarClient />
    </NavbarGuard>
  );
}
