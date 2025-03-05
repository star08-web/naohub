document.addEventListener("DOMContentLoaded", () => {
    const ball = document.createElement("img");
    ball.src = "img/palla.png";
    ball.style.position = "absolute";
    ball.style.width = "80px";
    ball.style.height = "80px";
    ball.style.left = "30%";
    ball.style.top = "100%";
    ball.style.transform = "translate(-50%, -50%)";
    ball.style.cursor = "grab";
    ball.style.zIndex = "1000";
    document.body.appendChild(ball);

    let isDragging = false;
    let offsetX, offsetY, velocityX = 0, velocityY = 0;
    let lastX, lastY;
    let animationFrameId = null;
    
    function moveBall(x, y) {
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
    }

    function onMouseDown(e) {
        // Interrompe qualsiasi animazione in corso
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        isDragging = true;
        offsetX = e.clientX - ball.offsetLeft;
        offsetY = e.clientY - ball.offsetTop;
        lastX = e.clientX;
        lastY = e.clientY;
        ball.style.cursor = "grabbing";
    }

    function onMouseMove(e) {
        if (isDragging) {
            moveBall(e.clientX - offsetX, e.clientY - offsetY);
            velocityX = e.clientX - lastX;
            velocityY = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    }

    function onMouseUp() {
        isDragging = false;
        ball.style.cursor = "grab";
        applyPhysics();
    }

    function applyPhysics() {
        const gravity = 0.5;
        const friction = 0.98;
        const bounce = 0.7;
        let isResting = false;

        function animate() {
            if (!isDragging) {
                let x = ball.offsetLeft + velocityX;
                let y = ball.offsetTop + velocityY;

                velocityX *= friction; // Attrito
                velocityY *= friction;
                velocityY += gravity; // Gravità

                // Rimbalzo laterale
                if (x < 0) {
                    velocityX *= -bounce;
                    x = 0;
                } else if (x + ball.clientWidth > window.innerWidth) {
                    velocityX *= -bounce;
                    x = window.innerWidth - ball.clientWidth;
                }
                
                // Rimbalzo dal pavimento
                if (y + ball.clientHeight > window.innerHeight) {
                    if (Math.abs(velocityY) < 2) {
                        velocityY = 0;
                        y = window.innerHeight - ball.clientHeight;
                        
                        // Se la palla è quasi ferma sul pavimento, riduci rapidamente la velocità orizzontale
                        velocityX *= 0.8;
                        
                        if (Math.abs(velocityX) < 0.5) {
                            velocityX = 0;
                            isResting = true;
                        }
                    } else {
                        velocityY *= -bounce;
                        y = window.innerHeight - ball.clientHeight;
                        velocityX *= 0.9; // Più attrito al rimbalzo
                    }
                }

                moveBall(x, y);
            }
            
            // Continua l'animazione finché la palla non è "a riposo"
            if (!isResting || Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    ball.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    ball.addEventListener("touchstart", (e) => {
        e.preventDefault();
        onMouseDown(e.touches[0]);
    });
    document.addEventListener("touchmove", (e) => {
        e.preventDefault();
        onMouseMove(e.touches[0]);
    });
    document.addEventListener("touchend", (e) => {
        e.preventDefault();
        onMouseUp();
    });
    
    // Inizia con la palla che cade
    applyPhysics();
});
