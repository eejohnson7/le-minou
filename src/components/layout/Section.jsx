import Box from "@mui/material/Box";
import PageContainer from "./PageContainer";

export default function Section({
  children,
  component = "section",
  container = true,
  containerSx = {},
  sx = {},
  ...props
}) {
  const content = container ? (
    <PageContainer sx={containerSx}>{children}</PageContainer>
  ) : (
    children
  );

  return (
    <Box
      component={component}
      {...props}
      sx={{ py: { xs: 7, sm: 9, md: 12 }, ...sx }}
    >
      {content}
    </Box>
  );
}

