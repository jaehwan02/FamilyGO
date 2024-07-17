let selectedIndex = -1; // 선택된 썸네일의 인덱스
let model, labelContainer, maxPredictions;
const MODEL_URL = './my_model/';
const imglist = [];
const classIndices = [0, 2, 3, 4, 5]; // 각 썸네일에 대한 클래스 인덱스

async function init() {
  const modelURL = MODEL_URL + 'model.json';
  const metadataURL = MODEL_URL + 'metadata.json';

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  labelContainer = document.getElementById('label-container');
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement('div'));
  }
}

async function loadAndPredict(input) {
  await init();
  const files = input.files;
  imglist.length = 0; // 초기화

  for (let file of files) {
    const img = await createImageBitmap(file);
    imglist.push(img);
  }

  displayUploadedImage(input.files[0]);

  if (selectedIndex >= 0) {
    await predict(imglist[0]); // 파일 업로드 후 첫 번째 이미지를 예측
  }
}

function displayUploadedImage(file) {
  let newImage = document.createElement('img');
  newImage.src = URL.createObjectURL(file);
  newImage.style.width = '100%';
  newImage.style.height = '100%';
  newImage.style.objectFit = 'cover';
  let container = document.getElementById('image-show-upload');
  container.innerHTML = '';
  container.appendChild(newImage);
}

function selectThumbnail(index) {
  selectedIndex = index;
  displayThumbnailImage(index);
  if (imglist.length > 0) {
    predict(imglist[0]); // 썸네일 선택 시 첫 번째 업로드된 파일을 예측
  }
}

function displayThumbnailImage(index) {
  let container = document.getElementById('image-show-thumbnail');
  container.innerHTML = '';
  let newImage = document.createElement('img');
  newImage.src = document.querySelectorAll('.thumbnail img')[index].src;
  newImage.style.width = '100%';
  newImage.style.height = '100%';
  newImage.style.objectFit = 'cover';
  container.appendChild(newImage);
}

async function predict(img) {
  const predictions = await model.predict(img);
  const classIndex = classIndices[selectedIndex]; // 선택된 썸네일에 대한 클래스 인덱스
  const probability = (predictions[classIndex].probability * 100).toFixed(2);
  updateProgressBar(probability);
  showToastMessage(probability);

  if (probability >= 80) {
    // 일치율이 80% 이상일 경우 점수 추가
    updateScore(1000);
  }
}

function updateProgressBar(percentage) {
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = percentage + '%';
  progressBar.innerText = percentage + '%';

  if (percentage < 50) {
    progressBar.style.backgroundColor = 'red';
  } else if (percentage < 80) {
    progressBar.style.backgroundColor = 'yellow';
    progressBar.style.color = 'black'; // 글씨가 잘 보이도록
  } else {
    progressBar.style.backgroundColor = 'green';
  }
}

function showToastMessage(percentage) {
  const toast = document.getElementById('toast');
  const desc = document.getElementById('desc');

  if (percentage >= 80) {
    toast.style.backgroundColor = 'rgb(39, 174, 96)';
    desc.innerText = '축하드립니다! 일치율이 80%를 넘었습니다.';
  } else {
    toast.style.backgroundColor = 'rgb(231, 76, 60)';
    desc.innerText = '아쉬워요 다시 한 번 찍어보는건 어때요?';
  }

  toast.className = 'toast show';
  setTimeout(function () {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}

// 점수 업데이트 함수
function updateScore(points) {
  let score = parseInt(localStorage.getItem('score')) || 0;
  score += points;
  localStorage.setItem('score', score);
  parent.document.querySelectorAll('.real-coin').forEach((el) => (el.innerText = score));
}
