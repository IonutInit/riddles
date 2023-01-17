import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { useState, useContext } from "react";

import RiddleIdContext from "./RiddleIdContext";

export default function RatingSize() {
  const [rating, setRating] = useState(0);
  const [riddleId] = useContext(RiddleIdContext)

  return (
    <Stack spacing={1}>
      <Rating
        sx={{ color: "green" }}
        name="customized-color"
        value={rating}
        size="large"
        onChange={(event, newValue) => setRating(newValue)}
        disabled={rating > 0}
        emptyIcon={<StarIcon fontSize="inherit" sx={{ color: "white" }} />}
      />
      {!rating ? <p>No rating</p> : <p>{rating}</p>}
      <p>{riddleId}</p>
      
      {
        <p className="info-fine-print">
          {!rating ? "Please rate this riddle." : "Thank you for rating!"}
        </p>
      }
    </Stack>
  );
}
