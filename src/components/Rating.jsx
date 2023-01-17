import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect, useContext } from "react";

import RiddleIdContext from "./RiddleIdContext";

export default function RatingSize() {
  const [rating, setRating] = useState(0);
  const [riddleId] = useContext(RiddleIdContext)
  const [riddleRating, setRiddleRating] = useState('No rating')

  useEffect(() => {
    async function getRiddleRating() {
      try {
        const response = await fetch(`https://riddles-api.artifices.xyz/api/v1/ratings/${riddleId}`)        
      const data = await response.json() 
      data[0].round === 0 ? null : setRiddleRating(`${data[0].round} stars`)    
      } catch (error) {
        console.log(error.message)
      }      
    }
    getRiddleRating()
  },[riddleRating, riddleId])

  async function submitRating() {
    await fetch('https://riddles-api.artifices.xyz/api/v1/ratings/post', {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          riddle_id: riddleId,
          rating,
        })
    })

  }

  if (rating !== 0) {
    submitRating()
  }

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
      {
        <p className="info-fine-print">
          {!rating ? `${riddleRating} so far.` : "Thank you for rating!"}
        </p>
        
      }
    </Stack>
  );
}
