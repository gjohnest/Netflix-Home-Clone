import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../constants/constants';
import axios from '../../axios';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    axios.get(props.url).then(response => {
      setMovies(response.data.results);
    }).catch(error => {
      console.error('Failed to fetch movies', error);
    });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = id => {
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length > 0) {
          setVideoData(response.data.results[0]);
        } else {
          console.log('No trailer found');
        }
      })
      .catch(error => {
        console.error('Failed to fetch video', error);
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleMovie(movie.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt={movie.title || movie.name || 'Movie poster'}
            src={`${imageUrl + movie.backdrop_path}`}
          />
        ))}
      </div>
      {videoData && <YouTube opts={opts} videoId={videoData.key} />}
    </div>
  );
}

export default RowPost;
