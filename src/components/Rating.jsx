import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect, useContext } from "react";

import RiddleIdContext from "./RiddleIdContext";

import { APIpath } from "../lib/path";
// import {key} from '../lib/auth'
//AUTHORIZATION DISABLED AS IT MADE IT SLOWED DOWN FETCHING

export default function RatingSize() {
  const [rating, setRating] = useState(0);
  const [riddleId] = useContext(RiddleIdContext);
  const [riddleRating, setRiddleRating] = useState("No ratings so far");

  useEffect(() => {
    async function getRiddleRating() {
      try {
        const response = await fetch(
          `${APIpath}/ratings/${riddleId}`
          // ,{
          //   headers: {
          //     'Authorization': `${key}`
          //   }
          // }
        );
        const data = await response.json();
        const rating = data.data[0].value;
        rating === 0 ? null : setRiddleRating(`${rating} stars on average`);
      } catch {
        //nothing
      }
    }
    getRiddleRating();
  }, [riddleRating, riddleId]);

  async function submitRating() {
    await fetch(`${APIpath}/ratings/${riddleId}`, {
      method: "POST",
      headers: {
        // "Authorization": `${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
      }),
    });
  }

  if (rating !== 0) {
    submitRating();
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
          {!rating ? `${riddleRating}` : "Thank you for rating!"}
        </p>
      }
    </Stack>
  );
}
