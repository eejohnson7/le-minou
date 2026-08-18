import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import ShellHeader from "./ShellHeader";

const bookingLinks = [{ label: "Back to profile", to: "/profile" }];

export default function BookingShell() {
  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <ShellHeader ariaLabel="Booking navigation" links={bookingLinks} />
      <Box component="main" sx={{ width: "100%", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
