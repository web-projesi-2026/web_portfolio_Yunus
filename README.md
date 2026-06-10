# Yunus Baris - Kisisel Portfolyo
Saf HTML, CSS ve JavaScript ile gelistirilmis modern, responsive ve dinamik kisisel portfolyo projesi.
Canli site: https://web-projesi-2026.github.io/web_portfolio_Yunus/
## Proje Yapisi
```text
web_portfolio_Yunus/
|-- index.html
|-- README.md
|-- assets/
|   |-- css/
|   |   `-- style.css
|   |-- data/
|   |   `-- projects.json
|   |-- js/
|   |   |-- app.js
|   |   `-- favorites-system.js
|   `-- favicon.svg
`-- pages/
    |-- about.html
    |-- contact.html
    |-- data.html
    |-- education.html
    |-- experience.html
    |-- gallery.html
    |-- project.html
    `-- skills.html
```
## Kullanilan Teknolojiler
- HTML5
- CSS3
- Vanilla JavaScript
- JSON veri dosyasi
- Firebase Realtime Database
- localStorage
- Font Awesome
- Google Fonts
## Odev Gereksinimleri
### Kullanici Deneyimi Ozellikleri
- `pages/data.html` sayfasinda proje arama kutusu bulunur.
- Projeler kategoriye gore filtrelenebilir.
- Projeler ada gore A-Z veya Z-A siralanabilir.
- Proje favorileme sistemi ile kullanici kendi favori listesini olusturabilir.
### API veya Dinamik Veri Kullanimi
- Projeler `assets/data/projects.json` dosyasindan `fetch()` ile okunur.
- Okunan JSON verileri JavaScript ile kart yapisinda listelenir.
### Veritabani Islemleri
Firebase Realtime Database kullanilarak favori proje verileri saklanir.
- Veri ekleme: Favoriye eklenen proje Firebase'e kaydedilir.
- Veri listeleme: Sayfa acilisinda kullanicinin favorileri Firebase'den okunur.
- Veri silme: Tek favori veya tum favoriler Firebase ve localStorage uzerinden silinir.
GitHub Pages PHP/MySQL calistirmadigi icin backend gereksinimi Firebase Realtime Database ile karsilanmistir.
### Profesyonellestirme
- Sayfa basliklari eklendi.
- Tum HTML sayfalarina SVG favicon baglandi.
- README proje yapisi, teknolojiler ve odev gereksinimleriyle guncellendi.
- Sayfalar arasi navigasyon baglantilari duzenlendi.
- Responsive tasarim korunarak veri sayfasina mobil uyumlu kontrol alani eklendi.
## Kurulum
Projeyi indirdikten sonra herhangi bir derleme adimi gerekmez. `index.html` dosyasini tarayicida acabilirsiniz.
Yerelde JSON dosyasi `fetch()` ile okundugu icin en sorunsuz test icin basit bir local server kullanilabilir:
```bash
python -m http.server 8000
```
Ardindan tarayicida `http://localhost:8000` adresine gidin.
## Iletisim
- Yunus Baris
- E-posta: baris.yunus@ogr.ahievran.edu.tr
- LinkedIn: https://www.linkedin.com/in/yunus-barış-47b7302a7/
- GitHub: https://github.com/barisyunus29-blip
