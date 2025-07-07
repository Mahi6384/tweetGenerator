import axios from "axios";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [tweet, setTweet] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState("");

  const callApi = async () => {
    setLoading(true);
    setGenerated("");

    const prompt = `<|system|>You are a tweet-generating assistant.<|user|>Write a short 280 characters about: "${tweet}" The sentiment of the tweet should be :"${sentiment} <|assistant|>`;

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 80,
            temperature: 0.8,
            return_full_text: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const result = response.data[0]?.generated_text || "No tweet generated";
      setGenerated(result);
    } catch (error) {
      console.error("Error generating tweet:", error.message);
      setGenerated("Something went wrong while generating the tweet.");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          boxSizing: "border-box",
          // backgroundColor: "rgb(4, 2, 26)",
          background:
            " linear-gradient(45deg,rgb(30, 8, 53),rgb(41, 2, 37),rgb(32, 5, 61))",
          animation: "gradientShift 2s ease infinite",
          // background:
          // " linear-gradient(to bottom right,rgb(44, 14, 85),rgb(21, 21, 23))",
        }}
      >
        <h1 style={{ color: "white" }}>Write your paragraph here</h1>
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Start Writing Here"
          value={tweet}
          style={{
            width: "50vw",
            height: "50vh",
            padding: "16px",
            fontSize: "16px",
            border: "1px solid ",
            borderRadius: "8px",
            resize: "none",
            boxSizing: "border-box",
          }}
        />
        <input
          value={sentiment}
          placeholder="Write the tone of the tweet i.e :- Positive/Negative/Sarcastic"
          onChange={(e) => setSentiment(e.target.value)}
          style={{
            width: "50vw",
            // height: "50vh",
            padding: "16px",
            fontSize: "16px",
            border: "1px solid ",
            borderRadius: "8px",
            resize: "none",
            boxSizing: "border-box",
          }}
        ></input>
        <button
          onClick={callApi}
          disabled={loading}
          style={{
            marginTop: "16px",
            padding: "10px 24px",
            backgroundColor: "white",

            color: "black",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Generating..." : "Generate Tweet"}
        </button>

        {generated && (
          <div
            style={{
              marginTop: "24px",
              width: "60%",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f9f9f9",
              fontSize: "18px",
            }}
          >
            <strong>Generated Tweet:</strong>
            <p>{generated}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
