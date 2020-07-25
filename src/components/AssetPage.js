import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import { useParams } from "react-router-dom";

import styles from './styles/asset.css';

const cx = classnames.bind(styles);

const AssetPage = () => {
  const { contractAddress, tokenId } = useParams();
  const [loading, setLoading] = useState(false);
  const [asset, setAsset] = useState(null);

  const fetchAsset = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`)
        .then(res => res.json())
        .then(json => {
          setAsset(json);
          setLoading(false);
        })
    }
  }, [contractAddress, loading, tokenId]);

  useEffect(() => {
    if (!asset) {
      fetchAsset();
    }
  }, [asset, fetchAsset]);

  return (
    <div className={cx('container')}>
      <h1>{(asset && asset.collection) ? asset.collection.name : 'Asset'}</h1>
      {asset &&
        <React.Fragment>
          <img src={asset.image_url} />
          <h2>{asset.name}</h2>
          <p>{asset.description}</p>
          <a className={cx('permalink')} href={asset.permalink} target="_blank">Permalink</a>
        </React.Fragment>
      }
      {loading && <div>Loading...</div>}
    </div>
  )
}

export default AssetPage;