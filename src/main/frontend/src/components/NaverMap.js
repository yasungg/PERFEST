import React, { useContext, useEffect, useState } from "react";
import FestivalAPI from "../api/FestivalAPI";
import { UserContext } from "../context/UserStore";
import CustomInfoWindow from "./CustomInfoWindow";
import ReactDOMServer from "react-dom/server";

const { naver } = window;
const { number } = window;

const NaverMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState([]);
  const {
    contextLongitude,
    contextLatitude,
    centerLatitude,
    centerLongitude,
    contextFstvlNm,
    contextFstvlLike,
  } = useContext(UserContext);

  useEffect(() => {
    const markers = [];
    const infoWindows = [];
    // 페스티벌 정보가 담긴 카드가 클릭되었을 때 좌표가 넘어와 자동으로 해당 위치 마커로 지도 포커스를 이동
    const options = {
      center: centerLatitude
        ? new naver.maps.LatLng(centerLatitude, centerLongitude)
        : new naver.maps.LatLng(37.497914, 127.027646),
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    };
    const map = new naver.maps.Map("map", options);
    setMap(map);

    // 맵 컨트롤러
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
    };
    if (window.matchMedia("(max-width: 1024px)").matches) {
      mapOptions.zoomControl = false;
    }
    map.setOptions(mapOptions);

    const handleResize = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        mapOptions.zoomControl = false;
      } else {
        mapOptions.zoomControl = true;
      }
      map.setOptions(mapOptions);
    };

    window.addEventListener("resize", handleResize);

    //검색 결과가 들어온 만큼 마커를 찍어줌
    for (let i = 0; i < contextLatitude.length; i++) {
      const markerOptions = {
        position: new naver.maps.LatLng(
          parseFloat(contextLatitude[i]),
          parseFloat(contextLongitude[i])
        ),
        map: map,
        icon: {
          url:
            process.env.PUBLIC_URL +
            "/images/perfesta-marker_preview_rev_1.png",
          size: new naver.maps.Size(39, 45),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(23, 50),
        },
      };

      const marker = new naver.maps.Marker(markerOptions);
      markers.push(marker);

      // 마커 클릭 시 정보창 펼침
      const infoWindowContent = ReactDOMServer.renderToString(
        <CustomInfoWindow
          title={contextFstvlNm[i]}
          likeCount={contextFstvlLike[i]}
        />
      );
      const infoWindow = new naver.maps.InfoWindow({
        content: infoWindowContent,
        maxWidth: 140,
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 5,
        anchorSkew: false,
        anchorColor: "transparent",
        pixelOffset: new naver.maps.Point(32, 24),
      });

      naver.maps.Event.addListener(marker, "click", function (e) {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
      infoWindows.push(infoWindow);
    }
    setMarker(markers);
    setInfoWindow(infoWindows);
    return() => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, [centerLatitude, contextLatitude, contextLongitude, contextFstvlNm]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};
export default NaverMap;
