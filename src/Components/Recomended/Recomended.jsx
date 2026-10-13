import React, { useEffect, useState } from 'react';
import './Recomended.css'
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recomended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setApiData([]);
      setError('');
      const params = new URLSearchParams({
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        maxResults: '45',
        regionCode: 'US',
        videoCategoryId: categoryId,
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

        setApiData(result.items || []);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error('Failed to load recommended videos:', error);
        setError(error.message || 'An unexpected error occurred.');
      }
    };

    fetchData();
    return () => controller.abort();
  }, [categoryId]);

  return (
    <div className="recomended">
      {error && <p role="alert">Could not load recommended videos: {error}</p>}
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId || categoryId}/${item.id}`} key={item.id || index} className="side-video-list">
            <img src={item.snippet.thumbnails?.medium?.url || ''} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics?.viewCount ?? 0)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recomended;