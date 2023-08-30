// import logo from './logo.svg';
// import './App.css';
import axios from "axios";
import { useState } from "react";
import styled from 'styled-components'
import MovieComponent from "./components/MovieComponent"
import MovieInfoComponent from "./components/MovieInfoComponent"
const API_KEY = 'API_KEY';
const Container = styled.div`
dsplay: flex;
flex-direction: column;
`;
const Header = styled.div`
display:flex;
flex-direction: row;
background-color: black;
color: red;
padding: 15px;
font-size:25px;
box-shadow: 0 3px 6px 0 #555;
justify-content: space-between;
algn-items: center;
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
font-family: 'Black Ops One', cursive;
`;

const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color:white;
border-radius: 6px;
margin-left:20px;
width:50%;
align-items: center;
`;

const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 10px;
`;

const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;

const SearchInput = styled.input`
color:black;
font-size: 16px;
font-weight: bold;
border: none;
outline:none;
margin-left:15px;
`;

const MovieListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
justify-content: space-evenly;
`;

const PlaceHolder = styled.img`
width: 120px;
height: 120px;
margin: 150px;
opacity: 50%
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState([]);
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) =>{
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      updateMovieList(response.data.Search)
  }

  const onTextChange = (event) =>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      {/* {movieInfo?<> */}
        <Header>
        <AppName>
          <MovieImage src="/play-icon.png"/>
          MyFlix</AppName>
          <SearchBox>
            <SearchIcon src="search-icon.png"/>
            <SearchInput placeholder='Search' 
            value={searchQuery}
            onChange={onTextChange}
            />
          </SearchBox>
        </Header>
        {selectedMovie && <MovieInfoComponent
         selectedMovie = {selectedMovie}
         onMovieSelect = {onMovieSelect}
         />}
        <MovieListContainer>
          {
            movieList?.length? movieList.map((movie, index)=>
            <MovieComponent
             key={index}
             movie={movie}
             onMovieSelect = {onMovieSelect}
             />
            ):(
              <PlaceHolder src= "play-icon.png"/>
            )
          }
          
          
        </MovieListContainer>
      
      </Container>
  );
}

export default App;
