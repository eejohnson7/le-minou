import Box from "@mui/material/Box";

export default function PageContainer({ children, narrow = false, sx = {}, ...props }) {
  return (
    <Box
      {...props}
      sx={(theme) => ({
        width: `min(${narrow ? theme.brand.layout.readingWidth : theme.brand.layout.contentWidth}px, calc(100% - 2.5rem))`,
        mx: "auto",
        ...sx
      })}
    >
      {children}
    </Box>
  );
}

