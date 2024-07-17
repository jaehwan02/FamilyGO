// 지도를 표시할 div와 옵션을 설정합니다
var mapContainer = document.getElementById('map'),
  mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 지도에 기본 마커를 표시합니다
var marker = new kakao.maps.Marker({
  map: map,
  position: new kakao.maps.LatLng(33.450701, 126.570667),
});

// 검색 버튼 클릭 이벤트를 추가합니다
document.getElementById('search-button').addEventListener('click', function () {
  var searchValue = document.getElementById('search-input').value;
  if (!searchValue.trim()) {
    alert('검색어를 입력하세요.');
    return;
  }

  geocoder.addressSearch(searchValue, function (result, status) {
    // 검색이 정상적으로 완료되었을 경우
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 기존 마커를 제거합니다
      marker.setMap(null);

      // 결과값으로 받은 위치에 마커를 표시합니다
      marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    } else {
      alert('검색 결과가 없습니다.');
    }
  });
});
