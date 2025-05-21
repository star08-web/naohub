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

  // Check if we have stored colors from previous sessions
  let storedColors = localStorage.getItem('gridColors');
  const coloredTiles = storedColors ? JSON.parse(storedColors) : {};

  for (let i = 0; i < gridSize; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.dataset.index = i; // Add index for identification
    
    // Apply stored color if available
    if (coloredTiles[i]) {
      gridItem.style.backgroundColor = coloredTiles[i];
    }
    
    gridContainer.appendChild(gridItem);
    gridItems.push(gridItem);
  }

  function AutoBG(hexcolors) {
    const gridItems = document.querySelectorAll('.grid-item');
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * gridItems.length);
      const randomTile = gridItems[randomIndex];
      const randomColor = hexcolors[Math.floor(Math.random() * hexcolors.length)];
      
      // Update the tile color
      randomTile.style.backgroundColor = randomColor;
      
      // Save the color to our storage object
      coloredTiles[randomTile.dataset.index] = randomColor;
      
      // Update local storage
      localStorage.setItem('gridColors', JSON.stringify(coloredTiles));
    }, 450);  
  }

  function handleMouseMove(event, hexcolors) {
    gridItems.forEach((gridItem) => {
      const isMouseOver = isMouseOverElement(event, gridItem);
      if (isMouseOver) {
        const randomColor = hexcolors[Math.floor(Math.random() * hexcolors.length)];
        
        // Update the tile color
        gridItem.style.backgroundColor = randomColor;
        
        // Save the color to our storage object
        coloredTiles[gridItem.dataset.index] = randomColor;
        
        // Update local storage
        localStorage.setItem('gridColors', JSON.stringify(coloredTiles));
      }
    });
  }

  if (isMobile()) {
    AutoBG(hexcolors);
  } else {
    document.addEventListener('mousemove', (event) => handleMouseMove(event, hexcolors));
  }
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