/**
 * Favorileme Sistemi (Güncellenmiş)
 * - Sayaç hatası düzeltildi
 * - Modern notification sistemi eklendi
 */

class FavoritesManager {
    constructor() {
        this.storageKey = 'projectFavorites';
        this.favorites = this.loadFavorites();
        this.init();
        this.createNotificationContainer();
    }

    /**
     * LocalStorage'dan favorileri yükle
     */
    loadFavorites() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Favoriler yüklenirken hata:', error);
            return [];
        }
    }

    /**
     * Favorileri LocalStorage'a kaydet
     */
    saveFavorites() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Favoriler kaydedilirken hata:', error);
        }
    }

    /**
     * Projeyi favorilere ekle veya çıkar
     */
    toggleFavorite(projectId) {
        const index = this.favorites.indexOf(projectId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showNotification('Projeden Çıkarıldı', 'Proje favorilerden çıkarıldı.', 'remove');
        } else {
            this.favorites.push(projectId);
            this.showNotification('Favorilere Eklendi', 'Proje favorilere eklendi.', 'add');
        }
        this.saveFavorites();
        this.updateUI();
    }

    /**
     * Projenin favoride olup olmadığını kontrol et
     */
    isFavorite(projectId) {
        return this.favorites.includes(projectId);
    }

    /**
     * Tüm favorileri temizle
     */
    clearAllFavorites() {
        this.favorites = [];
        this.saveFavorites();
        this.updateUI();
        this.showNotification('Temizlendi', 'Tüm favoriler silindi.', 'clear');
    }

    /**
     * Notification container oluştur
     */
    createNotificationContainer() {
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    /**
     * Modern notification göster
     */
    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notification-container');
        
        // İkon seç
        let icon = '✓';
        let bgColor = '#e63946';
        
        if (type === 'add') {
            icon = '❤️';
            bgColor = '#e63946';
        } else if (type === 'remove') {
            icon = '✕';
            bgColor = '#666666';
        } else if (type === 'clear') {
            icon = '🗑️';
            bgColor = '#e63946';
        }

        // Notification element oluştur
        const notification = document.createElement('div');
        notification.className = 'notification-item';
        notification.style.cssText = `
            background: linear-gradient(135deg, ${bgColor}, ${this.adjustColor(bgColor, -20)});
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            min-width: 300px;
            animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            pointer-events: auto;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'JetBrains Mono', monospace;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.5rem; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(255, 255, 255, 0.2); border-radius: 50%;">
                    ${icon}
                </span>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px;">${title}</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">${message}</div>
                </div>
                <button style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                    ✕
                </button>
            </div>
        `;

        // Kapatma butonu
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => notification.remove(), 400);
        });

        // Hover efekti
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateX(-5px)';
            notification.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
        });

        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateX(0)';
            notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });

        container.appendChild(notification);

        // 4 saniye sonra otomatik kapat
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 4000);
    }

    /**
     * Rengi ayarla (daha koyu/açık yap)
     */
    adjustColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    /**
     * Sistemin başlatılması
     */
    init() {
        this.setupFavoriteButtons();
        this.setupClearButton();
        this.updateUI();
        this.addAnimationStyles();
    }

    /**
     * Animasyon stillerini ekle
     */
    addAnimationStyles() {
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(400px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(400px);
                    }
                }

                .notification-item {
                    user-select: none;
                }

                .notification-item button:hover {
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Favori butonlarını ayarla
     */
    setupFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const projectId = parseInt(btn.getAttribute('data-project-id'));
            
            // Başlangıç durumunu ayarla
            this.updateButtonState(btn, projectId);

            // Tıklama olayını bağla
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(projectId);
            });
        });
    }

    /**
     * Favori butonunun durumunu güncelle
     */
    updateButtonState(btn, projectId) {
        if (this.isFavorite(projectId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            btn.title = 'Favorilerden Çıkar';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
            btn.title = 'Favorilere Ekle';
        }
    }

    /**
     * Temizle butonunu ayarla
     */
    setupClearButton() {
        const clearBtn = document.getElementById('clear-favorites-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Tüm favorileri silmek istediğinize emin misiniz?')) {
                    this.clearAllFavorites();
                }
            });
        }
    }

    /**
     * Tüm UI öğelerini güncelle
     */
    updateUI() {
        this.updateFavoriteButtons();
        this.renderFavoritesSection();
    }

    /**
     * Tüm favori butonlarının durumunu güncelle
     */
    updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const projectId = parseInt(btn.getAttribute('data-project-id'));
            this.updateButtonState(btn, projectId);
        });
    }

    /**
     * Favoriler bölümünü render et (SAYAÇ HATASI DÜZELTİLDİ)
     */
    renderFavoritesSection() {
        const container = document.getElementById('favorites-container');
        const counter = document.getElementById('favorites-count');
        const clearBtn = document.getElementById('clear-favorites-btn');
        const projectCards = document.querySelectorAll('.project-card[data-project-id]');

        // Sayacı güncelle - HATA DÜZELTMESİ
        const favoriteCount = this.favorites.length;
        counter.textContent = favoriteCount;

        if (favoriteCount === 0) {
            // Boş durumu göster
            container.innerHTML = `
                <div class="favorites-empty">
                    <i class="far fa-heart"></i>
                    <p>Henüz favorilere proje eklemediniz. Bir projeyi favorilere eklemek için ♡ düğmesine tıklayın.</p>
                </div>
            `;
            if (clearBtn) clearBtn.style.display = 'none';
        } else {
            // Favori projeleri göster
            const favoriteCards = Array.from(projectCards).filter(card => {
                const projectId = parseInt(card.getAttribute('data-project-id'));
                return this.favorites.includes(projectId);
            });

            const favoritesHTML = favoriteCards.map(card => {
                return card.outerHTML;
            }).join('');

            container.innerHTML = `<div class="favorites-grid">${favoritesHTML}</div>`;
            
            // Yeni butonları yeniden bağla
            this.rebindFavoriteButtons(container);

            if (clearBtn) clearBtn.style.display = 'inline-flex';
        }
    }

    /**
     * Favoriler bölümündeki butonları yeniden bağla
     */
    rebindFavoriteButtons(container) {
        const newFavBtns = container.querySelectorAll('.favorite-btn');
        newFavBtns.forEach(btn => {
            const projectId = parseInt(btn.getAttribute('data-project-id'));
            
            // Eski event listener'ları temizle
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Yeni event listener'ı ekle
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(projectId);
            });
        });
    }

    /**
     * Favori listesini JSON olarak dışa aktar (debug amaçlı)
     */
    exportFavorites() {
        return JSON.stringify(this.favorites, null, 2);
    }

    /**
     * Favori listesini görüntüle (debug amaçlı)
     */
    logFavorites() {
        console.log('Favori Projeler:', this.favorites);
        console.log('Toplam Favori Sayısı:', this.favorites.length);
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
});

// Alternatif: Eğer script sayfanın sonunda yüklüyse, hemen başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.favoritesManager = new FavoritesManager();
    });
} else {
    window.favoritesManager = new FavoritesManager();
}
