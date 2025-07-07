// // SentimentAnalyzer.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const SentimentAnalyzer = () => {
//   const [text, setText] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const API_TOKEN = "YOUR_HUGGINGFACE_API_TOKEN"; // ← paste your token here

//   const analyzeSentiment = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
//         { inputs: text },
//         {
//           headers: {
//             Authorization: `Bearer ${API_TOKEN}`,
//           },
//         }
//       );
//       setResult(response.data[0]);
//     } catch (err) {
//       console.error("API Error:", err);
//       setResult({ label: "Error", score: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
//       <h1 className="text-xl font-bold mb-4">Sentiment Analyzer</h1>
//       <textarea
//         className="w-full p-2 border rounded mb-3"
//         rows={4}
//         placeholder="Enter a sentence..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={analyzeSentiment}
//         disabled={loading}
//       >
//         {loading ? "Analyzing..." : "Analyze Sentiment"}
//       </button>

//       {result && (
//         <div className="mt-4">
//           <p className="font-semibold">
//             Result: <span className="text-green-600">{result.label}</span>
//           </p>
//           <p>Confidence: {(result.score * 100).toFixed(2)}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SentimentAnalyzer;
