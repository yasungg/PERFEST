// import React, { useEffect, useState } from "react";

// const { kakao } = window;

// const KakaoMap = () => {
//   const [map,setMap] = useState(null);

//   //처음 지도 그리기
//   useEffect(()=>{
//       const container = document.getElementById('map');
//       const options = { center: new kakao.maps.LatLng(37.497914, 127.027646), level : 5 };
//       const kakaoMap = new kakao.maps.Map(container, options);
//       setMap(kakaoMap);
//   },[])

//   return (
//       <div
//           style={{
//               width: '100%',
//               height: '100%',
//               // display: 'inline-block',
//               // marginLeft: '5px',
//               // marginRight: '5px',
//           }}
//       >
//           <div id="map" style={{ width: '100%', height: '100%' }}></div>
//       </div>
//   );
// };
// export default KakaoMap;