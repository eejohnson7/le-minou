import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CareRequestSuccess from "../components/request-care/CareRequestSuccess";
import RequestCareForm from "../components/request-care/RequestCareForm";
import PageContainer from "../components/layout/PageContainer";
import { SectionEyebrow } from "../components/layout/SectionHeading";

export default function RequestCare() {
  const [submittedName, setSubmittedName] = useState("");

  if (submittedName) {
    return <CareRequestSuccess name={submittedName} />;
  }

  return (
    <>
      <Box
        component="header"
        aria-labelledby="request-care-title"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "var(--cream)",
          borderBottom: "1px solid var(--plum-line-soft)"
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: { xs: -86, md: -120 },
            right: { xs: -98, md: "6%" },
            width: { xs: 220, md: 360 },
            height: { xs: 220, md: 360 },
            border: "1px solid var(--plum-line-soft)",
            borderRadius: "50%"
          }}
        />

        <PageContainer
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(280px, 0.65fr)" },
            gap: { xs: 3.5, md: 9 },
            alignItems: "end",
            py: { xs: 7, sm: 9, md: 11 }
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <SectionEyebrow sx={{ mb: 1.5 }}>Request Care</SectionEyebrow>
            <Typography
              id="request-care-title"
              component="h1"
              variant="h1"
              sx={{
                color: "var(--ink)",
                fontSize: { xs: "3.05rem", sm: "4.2rem", md: "5.15rem" },
                lineHeight: { xs: 0.99, md: 0.95 },
                maxWidth: 760
              }}
            >
              Tell me what care looks like at your house.
            </Typography>
          </Box>

          <Box sx={{ borderLeft: { md: "1px solid var(--plum-line)" }, pl: { md: 4 }, pb: { md: 0.5 } }}>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: { xs: "1rem", md: "1.06rem" }, lineHeight: 1.78 }}>
              Share the pets, routine, and timing you have in mind. Erin will review the details and follow up about fit and next steps.
            </Typography>
            <Typography sx={{ color: "var(--ink)", fontSize: "0.86rem", fontWeight: 700, lineHeight: 1.65, mt: 2 }}>
              Sending a request does not reserve dates or confirm care.
            </Typography>
          </Box>
        </PageContainer>
      </Box>

      <Box component="section" aria-labelledby="inquiry-form-title" sx={{ bgcolor: "var(--paper)", py: { xs: 7, sm: 9, md: 12 } }}>
        <PageContainer
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(220px, 0.48fr) minmax(0, 1.52fr)" },
            gap: { xs: 5, md: 9, lg: 12 },
            alignItems: "start"
          }}
        >
          <Box sx={{ position: { md: "sticky" }, top: { md: 112 } }}>
            <SectionEyebrow sx={{ mb: 1.5 }}>The inquiry</SectionEyebrow>
            <Typography
              id="inquiry-form-title"
              component="h2"
              variant="h2"
              sx={{ color: "var(--ink)", fontSize: { xs: "2.35rem", md: "3rem" }, lineHeight: 1.02, maxWidth: 340 }}
            >
              The basics are plenty for now.
            </Typography>
            <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.96rem", lineHeight: 1.75, mt: 2.25, maxWidth: 360 }}>
              No account is needed. Detailed care plans, home access, and medical information can wait until you decide to move forward.
            </Typography>

            <Box sx={{ borderTop: "1px solid var(--plum-line)", mt: 3.5, pt: 2.5, maxWidth: 360 }}>
              <Typography sx={{ color: "var(--muted-ink)", fontSize: "0.82rem", lineHeight: 1.7 }}>
                Please do not include door codes, alarm details, payment information, or full medical records in this form.
              </Typography>
            </Box>
          </Box>

          <RequestCareForm onSuccess={setSubmittedName} />
        </PageContainer>
      </Box>
    </>
  );
}
