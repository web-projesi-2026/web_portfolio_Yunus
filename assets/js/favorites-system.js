<!-- Favorileme Sistemi Script (FINAL - Modern Notifications ile) -->
<!-- Bu kodu </body> etiketinden HEMEN ÖNCESİ yapıştır -->
<script>
    class FavoritesManager {
        constructor() {
            this.storageKey = 'projectFavorites';
            this.favorites = this.loadFavorites();
            this.projectData = {
                1: { title: 'E-Ticaret Sitesi', icon: 'fas fa-shopping-cart' },
                2: { title: 'Stok Takip Sistemi', icon: 'fas fa-desktop' },
                3: { title: 'Hava Durumu Uygulaması', icon: 'fas fa-mobile-alt' },
                4: { title: 'Görev Yönetim Aracı', icon: 'fas fa-tasks' }
            };
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
         * Modern notification göster
         */
        showNotification(title, message, icon) {
            const container = document.getElementById('notification-container');
            
            const notification = document.createElement('div');
            notification.className = 'notification-item';
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-icon">${icon}</div>
                    <div class="notification-text">
                        <div class="notification-title">${title}</div>
                        <div class="notification-message">${message}</div>
                    </div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                setTimeout(() => notification.remove(), 400);
            });

            container.appendChild(notification);

            // Otomatik kapat (4 saniye)
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    setTimeout(() => notification.remove(), 400);
                }
            }, 4000);
        }

        /**
         * Projeyi favorilere ekle veya çıkar
         */
        toggleFavorite(projectId) {
            const index = this.favorites.indexOf(projectId);
            const project = this.projectData[projectId];

            if (index > -1) {
                this.favorites.splice(index, 1);
                this.showNotification(
                    'Favorilerden Çıkarıldı',
                    `"${project.title}" favorilerden çıkarıldı`,
                    '✕'
                );
            } else {
                this.favorites.push(projectId);
                this.showNotification(
                    'Favorilere Eklendi',
                    `"${project.title}" favorilere eklendi`,
                    '❤️'
                );
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
            if (confirm('Tüm favorileri silmek istediğinize emin misiniz?')) {
                this.favorites = [];
                this.saveFavorites();
                this.updateUI();
                this.showNotification(
                    'Tüm Favoriler Silindi',
                    'Tüm favorilere eklediğiniz projeler temizlendi',
                    '🗑️'
                );
            }
        }

        /**
         * Sistemin başlatılması
         */
        init() {
            this.setupFavoriteButtons();
            this.setupDropdownToggle();
            this.setupDropdownButtons();
            this.updateUI();
        }

        /**
         * Favori butonlarını ayarla
         */
        setupFavoriteButtons() {
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach(btn => {
                const projectId = parseInt(btn.getAttribute('data-project-id'));
                
                if (this.isFavorite(projectId)) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                }

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFavorite(projectId);
                });
            });
        }

        /**
         * Dropdown toggle'ı ayarla
         */
        setupDropdownToggle() {
            const toggleBtn = document.getElementById('favorites-toggle-btn');
            const dropdown = document.getElementById('favorites-dropdown');
            const closeBtn = document.getElementById('dropdown-close-btn');

            toggleBtn.addEventListener('click', () => {
                dropdown.classList.toggle('active');
            });

            closeBtn.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar-favorites')) {
                    dropdown.classList.remove('active');
                }
            });
        }

        /**
         * Dropdown butonlarını ayarla
         */
        setupDropdownButtons() {
            const viewAllBtn = document.getElementById('view-all-favorites-btn');
            const clearAllBtn = document.getElementById('clear-all-favorites-btn');

            viewAllBtn.addEventListener('click', () => {
                document.getElementById('favorites-dropdown').classList.remove('active');
                document.querySelector('.favorites-section').scrollIntoView({ behavior: 'smooth' });
            });

            clearAllBtn.addEventListener('click', () => {
                this.clearAllFavorites();
                document.getElementById('favorites-dropdown').classList.remove('active');
            });
        }

        /**
         * Tüm UI öğelerini güncelle
         */
        updateUI() {
            this.updateFavoriteButtons();
            this.updateNavbarDropdown();
            this.renderFavoritesSection();
        }

        /**
         * Favori butonlarının durumunu güncelle
         */
        updateFavoriteButtons() {
            const favoriteButtons = document.querySelectorAll('.favorite-btn');
            favoriteButtons.forEach(btn => {
                const projectId = parseInt(btn.getAttribute('data-project-id'));
                if (this.isFavorite(projectId)) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i>';
                    btn.title = 'Favorilerden Çıkar';
                } else {
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="far fa-heart"></i>';
                    btn.title = 'Favorilere Ekle';
                }
            });
        }

        /**
         * Navbar dropdown'u güncelle
         */
        updateNavbarDropdown() {
            const navbarCount = document.getElementById('navbar-favorites-count');
            const dropdownContent = document.getElementById('dropdown-content');
            const dropdownFooter = document.getElementById('dropdown-footer');

            navbarCount.textContent = this.favorites.length;

            if (this.favorites.length === 0) {
                dropdownContent.innerHTML = `
                    <div class="dropdown-empty">
                        <i class="far fa-heart"></i>
                        <p>Henüz favori yok</p>
                    </div>
                `;
                dropdownFooter.style.display = 'none';
            } else {
                const items = this.favorites.map(id => {
                    const project = this.projectData[id];
                    return `
                        <div class="dropdown-item">
                            <div class="dropdown-item-icon">
                                <i class="${project.icon}"></i>
                            </div>
                            <div class="dropdown-item-info">
                                <div class="dropdown-item-title">${project.title}</div>
                            </div>
                            <button class="dropdown-item-remove" data-project-id="${id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                }).join('');

                dropdownContent.innerHTML = items;
                dropdownFooter.style.display = 'flex';

                document.querySelectorAll('.dropdown-item-remove').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const projectId = parseInt(btn.getAttribute('data-project-id'));
                        this.toggleFavorite(projectId);
                    });
                });
            }
        }

        /**
         * Favoriler bölümünü render et
         */
        renderFavoritesSection() {
            const container = document.getElementById('favorites-container');
            const counter = document.getElementById('favorites-count');
            const clearBtn = document.getElementById('clear-favorites-btn');
            const projectCards = document.querySelectorAll('.project-card[data-project-id]');

            counter.textContent = this.favorites.length;

            if (this.favorites.length === 0) {
                container.innerHTML = `
                    <div class="favorites-empty">
                        <i class="far fa-heart"></i>
                        <p>Henüz favorilere proje eklemediniz. Bir projeyi favorilere eklemek için ♡ düğmesine tıklayın.</p>
                    </div>
                `;
                if (clearBtn) clearBtn.style.display = 'none';
            } else {
                const favoriteCards = Array.from(projectCards).filter(card => {
                    const projectId = parseInt(card.getAttribute('data-project-id'));
                    return this.favorites.includes(projectId);
                });

                const favoritesHTML = favoriteCards.map(card => {
                    return card.outerHTML;
                }).join('');

                container.innerHTML = `<div class="favorites-grid">${favoritesHTML}</div>`;
                
                const newFavBtns = container.querySelectorAll('.favorite-btn');
                newFavBtns.forEach(btn => {
                    const projectId = parseInt(btn.getAttribute('data-project-id'));
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleFavorite(projectId);
                    });
                });

                if (clearBtn) clearBtn.style.display = 'inline-flex';
            }
        }
    }

    // Sayfa yüklendiğinde başlat
    document.addEventListener('DOMContentLoaded', () => {
        window.favoritesManager = new FavoritesManager();
    });
</script>
