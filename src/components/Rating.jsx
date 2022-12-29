import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

export default function RatingSize({ imageOptions }) {
  const [rating, setRating] = useState(0);

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
      <p>{imageOptions}</p>
      {/* {!rating ? <p>No rating</p> : <p>{rating}</p>} */}
      {
        <p className="info-fine-print">
          {!rating
            ? "Please rate this riddle. Its score will appear here when there are enough ratings."
            : "Thank you for rating!"}
        </p>
      }
    </Stack>
  );
}