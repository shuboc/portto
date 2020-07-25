import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import { Link } from "react-router-dom";

import { getDistToBottom } from 'util/scrollUtil';
import styles from './styles/home.css';
import OWNER from 'constants/owner';

const API_FETCH_COUNT = 20;

const cx = classnames.bind(styles);

const HomePage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssets = useCallback(() => {
    setLoading(true);
    fetch(`https://api.opensea.io/api/v1/assets?owner=${OWNER}&offset=${assets.length}&limit=${API_FETCH_COUNT}`)
      .then(res => res.json())
      .then(json => {
        setAssets(prevAssets => [...prevAssets, ...json.assets]);
        setLoading(false);
      });
  }, [assets.length])

  // Initial load
  useEffect(() => {
    if (!loading && assets.length === 0) {
      fetchAssets();
    }
  }, [assets.length, fetchAssets, loading]);

  useEffect(() => {
    const onScroll = () => {
      const dist = getDistToBottom();
      if (!loading && dist < 100) {
        fetchAssets();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [assets.length, fetchAssets, loading]);

  return (
    <div>
      <h1>Asset List</h1>
      <div className={cx('asset-list')}>
        {
          assets.map(asset => {
            return (
              <Link className={cx('asset')} key={asset.token_id} to={`/${asset.asset_contract.address}/${asset.token_id}`}>
                <img src={asset.image_url} />
                <h2>{asset.name}</h2>
              </Link>
            )
          })
        }
      </div>
      {loading && <div className={cx('loading')}>Loading...</div>}
    </div>
  )
}

export default HomePage;