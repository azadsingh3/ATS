import { useEffect, useState } from "react";
import './App.css'; // Ensure you import the CSS styles if they're in a separate file

// Define a list of common stopwords to ignore
const STOPWORDS = [
  "a", "an", "the", "in", "on", "at", "by", "with", "about", "between", "for", "from", "through", "into", "over", "under", "out", "across", "against", "before", "after", "along", "beyond", "during", "inside", "outside", "within", "without", "and", "or", "but", "yet", "so", "for", "nor", "although", "though", "because", "if", "unless", "while", "whereas", "it", "this", "that", "which", "who", "whom", "whose", "what", "these", "those", "anyone", "everyone", "someone", "is", "are", "was", "were", "be", "being", "been", "have", "has", "had", "do", "does", "did", "will", "would", "shall", "should", "can", "could", "may", "might", "must", "to", "of", "as", "not", "if", "than", "else", "then", "such"
];

function App() {
  const [resume, setResume] = useState(null); // Store the uploaded file
  const [jobDesc, setJobDesc] = useState(""); // Store the job description
  const [result, setResult] = useState(null); // Store the scan result

  // Handle resume file change
  const handleFileChange = (e) => {
    setResume(e.target.files[0]); // Save the uploaded file
  };

  const filterKeywords = (keywords) => {
    return keywords.filter(
      (keyword) => !STOPWORDS.includes(keyword.toLowerCase())
    );
  };

  // UseEffect to fetch any initial message or server status
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/status");
        const data = await response.json();
        console.log("Server response:", data);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage(); // Call the fetch function on component mount
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    // Validate that both inputs are provided
    if (!resume || !jobDesc) {
      alert("Please upload a resume and enter a job description.");
      return; // Stop if validation fails
    }

    // Create and populate FormData object
    const formData = new FormData();
    formData.append("resume", resume); // Add the resume file
    formData.append("jobDesc", jobDesc); // Add the job description

    try {
      const response = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        body: formData, // Send the form data
      });

      console.log("Response received:", response);

      // Handle potential errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(`Error: ${errorData.error || "Something went wrong"}`);
        return;
      }

      // Parse and set the result data
      const result = await response.json();
      
      // Filter the similar keywords to remove stopwords
      const filteredKeywords = filterKeywords(result.similarKeywords || []);
      
      // Update the result with filtered keywords
      setResult({ ...result, similarKeywords: filteredKeywords });
      console.log("Scan result:", { ...result, similarKeywords: filteredKeywords });
    } catch (error) {
      console.error("Error during form submission:", error);
      alert('Failed to connect to the server. Please try again');
    }
  };

  return (
    <div className="container">
      <h1>Resume Scanner</h1>

      <div className="input-container">
        {/* File input for the resume */}
        <input type="file" onChange={handleFileChange} />

        {/* Textarea for the job description */}
        <textarea
          placeholder="Enter the job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows="6"
          cols="50"
        ></textarea>
      </div>

      {/* Button to submit the form */}
      <button onClick={handleSubmit}>Scan</button>

      {result && console.log("Rendering results:", result)}

      {/* Display the similarity score as a meter */}
      {result && (
        <div>
          <h2>Results</h2>
          <div className="score-meter">
            <div className="score-fill" style={{ width: `${result.score}%` }}></div>
            <div className="score-text">{result.score}%</div>
          </div>
          <h3>Similar Keywords:</h3>
          <ul>
            {Array.isArray(result.similarKeywords) &&
              result.similarKeywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
