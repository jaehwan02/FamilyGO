// 초기 로드 시 점수를 로컬 스토리지에서 불러오기
document.addEventListener('DOMContentLoaded', () => {
  let score = localStorage.getItem('score') || 0;
  document.querySelectorAll('.real-coin').forEach((el) => (el.innerText = score));

  // 이전 점수를 가져와 비교
  let previousScore = localStorage.getItem('previousScore') || 0;
  let gainedPoints = score - previousScore;

  // 이전 점수를 현재 점수로 업데이트
  localStorage.setItem('previousScore', score);

  // 점수가 증가했을 경우 토스트 메시지로 알림
  if (gainedPoints > 0) {
    showToastMessage(`축하합니다! ${gainedPoints}점을 얻었습니다.`);
  }
});

// 점수 업데이트 함수
function updateScore(points) {
  let score = parseInt(localStorage.getItem('score')) || 0;
  score += points;
  localStorage.setItem('score', score);
  document.querySelectorAll('.real-coin').forEach((el) => (el.innerText = score));
}

// 점수 초기화 함수
function resetScore() {
  localStorage.setItem('score', 0);
  document.querySelectorAll('.real-coin').forEach((el) => (el.innerText = 0));
  showToastMessage('점수가 초기화되었습니다.');
}

// 전역 함수로 업데이트 함수 설정
window.updateScore = updateScore;
window.resetScore = resetScore;

// 토스트 메시지 함수
function showToastMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.className += ' show';
  }, 100);
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
    document.body.removeChild(toast);
  }, 3000);
}

// 검색 버튼 클릭 이벤트 핸들러
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-button').addEventListener('click', resetScore);
});
