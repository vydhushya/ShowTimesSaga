import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PopupOverlay = styled.div`
  position: fixed;
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
  overflow: auto;
`;

const GenAI_Component = ({ movieTitle, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);



        //const result = model.generateText

        async function fetchData(){
          try{
            setLoading(true);
            const genAI = new GoogleGenerativeAI(process.env.REACT_APP_G_API_KEY);
            const model =  genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Give top 10 similar recommendations on movie ${movieTitle} along with genres`
            
            const result = await model.generateContent(prompt);
            console.log(result.response.text());
            const text = result.response.text();
            setData(text);
            setLoading(false);
          }
            catch(error){
              setLoading(false);
              console.error(error);
            }
          
        }
        useEffect(() => {
          fetchData();
        }, [movieTitle]);

  return (
    <PopupOverlay>
      <PopupContent>
        <h1>Movie Recommendations with genres</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>{data}</p>
        )}
      </PopupContent>
    </PopupOverlay>
  );
};

export default GenAI_Component;
