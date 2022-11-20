let paper = document.getElementById('paper'),
  ctx = paper.getContext('2d'),
  w = 500,
  h = 500,
  prevX = 0,
  prevY = 0,
  currX = 0,
  currY = 0,
  isMouseDown = false,
  color = '#000000',
  strokeSize = 2;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, w, h);

paper.addEventListener('mousemove', (e) => {
  setPosition('move', e)
}, false);

paper.addEventListener('mousedown', (e) => {
  setPosition('down', e)
}, false);

paper.addEventListener('mouseup', (e) => {
  setPosition('up', e)
}, false);

paper.addEventListener('mouseout', (e) => {
  setPosition('out', e)
}, false);

const drawLine = () => {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = color;
  ctx.lineWidth = strokeSize;
  ctx.stroke();
  ctx.closePath();
}

const setPosition = (type, e) => {
  switch (type) {
    case 'down':
      prevX = currX;
      prevY = currY;
      currX = e.clientX - paper.offsetLeft;
      currY = e.clientY - paper.offsetTop;
      isMouseDown = true;
      break;
    case 'up':
    case 'out':
      isMouseDown = false;
      break;
    case 'move':
      if (isMouseDown) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - paper.offsetLeft;
        currY = e.clientY - paper.offsetTop;
        drawLine();
      }
      break;
    default:
      break;
  }
}

const setColor = (hex) => color = hex;

const setStroke = (size) => strokeSize = size;

const clearAll = () => {
  if (confirm('Are you sure?')) {
    ctx.clearRect(0, 0, w, h);
  }
}

const save = () => {
  let data = paper.toDataURL('image/png');
  let link = document.createElement('a');
  link.href = data;
  link.download = 'jPaint.png';
  link.click();
}
