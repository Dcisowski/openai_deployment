cloud_run_backend_url = "https://openai-backend-service-908601642528.us-central1.run.app"

const openingMessages = [
    "Cześć! Jak mogę Ci dzisiaj pomóc?",
    "Witaj! Czego potrzebujesz?",
    "Dzień dobry! W czym mogę Ci służyć?",
    "Hej! Jestem tu, żeby pomóc. Co mogę dla Ciebie zrobić?",
    "Cześć! Jakie masz pytanie?"
];

const closingMessages = [
    "Mam nadzieję, że mogłem pomóc! Miłego dnia!",
    "Dziękuję za rozmowę. Do zobaczenia!",
    "To wszystko na dziś. Jeśli masz kolejne pytania, jestem tutaj!",
    "Dziękuję za kontakt! Powodzenia w dalszej pracy!",
    "Miło było Ci pomóc. Do następnego razu!"
];


function getRandomOpeningMessage() {
    const randomIndex = Math.floor(Math.random() * openingMessages.length);
    return openingMessages[randomIndex];
}

// Funkcja do losowego wyboru zamknięcia rozmowy
function getRandomClosingMessage() {
    const randomIndex = Math.floor(Math.random() * closingMessages.length);
    return closingMessages[randomIndex];
}

// Funkcja wysyłania wiadomości
async function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    const messagesDiv = document.getElementById('messages');

    // Dodanie wiadomości użytkownika do interfejsu
    const userMessageParagraph = document.createElement('p');
    userMessageParagraph.textContent = 'Ty: ' + userMessage;
    messagesDiv.appendChild(userMessageParagraph);

    // Wysłanie wiadomości do backendu
    const response = await fetch(`${cloud_run_backend_url}/send_message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const assistantMessage = data.response;

    // Dodanie odpowiedzi asystenta do interfejsu
    const assistantMessageParagraph = document.createElement('p');
    assistantMessageParagraph.textContent = 'Asystent: ' + assistantMessage;
    messagesDiv.appendChild(assistantMessageParagraph);

    // Wyczyść pole tekstowe
    document.getElementById('userMessage').value = '';
}

// Funkcja inicjująca otwarcie rozmowy
function startConversation() {
    const messagesDiv = document.getElementById('messages');
    const openingMessage = getRandomOpeningMessage();

    const assistantMessageParagraph = document.createElement('p');
    assistantMessageParagraph.textContent = 'Asystent: ' + openingMessage;
    messagesDiv.appendChild(assistantMessageParagraph);
}

// Funkcja zamykająca rozmowę
function endConversation() {
    const messagesDiv = document.getElementById('messages');
    const closingMessage = getRandomClosingMessage();

    const assistantMessageParagraph = document.createElement('p');
    assistantMessageParagraph.textContent = 'Asystent: ' + closingMessage;
    messagesDiv.appendChild(assistantMessageParagraph);
}

// Inicjalizacja otwarcia rozmowy przy ładowaniu strony
window.onload = function() {
    startConversation();
};
