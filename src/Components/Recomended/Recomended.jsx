import React from 'react';
import './Recomended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'

const Recomended = () => {
  return (
    <div className="recomended">
      <div className="side-video-list">
        <img src={thumbnail1} alt="Thumbnail 1" />
        <div className="vid-info">
          <h4>Video Title 1</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail2} alt="Thumbnail 2" />
        <div className="vid-info">
          <h4>Video Title 2</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail3} alt="Thumbnail 3" />
        <div className="vid-info">
          <h4>Video Title 3</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail4} alt="Thumbnail 4" />
        <div className="vid-info">
          <h4>Video Title 4</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail5} alt="Thumbnail 5" />
        <div className="vid-info">
          <h4>Video Title 5</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail6} alt="Thumbnail 6" />
        <div className="vid-info">
          <h4>Video Title 6</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail7} alt="Thumbnail 7" />
        <div className="vid-info">
          <h4>Video Title 7</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
      <div className="side-video-list">
        <img src={thumbnail8} alt="Thumbnail 8" />
        <div className="vid-info">
          <h4>Video Title 8</h4>
          <p>Channel Name</p>
          <p>199k Views</p>
        </div>
      </div>
    </div>
  );
};

export default Recomended;