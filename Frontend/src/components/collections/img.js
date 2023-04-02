import React from "react";
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';

const get = async (url) => {
  try {
    const response = await fetch(
      "https://mimicker.thbscoetg.com/api/v1/collectionImage/" + url,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
        },
      }
    );
    const blob = await response.blob();
    return [URL.createObjectURL(blob), null];
  } catch (error) {
    console.error(`get: error occurred ${error}`);
    return [null, error];
  }
};

const Image = (props) => {
  const url = props.collection_id;
  const [collectionimage, setcollectionimage] = useState('');

  async function fetchData() {
    // You can await here
    const [response, error] = await get(url);
    if (error) console.log(error);
    else {
      console.log(`got response ${response}`);
      setcollectionimage(response);
    }
  }

  useEffect(() => {
    fetchData()
    console.log('useffect is called');
  }, [url])


  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card.Img
        variant="top"
        style={{ width: "300px", height: "150px", borderRadius: "0%" }}
        src={collectionimage}
        alt="collection image"
      />
    </div>
  );
};

export default Image;
