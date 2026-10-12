import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        maxResults: '50',
        regionCode: 'US',
        key: API_KEY,
      });

      if (category !== 0) {
        params.set('videoCategoryId', category);
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

        setData(Array.isArray(result.items) ? result.items : []);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error('Failed to load videos:', error);
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [category]);

  return (
    <div className="feed">
      {loading ? (
        <p className="feed-message">Loading videos...</p>
      ) : error ? (
        <p className="feed-message" role="alert">Could not load videos: {error}</p>
      ) : data.length === 0 ? (
        <p className="feed-message">No videos found.</p>
      ) : data.map((item, index) => {
        const video = item.snippet;
        const stats = item.statistics || {};

        return (
          <Link key={item.id || index} to={`/video/${category}/${item.id}`} className="card">
            <img src={video?.thumbnails?.medium?.url || ''} alt={video?.title || 'Thumbnail'} />
            <h2>{video?.title || 'Video Title'}</h2>
            <h3>{video?.channelTitle || 'Channel Name'}</h3>
            <p>
              {value_converter(stats.viewCount ?? 0) + ' views'}
              {' '} &bull; {' '}
              {video?.publishedAt ? moment(video.publishedAt).fromNow() : 'Recently'}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;