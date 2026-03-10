// app/dashboard/layout.js
// This layout intentionally overrides the root layout shell for the dashboard.
// It renders NO Navbar and NO Footer — the dashboard has its own sidebar navigation.

export const metadata = {
  title: "Dashboard · Anoon CMS",
  description: "Anoon Solutions admin dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    // Full-bleed dark canvas — no extra padding, no inherited nav offsets
    <div className="min-h-screen bg-[#030712] antialiased overflow-x-hidden">
      {children}
    </div>
  );
}
