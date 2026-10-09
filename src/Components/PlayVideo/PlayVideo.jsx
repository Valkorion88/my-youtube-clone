import React from 'react';
import './PlayVideo.css'
import video1 from '../../assets/video.mp4';
import dislike from '../../assets/dislike.png';
import like from '../../assets/like.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';

const PlayVideo = () => {
  return (
    <div className="play-video">
      <video src={video1} controls autoPlay muted/>
      <h3>Video Title</h3>
      <div className="play-video-info">
        <p>1525 Views &bull; 2 days ago</p>
        <div className="play-video-actions">
          <span><img src={like} alt="Like" />125</span>
          <span><img src={dislike} alt="Dislike" />5</span>
          <span><img src={share} alt="Share" />Share</span>
          <span><img src={save} alt="Save" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="Publisher" />
        <div>
          <p>Publisher Name</p>
          <span>1.2M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>Video description goes here...</p>
        <p>Other Video Descriptions go in here</p>
        <hr />
        <h4>130 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="User Profile" />
          <div className="comment-info">
            <h3>Jack Nicholson</h3><span>2 days ago</span>
            <p>Great video! Thanks for sharing.</p>
            <div className="comment-action">
              <img src={like} alt="Like" /><span>104</span>
              <img src={dislike} alt="Dislike" /><span>2</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="User Profile" />
          <div className="comment-info">
            <h3>Jack Nicholson</h3><span>2 days ago</span>
            <p>Great video! Thanks for sharing.</p>
            <div className="comment-action">
              <img src={like} alt="Like" /><span>104</span>
              <img src={dislike} alt="Dislike" /><span>2</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="User Profile" />
          <div className="comment-info">
            <h3>Jack Nicholson</h3><span>2 days ago</span>
            <p>Great video! Thanks for sharing.</p>
            <div className="comment-action">
              <img src={like} alt="Like" /><span>104</span>
              <img src={dislike} alt="Dislike" /><span>2</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="User Profile" />
          <div className="comment-info">
            <h3>Jack Nicholson</h3><span>2 days ago</span>
            <p>Great video! Thanks for sharing.</p>
            <div className="comment-action">
              <img src={like} alt="Like" /><span>104</span>
              <img src={dislike} alt="Dislike" /><span>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;