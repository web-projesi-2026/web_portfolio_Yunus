// ÖZEL İMLEÇ KONTROLÜ
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

if (cursor && trail) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Takip eden iz için hafif gecikme
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        }, 50);
    });

    // Tıklanabilir öğelerde imleç büyümesi
    const links = document.querySelectorAll('a, button, .skill-card, .project-card, .tool-badge, .interest-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.backgroundColor = 'rgba(230, 57, 70, 0.5)';
            trail.style.transform = 'scale(0.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = '#e63946';
            trail.style.transform = 'scale(1)';
        });
    });
}

// HAMBURGER MENÜ KONTROLÜ
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
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

// AI CHATBOT KONTROLÜ
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
    let response = "Bunu tam olarak anlayamadım ama Yunus'un yetenekleri ve projeleri hakkında size bilgi verebilirim!";

    if (input.includes("merhaba") || input.includes("selam")) {
        response = "Merhaba! Ben Yunus'un dijital asistanıyım. Portfolyo hakkında neyi merak ediyorsunuz?";
    } else if (input.includes("proje")) {
        response = "Yunus'un 'E-Ticaret Sitesi' projesi oldukça kapsamlıdır. Detayları Projeler sayfasında bulabilirsiniz.";
    } else if (input.includes("beceri") || input.includes("yetenek")) {
        response = "Yunus; HTML, CSS, JavaScript, PHP ve C# konularında uzmandır. Beceriler sayfasından tüm detaylara bakabilirsiniz.";
    } else if (input.includes("iletişim") || input.includes("ulaş")) {
        response = "Yunus'a İletişim sayfasındaki formdan veya LinkedIn üzerinden ulaşabilirsiniz.";
    } else if (input.includes("hakkında") || input.includes("kim")) {
        response = "Yunus Barış, Kırşehir Ahi Evran Üniversitesi Bilgisayar Programcılığı öğrencisidir. Kod yazmayı bir sanat olarak görür!";
    } else if (input.includes("eğitim") || input.includes("okul") || input.includes("üniversite")) {
        response = "Yunus, Kırşehir Ahi Evran Üniversitesi'nde Bilgisayar Programcılığı okumaktadır.";
    }

    setTimeout(() => addMessage(response, 'ai'), 600);
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
    aiInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendAi.click(); });
}

/* ============================================
   MERKEZİ PARLAMA (GLOW) EFEKTİ YÖNETİCİSİ
   ============================================ */
const updateGlow = (e) => {
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
};
document.addEventListener('mousemove', updateGlow);

/* --- YUNUS BARIŞ PORTFOLYO ETKİLEŞİM PAKETİ --- */
(function() {
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    };
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1000); 

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && triggers.length > 0) {
        triggers.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        const closeBtn = document.querySelector('.close-button');
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        closeBtn?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }
})();

/* ============================================
   MODERN FORMSPREE YÖNETİMİ & BİLDİRİMLER
   ============================================ */
const contactForm = document.getElementById('contact-form');

// Şık Bildirim Fonksiyonu (Toast)
const showNotification = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 15px 25px; 
        background: ${type === 'success' ? '#2ecc71' : '#e63946'};
        color: white; border-radius: 10px; z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); font-family: sans-serif;
        transform: translateX(120%); transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex; align-items: center; gap: 10px; font-weight: 500;
    `;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Gönderiliyor...';

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: new FormData(event.target),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showNotification('Mesajınız başarıyla iletildi! Teşekkürler.');
                contactForm.reset();
            } else {
                showNotification('Bir hata oluştu, lütfen tekrar deneyin.', 'error');
            }
        } catch (error) {
            showNotification('Bağlantı hatası! Lütfen internetinizi kontrol edin.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

/* ============================================
   KAYAN PARÇACIKLAR VE ANIMASYONLAR
   ============================================ */
const initializeParticles = () => {
    const particlesContainers = document.querySelectorAll('.floating-particles');
    
    particlesContainers.forEach(container => {
        // Eğer zaten parçacıklar varsa, yeniden oluşturma
        if (container.children.length > 0) return;
        
        for (let i = 0; i < 9; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);
        }
    });
};

// Sayfa yüklendiğinde parçacıkları başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeParticles);
} else {
    initializeParticles();
}
