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
  const [channelData, setChannelData] = useState(null);
  const [detailsError, setDetailsError] = useState('');
  const [channelError, setChannelError] = useState('');
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchVideoData = async () => {
      setApiData(null);
      setDetailsError('');
      setChannelData(null);
      setChannelError('');
      const params = new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: API_KEY,
      });

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&moderationStatus=published&order=time&textFormat=html&maxResults=50&videoId=${videoId}&key=${API_KEY}`
      try {
        const response = await fetch(comment_url, { signal: controller.signal });
        const result = await response.json();

        if (!response.ok || result.error) {
          throw new Error(result.error?.message || `YouTube API request failed (${response.status})`);
        }

        setCommentData(result.items || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to load comments:', error);
        }
      }

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

  useEffect(() => {
    const channelId = apiData?.snippet?.channelId;
    if (!channelId) {
      return undefined;
    }

    const controller = new AbortController();
    const fetchChannelData = async () => {
      const params = new URLSearchParams({
        part: 'snippet,statistics',
        id: channelId,
        key: API_KEY,
      });

      try {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?${params}`,
          { signal: controller.signal }
        );
        const result = await response.json();

        if (!response.ok || result.error) {
          throw new Error(result.error?.message || `YouTube API request failed (${response.status})`);
        }

        setChannelData(result.items?.[0] || null);
        setChannelError('');
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error('Failed to load channel details:', error);
        setChannelError(error.message || 'An unexpected error occurred.');
      }
    };

    fetchChannelData();
    return () => controller.abort();
  }, [apiData?.snippet?.channelId]);

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
      {channelError && <p role="alert">Could not load channel details: {channelError}</p>}
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
        <img src={channelData?.snippet?.thumbnails?.default?.url || ""} alt="Publisher" />
        <div>
          <p>{apiData?.snippet?.channelTitle || ""}</p>
          <span>{channelData?.statistics?.subscriberCount != null ? value_converter(channelData.statistics.subscriberCount) : '—'} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?.snippet?.description?.slice(0, 250) || "Description Here"}</p>
        <hr />
        <h4>{apiData?.statistics?.commentCount != null ? value_converter(apiData.statistics.commentCount) : "0"} Comments</h4>
        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
             <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Profile" />
             <div className="comment-info">
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3><span>2 days ago</span>
               <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                 <img src={like} alt="Like" /><span>{item.snippet.topLevelComment.snippet.likeCount != null ? value_converter(item.snippet.topLevelComment.snippet.likeCount) : '0'}</span>
                 <img src={dislike} alt="Dislike" />
               </div>
             </div>
           </div>
          )})}
      </div>
    </div>
  );
};

export default PlayVideo;