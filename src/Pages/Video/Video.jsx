import React from 'react';
import { useParams } from 'react-router-dom';
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recomended from '../../Components/Recomended/Recomended';

const Video = () => {

  const {videoId, categoryId} = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recomended />
    </div>
  );
};

export default Video;