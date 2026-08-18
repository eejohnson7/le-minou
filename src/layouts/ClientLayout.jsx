import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import ShellHeader from "./ShellHeader";

const clientLinks = [
  { label: "Profile", to: "/profile" },
  { label: "Public site", to: "/" }
];

export default function ClientLayout() {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <ShellHeader ariaLabel="Client navigation" links={clientLinks} />
      <Box component="main" sx={{ width: "100%", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
