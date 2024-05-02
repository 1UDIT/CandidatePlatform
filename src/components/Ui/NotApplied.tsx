import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotApplied() {
  return (
    <>
      <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'flex', paddingTop: "10px" }}>
        You have not applied for any jobs yet.
      </Box>
      <Box sx={{ alignContent: 'center', justifyContent: 'center', display: 'flex', paddingTop: "20px" }}>
        <Link to={"/"}>
          <Button variant='contained' style={{ backgroundColor: "#55efc4", color: 'black' }}>
            Apply for jobs
          </Button>
        </Link>
      </Box>
    </>

  )
}
