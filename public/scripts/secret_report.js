var spyImage = document.createElement('img');
spyImage.src = '/images/spy.png';
spyImage.className = 'spy-image';
spyImage.style.marginTop = '100px';

var message = document.createElement('div');
message.textContent = 'Secret Report Page';
message.className = 'secret-message';

var container = document.querySelector('.container');
container.appendChild(message);
container.appendChild(spyImage);

spyImage.style.position = 'fixed';
spyImage.style.top = '0';
spyImage.style.left = '0';
spyImage.style.width = '100%';

var isMobile = window.matchMedia('(max-width: 768px)').matches;

if (isMobile) {
  spyImage.style.width = '50%';
} else {
  spyImage.style.width = '30%';
}

setTimeout(function () {
  container.removeChild(spyImage);
  container.removeChild(message);
}, 3000);
