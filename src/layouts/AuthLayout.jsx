import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import ShellHeader from "./ShellHeader";

const authLinks = [{ label: "Back to site", to: "/" }];

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <ShellHeader ariaLabel="Account navigation" links={authLinks} />
      <Box component="main" sx={{ width: "100%", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
