import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function CtaLink({ children, to, secondary = false, sx = {}, ...props }) {
  return (
    <Button
      component={RouterLink}
      to={to}
      variant={secondary ? "plum-outlined" : "plum-contained"}
      endIcon={<ArrowForwardRoundedIcon className="cta-arrow" />}
      {...props}
      sx={{
        px: 2.25,
        "& .cta-arrow": {
          transition: "transform 160ms ease"
        },
        "&:hover .cta-arrow": {
          transform: "translateX(4px)"
        },
        ...sx
      }}
    >
      {children}
    </Button>
  );
}

