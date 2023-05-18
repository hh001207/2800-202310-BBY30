// 이미지 요소 생성
var spyImage = document.createElement('img');
spyImage.src = '/images/spy.png';
spyImage.className = 'spy-image';
spyImage.style.width = '50%';
spyImage.style.marginTop = '100px';

// 메시지 요소 생성
var message = document.createElement('div');
message.textContent = 'Secret Report Page';
message.className = 'secret-message';

// 컨테이너 요소에 메시지와 이미지 추가 (순서 변경)
var container = document.querySelector('.container');
container.appendChild(message);
container.appendChild(spyImage);

// 이미지를 화면 전체에 맞추기
spyImage.style.position = 'fixed';
spyImage.style.top = '0';
spyImage.style.left = '0';
spyImage.style.width = '100%';

// 일정 시간 후에 이미지와 메시지 제거
setTimeout(function () {
  container.removeChild(spyImage);
  container.removeChild(message);
}, 3000);
