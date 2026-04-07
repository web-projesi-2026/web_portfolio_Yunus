// Hamburger Menü Kontrolü
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Hamburger animasyonu
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// AI Chatbot Kontrolü
const chatToggle = document.getElementById('ai-chat-toggle');
const chatContainer = document.getElementById('ai-chat-container');
const closeChat = document.getElementById('close-chat');
const sendAi = document.getElementById('send-ai');
const aiInput = document.getElementById('ai-input');
const aiBody = document.getElementById('ai-chat-body');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
}

const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'ai' ? 'ai-message' : 'user-message';
    msgDiv.textContent = text;
    aiBody.appendChild(msgDiv);
    aiBody.scrollTop = aiBody.scrollHeight;
};

const handleAiResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = "Anlayamadım, lütfen tekrar eder misiniz?";

    if (input.includes("merhaba") || input.includes("selam")) {
        response = "Merhaba! Size nasıl yardımcı olabilirim?";
    } else if (input.includes("proje") || input.includes("neler yaptın")) {
        response = "Yunus'un yaptığı projeleri 'Projeler' sayfasında görebilirsiniz. Özellikle E-Ticaret projesi oldukça kapsamlıdır.";
    } else if (input.includes("kim") || input.includes("yunus kim")) {
        response = "Yunus Barış, Kırşehir Ahi Evran Üniversitesi'nde Bilgisayar Programcılığı okuyan tutkulu bir geliştiricidir.";
    } else if (input.includes("iletişim") || input.includes("ulaş")) {
        response = "Yunus'a iletişim sayfasındaki formdan veya LinkedIn üzerinden ulaşabilirsiniz.";
    } else if (input.includes("beceri") || input.includes("ne biliyor")) {
        response = "Yunus; HTML, CSS, JS, PHP ve C# gibi dillerde yetkindir.";
    }

    setTimeout(() => addMessage(response, 'ai'), 500);
};

if (sendAi) {
    sendAi.addEventListener('click', () => {
        const text = aiInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            aiInput.value = '';
            handleAiResponse(text);
        }
    });

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAi.click();
    });
}

// Proje Kartı Parlama Efekti
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const glow = card.querySelector('.project-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(230, 57, 70, 0.15), transparent 60%)`;
        }
    });
});
