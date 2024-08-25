import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
const API_KEY = process.env.REACT_APP_O_API_KEY;
import YouTubeComponent from './YoutubeComponent';
import GenAI_Component from './GenAI_Component';


const Container = styled.div`
display: flex;
flex-direction: row;
padding: 20px 30px;
justify-content: center;
border-bottom: 1px solid lightgray;
`;

const CoverImage = styled.img`
object-fit: cover;
height: 352px;
`;

const InfoColumn = styled.div`
display: flex;
flex-direction:column;
margin:20px;
`;

const MovieName = styled.span`
font-size: 18px;
font-weight: 600;
color:black;
margin: 15px 0;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
text-transform:capitalize;
`;
const MovieInfo = styled.span`
font-size: 16px;
font-weight: 500px;
color: black;
overflow: hidden;
margin: 4px 0;
text-transform:capitalize;
text-overflow: ellipsis;
& span {
    opacity: 0.5;
}
`;

const Close = styled.span`
font-size: 16px;
font-weight: 600px;
color: black;
background: lightgray;
height: fit-content;
padding: 8px;
boder-radius: 70%;
cursor: pointer;
opacity: 0.8;
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const MovieList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MovieItem = styled.li`
  margin: 10px 0;
  cursor: pointer;
  color:Red;
`;


const MovieInfoComponent = (props) => {
    const  [movieInfo, setMovieInfo] = useState();
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
    const [showYoutubePopup, setShowYoutubePopup] = useState(false);
  const [showGenAIPopup, setShowGenAIPopup] = useState(false);

    //const {Title, Year, imdbID, Type, Poster} = props.movie;
    const { selectedMovie } = props;
    useEffect(() => {
        axios
        .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response)=> setMovieInfo(response.data));
    },[selectedMovie]);

    const handleMovieClick = movieTitle => {
        setSelectedMovieTitle(movieTitle);
        setShowYoutubePopup(true);
      };

      const handleRecClick = movieTitle => {
        setSelectedMovieTitle(movieTitle);
        setShowGenAIPopup(true);
      };
    
      const handleClosePopup = () => {
        setSelectedMovieTitle(null);
      };
    

    return (
    <Container>
        {movieInfo?<>
            <CoverImage src = {movieInfo?.Poster}/>
        <InfoColumn>
            <MovieName>
                {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo>
                RELEASED: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
                IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
                Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
                Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
                RunTime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
                Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
                Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
                Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>

    <AppContainer>
      <MovieList>
        <MovieItem onClick={() => handleMovieClick('Movie 2')}>Click here for Youtube Results</MovieItem>
      </MovieList>
      <MovieList>
        <MovieItem onClick={() => handleRecClick('Movie')}>Click here to get Movie Recomendations similar to "{movieInfo?.Title}"</MovieItem>
      </MovieList>

      {showYoutubePopup && selectedMovieTitle && (
        <YouTubeComponent movieTitle={movieInfo?.Title} onClose={handleClosePopup} />
      )}
      {showGenAIPopup && selectedMovieTitle &&(
        <GenAI_Component movieTitle={movieInfo?.Title} onClose={handleClosePopup} />
      )}
    </AppContainer>

        </InfoColumn>
        <Close onClick ={() => props.onMovieSelect()}>X</Close>
        </>:"Loading..."}
        
    </Container>
    );
};
export default MovieInfoComponent