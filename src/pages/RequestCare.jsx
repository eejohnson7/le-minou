import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CtaLink from "../components/layout/CtaLink";
import PageContainer from "../components/layout/PageContainer";
import SectionHeading from "../components/layout/SectionHeading";

export default function RequestCare() {
  return (
    <Box component="section" aria-labelledby="request-care-title" sx={{ py: { xs: 8, md: 12 }, minHeight: "65vh" }}>
      <PageContainer narrow>
        <SectionHeading
          id="request-care-title"
          eyebrow="Request care"
          title="Let’s begin with the routines that matter."
          description="A simple public care-request form is the next part of the Le Minou redesign. It is intentionally being kept separate from the unfinished client booking flow."
        />
        <Box sx={{ borderTop: "1px solid var(--plum-line)", pt: 3 }}>
          <Typography sx={{ color: "var(--muted-ink)", lineHeight: 1.75, mb: 3 }}>
            Existing clients can continue to use the private account area while the new inquiry experience is prepared.
          </Typography>
          <CtaLink to="/sign-in" secondary>Client login</CtaLink>
        </Box>
      </PageContainer>
    </Box>
  );
}

