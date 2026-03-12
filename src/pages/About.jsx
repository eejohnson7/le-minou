import Typography from "@mui/material/Typography";
import TextBlock from "../components/TextBlock";

export default function About() {
  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <Typography sx={{ fontSize: "3rem" }}>
        About Le Minou
      </Typography>

      <Typography sx={{ fontSize: "1.8rem", marginTop: "2rem" }}>
        How It Began
      </Typography>
      <TextBlock>
{`Le Minou began as a quiet, practical solution to a familiar problem: finding pet care that felt genuinely trustworthy. Living on the North Side of Chicago, I was often the person friends and neighbors called when they needed someone who would treat their pets with real attention—someone who noticed routines, tracked details, and created a sense of calm in their home while they were away. What started as helping out became a pattern, and that pattern became Le Minou.`}
      </TextBlock>

      <Typography sx={{ fontSize: "1.8rem", marginTop: "2rem" }}>
        My Background
      </Typography>
      <TextBlock>
{`I’ve always been someone who blends structure with softness. In my work as a backend engineer, I learned to document everything, anticipate edge cases, and build systems that people can rely on. In my personal life, I’ve always gravitated toward animals—especially the quiet, expressive rhythms of cats and the grounding routine of dog walks. Over time, those two parts of my life merged naturally: thoughtful care supported by clear communication and dependable routines.`}
      </TextBlock>

      <Typography sx={{ fontSize: "1.8rem", marginTop: "2rem" }}>
        Building Le Minou
      </Typography>
      <TextBlock>
{`Le Minou took shape slowly and intentionally. I wanted a service that felt warm but organized, editorial but approachable, and rooted in the neighborhoods I know best on the North Side. The name came from a mix of affection and design sensibility—something simple, French-inspired, and soft around the edges. From there, the brand, the palette, and the service model followed.`}
      </TextBlock>

      <Typography sx={{ fontSize: "1.8rem", marginTop: "2rem" }}>
        What Le Minou Offers
      </Typography>
      <TextBlock>
{`Today, Le Minou offers boutique cat care and structured dog walks designed for people who value reliability, clarity, and a gentle presence in their home. Every visit is documented, every walk is paced to your dog’s comfort, and every pet is treated like an individual with their own rhythms and preferences.`}
      </TextBlock>

      <Typography sx={{ fontSize: "1.8rem", marginTop: "2rem" }}>
        What Guides My Work
      </Typography>
      <TextBlock>
{`Consistency — Pets thrive on routine, and so does good care.
Clarity — Clean communication, thoughtful updates, and no guesswork.
Calm — A quiet, steady presence that helps pets feel safe while you’re away.
Design with intention — Everything is built to feel warm, minimal, and trustworthy.`}
      </TextBlock>
    </main>
  );
}