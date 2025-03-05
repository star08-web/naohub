function initbg() {
  const gridContainer = document.querySelector('.grid-bg');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const gridSize = Math.ceil((screenWidth * screenHeight) / 2500);
  const gridItems = [];
  const hexcolors = [
    '#001F3F', 
    '#003366', 
    '#004080', 
    '#0066CC', 
    '#0080FF', 
    '#1E90FF', 
    '#4169E1', 
    '#6495ED', 
    '#87CEEB', 
    '#ADD8E6', 
    '#B0E0E6', 
    '#E0FFFF'
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