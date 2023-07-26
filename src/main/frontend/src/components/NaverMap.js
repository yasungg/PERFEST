import React, { useContext, useEffect, useState } from "react";
import FestivalAPI from "../api/FestivalAPI";
import { UserContext } from "../context/UserStore";

const { naver } = window;
const { number } = window;

const NaverMap = () => {
  const [map, setMap] = useState(null);
  const { contextLongitude, contextLatitude, centerLatitude, centerLongitude } =
    useContext(UserContext);

  useEffect(() => {
    const markers = [];
    const mapElement = document.getElementById("map");
    // 페스티벌 정보가 담긴 카드가 클릭되었을 때 좌표가 넘어와 자동으로 해당 위치 마커로 지도 포커스를 이동
    const options = {
      center: centerLatitude
        ? new naver.maps.LatLng(centerLatitude, centerLongitude)
        : new naver.maps.LatLng(37.497914, 127.027646),
      zoom: 15,
    };
    const navermap = new naver.maps.Map(mapElement, options);
    setMap(navermap);

    var HOME_PATH = window.HOME_PATH || ".";

    //검색 결과가 들어온 만큼 마커를 찍어줌
    for (let i = 0; i < contextLatitude.length; i++) {
      const markerOptions = {
        position: new naver.maps.LatLng(
          contextLatitude[i],
          contextLongitude[i]
        ),
        map: navermap,
        icon: {
          url:
            process.env.PUBLIC_URL +
            "/images/perfesta-marker_preview_rev_1.png",
          size: new naver.maps.Size(40, 42),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 50),
        },
      };

      const marker = new naver.maps.Marker(markerOptions);
      markers.push(marker);
      console.log("marker에 위치정보 전달 성공!!");
    }
  }, [centerLatitude, contextLatitude, contextLongitude]);

  // 	const [myLocation, setMyLocation] = useState<
  // 		{ latitude: number, longitude: number } | 'string'
  // 	>("");

  // 	// 현재 위치 받아오기
  // 	useEffect(() => {
  // 		if(navigator.geolocation) {
  // 			navigator.geolocation.getCurrentPosition((position) => {
  // 				setMyLocation({
  // 					latitude: position.coords.latitude,
  // 					longitude: position.coords.longitude
  // 				});
  // 			});
  // 		} else {
  // 			window.alert("현재 위치를 알 수 없습니다.")
  // 		}
  // 	}, []);

  // 	useEffect(() => {
  // 		if(typeof myLocation !== "string") {
  // 			const currentPosition = [myLocation.latitude, myLocation.longitude];

  // 			const map = new naver.maps.Map("map", {
  // 				center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  // 				zoomControl: true
  // 			});
  // 		}
  // 	}, [myLocation]);

  // // 내 위치 마커 표시하기
  // useEffect(() => {
  // 	if (typeof myLocation !== "string") {
  // 		const currentPosition = [myLocation.latitude, myLocation.longitude];

  // 		const map = new naver.maps.Map("map", {
  // 				center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  // 				zoomControl: true,
  // 		});
  // 			const currentMarker = new naver.maps.Marker({
  // 				position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  // 				map,
  // 				// 원하는 이미지로 마커 커스텀
  // 				// icon: {
  // 				//     url: pinImage,
  // 				//     size: new naver.maps.Size(50, 52),
  // 				//     origin: new naver.maps.Point(0, 0),
  // 				//     anchor: new naver.maps.Point(25, 26),
  // 				//   },
  // 			});
  // 		}
  // 	}, [myLocation]);

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
