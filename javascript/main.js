var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(35.1888, 128.9035), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var marker = new kakao.maps.Marker({
  map: map,
  position: new kakao.maps.LatLng(35.1888, 128.9035),
});

marker.setMap(map);

var customOverlayContent = `
<div class="modal">
<img src="png/bssm2.png" id="bssm2">
<a href="upload.html" id="plus"><button id="bssm-button">+</button></a>
<div popover id="my-popover">사진 업로드 하러 가기!</div>
</div>
`;

var position = new kakao.maps.LatLng(35.1888, 128.9035);

var customOverlay = new kakao.maps.CustomOverlay({
  map: map,
  position: position,
  content: customOverlayContent,
  yAnchor: 1,
});

// marker.setPosition()

// kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
//   // 클릭한 위치의 좌표를 가져옵니다.
//   var latlng = mouseEvent.latLng;
//   console.log(latlng);
//   const 위도 = latlng.getLat();
//   const 경도 = latlng.getLng();

//   marker.setPosition(latlng);

//   showInfoDiv(latlng, '위도: ' + latlng.getLat() + '<br>경도: ' + latlng.getLng());
// });

function showInfoDiv(latlng, content) {
  var proj = map.getProjection(); // 지도 투영 객체를 가져옵니다.
  var point = proj.pointFromCoords(latlng); // 좌표를 픽셀 좌표로 변환합니다.

  infoDiv.innerHTML = content; // 정보 창의 내용을 설정합니다.
  infoDiv.style.left = point.x + mapContainer.offsetLeft + 'px';
  infoDiv.style.top = point.y + mapContainer.offsetTop + 'px';
  infoDiv.style.display = 'block'; // 정보 창을 보이게 합니다.
}

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch(coordinate, function (result, status) {
  // 정상적으로 검색이 완료됐으면
  if (status === kakao.maps.services.Status.OK) {
    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    // 인포윈도우로 장소에 대한 설명을 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
    });
    infowindow.open(map, marker);

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);
  }
});

var coordinate;

document.getElementById('search-button').onclick(() => {
  coordinate = document.getElementById('search-input');
});

var bDisplay = true;
function doDisplay() {
  var con = document.getElementById('myDIV');
  if (con.style.display == 'none') {
    con.style.display = 'block';
  } else {
    con.style.display = 'none';
  }
}

// 초기 로드 시 점수를 로컬 스토리지에서 불러오기
document.addEventListener('DOMContentLoaded', () => {
  let score = localStorage.getItem('score') || 0;
  document.getElementById('real-coin').innerText = score;
});

// 점수 업데이트 함수
function updateScore(points) {
  let score = parseInt(localStorage.getItem('score')) || 0;
  score += points;
  localStorage.setItem('score', score);
  document.getElementById('real-coin').innerText = score;
}
