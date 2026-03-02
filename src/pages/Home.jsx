import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import logo from "../assets/logo.png";

function Home(){
    return (
        <Box
            sx={{
            minHeight: "80vh",            // not full height → lifts content upward
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            textAlign: "center",
            position: "relative",
            }}
        >
            {/* Circular photo with dotted border */}
            <Box
            sx={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "4px dotted #980061",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
            <Box
                component="img"
                src={logo}
                alt="Le Minou"
                sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                }}
            />
            </Box>

            {/* Text section */}
            <Box>
            <Typography
                sx={{
                color: "#980061",
                fontSize: "6rem",
                }}
            >
                Welcome to Le Minou
            </Typography>

            <p
                style={{
                color: "#980061",
                fontSize: "2rem",
                maxWidth: "700px",
                }}
            >
                Boutique cat care and dog walks for families who want calm, reliable, detail‑oriented support. 
                Thoughtful visits, structured walks, and a gentle, editorial touch -- right here in North Side Chicago.
            </p>
            </Box>
        </Box>
    )
} 

export default Home;