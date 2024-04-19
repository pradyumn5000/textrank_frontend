import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [plotImage, setPlotImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when submitting
    try {
      const response = await axios.post('https://sc4052backend.azurewebsites.net/textrank/', {
        url: url,
      });
      if (response.status === 200) {
        setSummary(response.data.text_summary);
        setPlotImage(response.data.plot_image);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false); // Set loading state to false when request is complete
    }
  };

  return (
    <div className="App">
      <h1>TextRank Web App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p style={{ fontSize: '0.8em', color: 'gray' }}>Supported sites: Yahoo News ... Some examples are</p>
          <p style={{ fontSize: '0.8em', color: 'gray' }}>https://sg.news.yahoo.com/three-filipinos-dead-uae-floods-080008575.html</p>
          <p style={{ fontSize: '0.8em', color: 'gray' }}>https://sg.news.yahoo.com/ex-prosecutor-explains-why-donald-075647915.html</p>
          <p style={{ fontSize: '0.8em', color: 'gray' }}>https://sg.news.yahoo.com/kenya-mourns-defence-chief-killed-072635222.html</p>
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Summarize'} {/* Button label changes based on loading state */}
        </button>
      </form>
      
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
      {plotImage && (
        <div>
          <h2>Plot Image:</h2>
          <img src={`data:image/png;base64,${plotImage}`} alt="Plot" />
        </div>
      )}
    </div>
  );

}

export default App;
