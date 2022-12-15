import { useState } from "react";
import placeholder from "./assets/placeholder.jpg";
import "./GetImage.css";

const GetImage = () => {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState(placeholder);
  const [response, setResponse] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const generateImage = () => {
    if (!prompt) {
      alert("Insert some text");
      return;
    }
    async function getImage() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://the-path-of-riddles.onrender.com/api/v1/openai/img",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: prompt,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`That didn't work`);
        }

        const data = await response.json();
        console.log(data.url);
        setUrl(data.url);
      } catch (error) {
        setResponse(error.message);
      }
      setIsLoading(false);
      handlePrompt((e) => {
        e.target.value = "";
      });
    }
    getImage();
  };

  return (
    <div className="get-image">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img src={url} alt={"image generated according to prompt"}></img>

      <textarea onChange={(e) => handlePrompt(e)}></textarea>

      <button onClick={generateImage} disabled={isLoading}>
        {!isLoading ? "Get Image" : "Drawing..."}
      </button>
      <p>{response}</p>
    </div>
  );
};

export default GetImage;
