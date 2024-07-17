// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = './my_model/';

let model, image, labelContainer, maxPredictions;
let imglist = [];

let flag = 1;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  // load the model and metadata
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  console.log(model);
  labelContainer = document.getElementById('label-container');
  if (flag == 1) {
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement('div'));
    }
  }
}

async function filePredict(files) {
  await init();
  imglist = [];
  for (i of files) {
    const aa = await createImageBitmap(i);
    imglist.push(aa);
  }

  for (i of imglist) {
    const a = await model.predict(i);
    document.getElementById('percent').innerHTML = a[0].probability;
    console.log(a);
  }
}

// run the webcam image through the image model
async function predict() {
  var image = document.querySelector('li img');
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(image, false);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}
function getImageFiles(e) {
  const uploadFiles = [];
  const files = e.currentTarget.files;
  const imagePreview = document.querySelector('.image-preview');
  const docFrag = new DocumentFragment();

  if ([...files].length >= 7) {
    alert('이미지는 최대 6개 까지 업로드가 가능합니다.');
    return;
  }
  // 파일 타입 검사
  [...files].forEach((file) => {
    if (!file.type.match('image/.*')) {
      alert('이미지 파일만 업로드가 가능합니다.');
      return;
    }

    // 파일 갯수 검사
    if ([...files].length < 7) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = createElement(e, file);
        imagePreview.appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  });
}

function createElement(e, file) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.setAttribute('src', e.target.result);
  img.setAttribute('data-file', file.name);
  li.appendChild(img);

  return li;
}

const realUpload = document.querySelector('.real-upload');
const upload = document.querySelector('.upload');

upload.addEventListener('click', () => realUpload.click());

realUpload.addEventListener('change', getImageFiles);
