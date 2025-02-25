function initbg() {
  const gridContainer = document.querySelector('.grid-bg');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const gridSize = Math.ceil((screenWidth * screenHeight) / 2500);
  const gridItems = [];
  const hexcolors = [
    '#4B0082',
    '#483D8B',
    '#8A2BE2',
    '#9400D3',
    '#9932CC',
    '#8B008B',
    '#800080',
    '#9370DB',
    '#7B68EE',
    '#6A5ACD',
    '#200054'
  ];

  for (let i = 0; i < gridSize; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
    gridItems.push(gridItem);
  }

  function AutoBG(hexcolors){
    const gridItems = document.querySelectorAll('.grid-item');
    setInterval(() => {
      const randomTile = gridItems[Math.floor(Math.random() * gridItems.length)];
      const randomColor = hexcolors[Math.floor(Math.random() * hexcolors.length)];
      randomTile.style.backgroundColor = randomColor;
    }, 450);  
  }

  if (isMobile()) {
    AutoBG(hexcolors);
  } else {
    document.addEventListener('mousemove', (event) => handleMouseMove(event, hexcolors));
  }
}

function handleMouseMove(event, hexcolors) {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((gridItem) => {
  const isMouseOver = isMouseOverElement(event, gridItem);
    if (isMouseOver) {
      const randomColor = hexcolors[Math.floor(Math.random() * hexcolors.length)];
      gridItem.style.backgroundColor = randomColor;
    }
  });
}

function isMouseOverElement(event, element) {
  const rect = element.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}

document.addEventListener('DOMContentLoaded', initbg);