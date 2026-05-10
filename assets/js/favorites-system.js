/**
 * Favorileme Sistemi
 * Projeleri favorilere ekleme, çıkarma ve yönetme işlevleri
 */

class FavoritesManager {
    constructor() {
        this.storageKey = 'projectFavorites';
        this.favorites = this.loadFavorites();
        this.init();
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
        } else {
            this.favorites.push(projectId);
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
    }

    /**
     * Sistemin başlatılması
     */
    init() {
        this.setupFavoriteButtons();
        this.setupClearButton();
        this.updateUI();
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
     * Favoriler bölümünü render et
     */
    renderFavoritesSection() {
        const container = document.getElementById('favorites-container');
        const counter = document.getElementById('favorites-count');
        const clearBtn = document.getElementById('clear-favorites-btn');
        const projectCards = document.querySelectorAll('.project-card[data-project-id]');

        // Sayacı güncelle
        counter.textContent = this.favorites.length;

        if (this.favorites.length === 0) {
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
