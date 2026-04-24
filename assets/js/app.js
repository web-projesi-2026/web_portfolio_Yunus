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
        
        // Hamburger animasyonu (CSS ile desteklenecek)
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
// Fare hareketini tüm sayfa genelinde dinle
document.addEventListener('mousemove', updateGlow);
/* --- YUNUS BARIŞ PORTFOLYO ETKİLEŞİM PAKETİ (KESİN ÇÖZÜM) --- */
(function() {
    // 1. PRELOADER FONKSİYONU
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    };

    // Sayfa yüklendiğinde veya en geç 1 saniye sonra kapat
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1000); 

    // 2. LIGHTBOX FONKSİYONU
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

    // 3. PARALLAX FONKSİYONU
    const parallaxSections = document.querySelectorAll('.parallax-section');
    if (parallaxSections.length > 0 && window.innerWidth > 1024) {
        window.addEventListener('scroll', () => {
            let scrollVal = window.pageYOffset;
            parallaxSections.forEach(section => {
                window.requestAnimationFrame(() => {
                    section.style.backgroundPositionY = (scrollVal * 0.4) + 'px';
                });
            });
        }, { passive: true });
    }
})();
/* --- ETKİLEŞİM PAKETİ SONU --- */

/* ============================================
   EMAILJS İLETİŞİM FORMU YÖNETİMİ
   ============================================ */
(function() {
    // ⚠️ ÖNEMLI: Aşağıdaki 3 değeri EmailJS panelinden kopyalayın
    // 1. Public Key: https://dashboard.emailjs.com/admin/account
    // 2. Service ID: https://dashboard.emailjs.com/admin/services
    // 3. Template ID: https://dashboard.emailjs.com/admin/templates
    
    const PUBLIC_KEY = "BURAYA_SENIN_PUBLIC_KEY"; // Örn: "user_xxxxxxxxxxxxx"
    const SERVICE_ID = "BURAYA_SENIN_SERVICE_ID"; // Örn: "service_xxxxx"
    const TEMPLATE_ID = "BURAYA_SENIN_TEMPLATE_ID"; // Örn: "template_xxxxx"

    // EmailJS Başlatma
    if (PUBLIC_KEY !== "BURAYA_SENIN_PUBLIC_KEY") {
        emailjs.init(PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Eğer bilgiler henüz girilmemişse uyar
            if (PUBLIC_KEY === "BURAYA_SENIN_PUBLIC_KEY" || 
                SERVICE_ID === "BURAYA_SENIN_SERVICE_ID" || 
                TEMPLATE_ID === "BURAYA_SENIN_TEMPLATE_ID") {
                alert('❌ Lütfen app.js dosyasında EmailJS bilgilerinizi (Public Key, Service ID, Template ID) girin.');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Gönderiliyor durumu
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 10px;"></i>Gönderiliyor...';

            // Form verilerini hazırla
            const formData = {
                user_name: contactForm.querySelector('input[name="user_name"]').value,
                user_email: contactForm.querySelector('input[name="user_email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value
            };

            // EmailJS'e gönder
            emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                .then(() => {
                    alert('✅ Mesajınız başarıyla gönderildi! Teşekkür ederiz.');
                    contactForm.reset();
                }, (error) => {
                    console.error('EmailJS Hatası:', error);
                    alert('❌ Mesaj gönderilirken bir hata oluştu.\n\nHata: ' + (error.text || JSON.stringify(error)));
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }
})();
