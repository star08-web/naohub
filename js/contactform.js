// URL del Cloudflare Worker
const WORKER_URL = "https://naohub-messaggi.star08-web.workers.dev";

// Seleziona il form di contatto
const contactForm = document.getElementById("cform");

// Gestione dell'invio del form
contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Disabilita il pulsante di invio per prevenire invii multipli
    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";
    
    // Raccogli i dati dal form
    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
    };
    
    try {
        // Invia i dati al Cloudflare Worker
        const response = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        
        // Analizza la risposta JSON
        const result = await response.json();
        
        if (response.ok) {
            // Caso di successo
            spawnnotify("Messaggio inviato con successo", "success");
            contactForm.reset();
        } else {
            // Gestione errori con dettagli
            if (result.errors && Array.isArray(result.errors)) {
                // Mostra tutti gli errori di validazione
                result.errors.forEach(error => {
                    spawnnotify(error, "error");
                });
            } else {
                // Errore generico
                spawnnotify(result.message || "Errore nell'invio del messaggio", "error");
            }
        }
    } catch (error) {
        // Errori di rete o altri errori
        console.error("Errore durante l'invio:", error);
        spawnnotify("Impossibile contattare il server. Riprova più tardi.", "error");
    } finally {
        // Riabilita il pulsante di invio in ogni caso
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Funzione per la validazione lato client (opzionale ma consigliata)
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    let isValid = true;
    
    // Verifica nome
    if (name === "") {
        spawnnotify("Il nome è obbligatorio", "error");
        isValid = false;
    } else if (name.length < 2) {
        spawnnotify("Il nome deve contenere almeno 2 caratteri", "error");
        isValid = false;
    }
    
    // Verifica email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        spawnnotify("L'email è obbligatoria", "error");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        spawnnotify("Inserisci un indirizzo email valido", "error");
        isValid = false;
    }
    
    // Verifica oggetto
    if (subject === "") {
        spawnnotify("L'oggetto è obbligatorio", "error");
        isValid = false;
    } else if (subject.length < 3) {
        spawnnotify("L'oggetto deve contenere almeno 3 caratteri", "error");
        isValid = false;
    }
    
    // Verifica messaggio
    if (message === "") {
        spawnnotify("Il messaggio è obbligatorio", "error");
        isValid = false;
    } else if (message.length < 10) {
        spawnnotify("Il messaggio deve contenere almeno 10 caratteri", "error");
        isValid = false;
    }
    
    return isValid;
}
