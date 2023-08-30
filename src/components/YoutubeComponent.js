import React, { useState, useEffect , useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PopupOverlay = styled.div`
position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  height: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: auto; /* or overflow: scroll; */
`;

const YouTubeComponent = ({ movieTitle, onClose }) => {
  const [youtubeResults, setYoutubeResults] = useState([]);
  const popupRef = useRef(null);

  useEffect(() => {
    // Fetch YouTube results using the YouTube API
    const API_KEY = 'YOUTUBE_API';
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';

    axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: `${movieTitle} trailer`,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
      },
    })
    .then(response => {
      setYoutubeResults(response.data.items);
    })
    .catch(error => {
      console.error('Error fetching YouTube results:', error);
    });
  }, [movieTitle]);

  const handleOverlayClick = event => {
    if (event.target === popupRef.current) {
      onClose();
    }
  };

  return (
    <PopupOverlay ref={popupRef} onClick={handleOverlayClick}>
      <PopupContent>
        <h2>YouTube Results for {movieTitle}</h2><br></br>
        {/* <button onClick={onClose}>Close</button><br></br> */}
        {youtubeResults.map(video => (
          <div key={video.id.videoId}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </PopupContent>
    </PopupOverlay>
  );
};

export default YouTubeComponent;