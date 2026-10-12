import React, { useEffect, useState } from 'react';
import './PlayVideo.css'
import video1 from '../../assets/video.mp4';
import dislike from '../../assets/dislike.png';
import like from '../../assets/like.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({videoId}) => {
  const [apiData, setApiData] = useState(null);
  const [detailsError, setDetailsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchVideoData = async () => {
      setApiData(null);
      setDetailsError('');
      const params = new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: API_KEY,
      });

      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?${params}`,
          { signal: controller.signal }
        );
        const result = await response.json();

        if (!response.ok || result.error) {
          throw new Error(result.error?.message || `YouTube API request failed (${response.status})`);
        }

        setApiData(result.items?.[0] || null);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error('Failed to load video details:', error);
        setDetailsError(error.message || 'An unexpected error occurred.');
      }
    };

    fetchVideoData();
    return () => controller.abort();
  }, [videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted/> */}
      <iframe
        src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1`}
        title={apiData?.snippet?.title || 'YouTube video player'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <h3>{apiData?.snippet?.title || "Title Here"}</h3>
      {detailsError && <p role="alert">Could not load video details: {detailsError}</p>}
      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics?.viewCount ?? 0)} views
          {' '}&bull;{' '}
          {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : ''}
        </p>
        <div className="play-video-actions">
          <span>
            <img src={like} alt="Like" />
            {apiData?.statistics?.likeCount != null ? value_converter(apiData.statistics.likeCount) : '—'}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
            {apiData?.statistics?.dislikeCount != null ? value_converter(apiData.statistics.dislikeCount) : ''}
          </span>
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