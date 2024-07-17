function loadFile(input) {
  let file = input.files[0]; // 선택된 파일 가져오기

  let newImage = document.createElement('img'); //새 이미지 추가

  //이미지 source 가져오기
  newImage.src = URL.createObjectURL(file);
  newImage.id = 'img-id';
  newImage.style.width = '100%';
  newImage.style.height = '100%';
  newImage.style.objectFit = 'cover';

  //이미지를 image-show div에 추가
  let container = document.getElementById('image-show');
  container.appendChild(newImage);
}