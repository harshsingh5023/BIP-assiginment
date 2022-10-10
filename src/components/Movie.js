import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

const url = "https://image.tmdb.org/t/p/original/";


export default function Movie() {
  let params = useParams();

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
        `https://movie-task.vercel.app/api/movie?movieId=${params.id}`
    )
        .then((res) => res.json())
        .then(
            (res) => {
              setIsLoaded(true);
                var temp = {};
                temp = res.data;
                setItem(temp);
            },(error) => {
              setIsLoaded(true);
              setError(error);
          }
        );
}, []);




    if (error) {
      return (
          <p>
              {error.message}, if you get this error, the free API I used
              might have stopped working.{" "}
          </p>
      );
  } else if (!isLoaded) {
      return <>loading...</>;
  } else {
    return (
      <MoviePage>
      <Mcontent>
        <Heading>{item.title}</Heading>
        <TagLine>{item.tagline}</TagLine>
        <Wrap>

        <Genre>
          {item.genres.map((id) => {
            return `${id.name} `;
          })}
        </Genre>
      <Rating>{Math.round(item.vote_average*10)/10} /10</Rating>
      <Release>Release: {item.release_date}</Release>
      <Lang>{item.original_language.toUpperCase()}</Lang>
        </Wrap>
        <Description>{item.overview}</Description>
      </Mcontent>
      <MPic>
        <img src={url + item.poster_path} alt="" />
      </MPic>
    </MoviePage>

    );
  } 
}


const MoviePage = styled.div`
width: 96%;
max-width: 1140px;
margin: 0 auto;
    background-radius: 500px;
    display: grid;
    grid-auto-column: 1fr 1.5fr;
`;
const Mcontent = styled.div`
grid-area: 1 / 1 / 2 / 2;
width:100%;
padding: 10px;
@media (max-width: 768px) {
    width: 100%;
  }
  `;
  const MPic = styled.div`
  grid-area: 1 / 2 / 2 / 3;
display: flex;
justify-content: center;
align-items: center;
@media (max-width: 768px) {
  display: none;
}

img{
  padding: 50px;
  width: 300px;
  height: 350px;
}
`;
const Heading = styled.h1`
font-size: 26px;
font-weight: 600;
margin-bottom: 12px;
`;
const TagLine = styled.h4`
font-size: 16px;
font-weight: 400;
margin-bottom: 12px;
padding-top: 5px;
color: grey;
`;
const Wrap = styled.div`
display: flex;
width: 100%;
// justify-content: space-between;
@media (max-width: 768px) {
  flex-direction: column;
}
`;

const Genre = styled.div`
padding: 3px;
background: green;
border: none;
color: white;
border-radius: 5px;
font-size: 12px;
cursor: pointer;
margin-bottom: 5px;
margin-right: 10px;
width: max-content;
`;
const Rating = styled.div`
margin-right: 10px;
margin-bottom: 5px;
width: max-content;
padding: 3px;
background: green;
border: none;
color: white;
border-radius: 5px;
font-size: 12px;
cursor: pointer;
background: red;
`;
const Release = styled.div`
margin-right: 10px;
margin-bottom: 5px;
padding: 3px;
background: yellowgreen;
border: none;
color: white;
width: max-content;
border-radius: 5px;
font-size: 12px;
cursor: pointer;
`;
const Lang = styled.div`
padding: 3px;
margin-right: 10px;
margin-bottom: 5px;
background: rgb(255,0,255);
border: none;
color: white;
width: max-content;
border-radius: 5px;
font-size: 12px;
cursor: pointer;
`;
const Description = styled.div`
border: none;
color: black;
max-width: 500px;
font-size: 16px;
font-size: 18px;
margin-top: 10px
`;