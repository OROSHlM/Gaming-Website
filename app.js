// Mock Данные (Вместо БД)
const gamesList = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        desc: "Ролевая игра в жанре киберпанк, действие которой происходит в мегаполисе Найт-Сити, где власть, роскошь и модификации тела ценятся выше всего.",
        image: "https://images8.alphacoders.com/131/thumb-1920-1317813.png",
        rating: 8.8,
        price: "$59.99",
        tags: ["Action", "RPG", "Cyberpunk", "Open World"],
        platforms: ["PC", "PS5", "Xbox"],
        release: "2020",
        dev: "CD PROJEKT RED"
    },
    {
        id: 2,
        title: "Elden Ring",
        desc: "Новый ролевой экшен в мире темного фэнтези. Отправляйтесь в Междуземье, постигните тайну Кольца Элден и станьте новым повелителем.",
        image: "https://images7.alphacoders.com/942/thumb-1920-942358.jpg",
        rating: 9.6,
        price: "$59.99",
        tags: ["Souls-like", "Dark Fantasy", "RPG", "Open World", "Hardcore"],
        platforms: ["PC", "PS5", "Xbox"],
        release: "2022",
        dev: "FromSoftware"
    },
    {
        id: 3,
        title: "Neon City Racers",
        desc: "Безумные аркадные гонки по улицам залитого неоном мегаполиса будущего. Собирайте бонусы, уклоняйтесь от полиции и станьте легендой.",
        image: "https://images4.alphacoders.com/922/thumb-1920-922329.jpg",
        rating: 7.9,
        price: "$29.99",
        tags: ["Racing", "Arcade", "Neon", "Multiplayer"],
        platforms: ["PC", "PS5", "Switch"],
        release: "2025",
        dev: "NeonWorks"
    },
    {
        id: 4,
        title: "Astro's Galaxy",
        desc: "Милое и невероятно креативное платформенное приключение. Путешествуйте по галактикам, собирайте детали и спасайте друзей-роботов.",
        image: "https://images2.alphacoders.com/111/thumb-1920-1117861.jpg",
        rating: 9.2,
        price: "$49.99",
        tags: ["Platformer", "Adventure", "Family", "Puzzle"],
        platforms: ["PS5"],
        release: "2024",
        dev: "Team Asobi"
    },
    {
        id: 5,
        title: "Galactic Frontiers",
        desc: "Масштабная космическая стратегия в реальном времени. Стройте флот, колонизируйте планеты и сражайтесь с инопланетными расами за доминирование.",
        image: "https://images2.alphacoders.com/927/thumb-1920-927303.png",
        rating: 8.5,
        price: "$39.99",
        tags: ["Strategy", "Sci-Fi", "Space", "RTS"],
        platforms: ["PC"],
        release: "2025",
        dev: "Stellar Games"
    },
    {
        id: 6,
        title: "Shadows of Kyoto",
        desc: "Стелс-экшен от третьего лица в сеттинге феодальной Японии с мистическими элементами. Станьте ниндзя и отомстите клану предателей.",
        image: "https://images2.alphacoders.com/131/thumb-1920-1317798.png",
        rating: 8.9,
        price: "$69.99",
        tags: ["Action", "Stealth", "Historical", "Ninja", "Story Rich"],
        platforms: ["PC", "PS5", "Xbox"],
        release: "2024",
        dev: "Ronin Studios"
    }
];

const categories = [
    { name: "Action", icon: "fa-crosshairs" },
    { name: "RPG", icon: "fa-dragon" },
    { name: "Strategy", icon: "fa-chess" },
    { name: "Racing", icon: "fa-car" },
    { name: "Sci-Fi", icon: "fa-rocket" },
    { name: "Indie", icon: "fa-ghost" }
];

const mockReviews = [
    {
        user: "AlexGamer99",
        avatar: "https://ui-avatars.com/api/?name=Alex&background=random",
        date: "2 дня назад",
        rating: 9,
        text: "Абсолютный шедевр! Графика поражает воображение, а геймплей затягивает на сотни часов. Однозначно рекомендую всем фанатам жанра. Единственный минус - редкие баги с анимацией, но разработчики быстро их фиксят."
    },
    {
        user: "SarahPlays",
        avatar: "https://ui-avatars.com/api/?name=Sarah&background=random",
        date: "Неделю назад",
        rating: 10,
        text: "Никогда не писала отзывы, но эта игра заставила меня это сделать. Сюжет держит в напряжении до самой последней секунды, персонажи живые, саундтрек - мое почтение. 10/10."
    },
    {
        user: "DED_INSIDE",
        avatar: "https://ui-avatars.com/api/?name=Ded&background=random",
        date: "Месяц назад",
        rating: 7,
        text: "В целом неплохо, но ожидания были завышены. Боевая система показалась немного скучной на поздних этапах игры. За визуал плюс."
    }
];

// Глобальное состояние
let currentState = {
    games: gamesList,
    searchQuery: "",
    platformFilter: "all",
    sortType: "popular"
};

// DOM Элементы
const appContent = document.getElementById('app-content');
const homeTemplate = document.getElementById('home-view-template');
const gameDetailTemplate = document.getElementById('game-detail-template');
const searchInput = document.getElementById('searchInput');

// Навигация
document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    renderHome();
});
document.getElementById('btn-explore').addEventListener('click', (e) => {
    document.querySelector('.nav-btn.active').classList.remove('active');
    e.target.classList.add('active');
    renderHome();
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
});

// Функция: Рендер Главной Страницы
function renderHome() {
    // Очищаем контейнер
    appContent.innerHTML = '';
    
    // Клонируем шаблон
    const content = homeTemplate.content.cloneNode(true);
    appContent.appendChild(content);

    // Только после добавления в DOM можем искать элементы
    renderCategories();
    renderGames(currentState.games);
    setupFilters();
}

// Функция: Рендер Категорий
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;
    
    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="filterByTag('${cat.name}')">
            <i class="fa-solid ${cat.icon}"></i>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

function filterByTag(tag) {
    searchInput.value = tag;
    currentState.searchQuery = tag;
    filterGames();
}

// Функция: Рендер Сетки Игр
function renderGames(gamesArray) {
    const grid = document.getElementById('gamesGrid');
    if (!grid) return;

    if (gamesArray.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); font-size: 1.2rem;">Игры не найдены. Попробуйте изменить параметры поиска.</div>';
        return;
    }

    grid.innerHTML = gamesArray.map(game => `
        <div class="game-card" onclick="renderGameDetail(${game.id})">
            <div class="game-img">
                <img src="${game.image}" alt="${game.title}">
                <div class="score-badge"><i class="fa-solid fa-star"></i> ${game.rating}</div>
                <button class="play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
            <div class="game-info">
                <div class="game-tags">
                    ${game.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h3 class="game-title">${game.title}</h3>
                <p class="game-desc">${game.desc}</p>
                <div class="game-footer">
                    <div class="platforms">
                        ${game.platforms.includes('PC') ? '<i class="fa-solid fa-desktop" title="PC"></i>' : ''}
                        ${game.platforms.includes('PS5') ? '<i class="fa-brands fa-playstation" title="PlayStation"></i>' : ''}
                        ${game.platforms.includes('Xbox') ? '<i class="fa-brands fa-xbox" title="Xbox"></i>' : ''}
                        ${game.platforms.includes('Switch') ? '<i class="fa-solid fa-gamepad" title="Switch"></i>' : ''}
                    </div>
                    <span class="price">${game.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Поиск и фильтрация
searchInput.addEventListener('input', (e) => {
    currentState.searchQuery = e.target.value.toLowerCase();
    
    // Если мы не на главной странице, возвращаемся на нее
    if (!document.getElementById('gamesGrid')) {
        renderHome();
    }
    
    filterGames();
});

function setupFilters() {
    const platformFilter = document.getElementById('platformFilter');
    const sortFilter = document.getElementById('sortFilter');

    if(platformFilter && sortFilter) {
        platformFilter.addEventListener('change', (e) => {
            currentState.platformFilter = e.target.value;
            filterGames();
        });

        sortFilter.addEventListener('change', (e) => {
            currentState.sortType = e.target.value;
            filterGames();
        });
    }
}

function filterGames() {
    let filtered = gamesList.filter(game => {
        // Поиск по названию или тегам
        const matchTitle = game.title.toLowerCase().includes(currentState.searchQuery);
        const matchTags = game.tags.some(tag => tag.toLowerCase().includes(currentState.searchQuery));
        
        // Фильтр по платформе
        const matchPlatform = currentState.platformFilter === 'all' || game.platforms.includes(currentState.platformFilter);

        return (matchTitle || matchTags) && matchPlatform;
    });

    // Сортировка
    if (currentState.sortType === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentState.sortType === 'newest') {
        filtered.sort((a, b) => parseInt(b.release) - parseInt(a.release));
    } // Для 'popular' оставляем как есть (по умолчанию)

    renderGames(filtered);
}

// Функция: Рендер Деталей Игры
function renderGameDetail(gameId) {
    const game = gamesList.find(g => g.id === gameId);
    if (!game) return;

    // Сбрасываем активные вкладки в хидере
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    appContent.innerHTML = '';
    const content = gameDetailTemplate.content.cloneNode(true);
    appContent.appendChild(content);

    const container = document.getElementById('gameDetailContainer');
    
    // Генерируем случайное число отзывов
    const reviewsCount = Math.floor(Math.random() * 500) + 50;

    container.innerHTML = `
        <div class="game-header">
            <img src="${game.image}" alt="${game.title} Banner" class="game-banner">
        </div>
        
        <div class="game-detail-content" style="animation: fadeIn 0.8s ease;">
            <div class="sidebar">
                <img src="${game.image}" alt="${game.title} Poster" class="game-poster">
                
                <div class="add-review-box">
                    <h3>Оценить игру</h3>
                    <div style="font-size: 2rem; color: #475569; margin: 1rem 0; cursor: pointer; display: flex; justify-content: center; gap: 5px;" id="starRater">
                        <i class="fa-regular fa-star hover-star"></i>
                        <i class="fa-regular fa-star hover-star"></i>
                        <i class="fa-regular fa-star hover-star"></i>
                        <i class="fa-regular fa-star hover-star"></i>
                        <i class="fa-regular fa-star hover-star"></i>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="alert('Для публикации отзыва нужно войти в аккаунт!')">Оставить отзыв</button>
                </div>
            </div>
            
            <div class="main-info">
                <div class="detail-info">
                    <div class="game-tags" style="margin-bottom: 1rem;">
                        ${game.tags.map(tag => `<span class="tag" style="font-size: 0.9rem;">${tag}</span>`).join('')}
                    </div>
                    <h1>${game.title}</h1>
                    <div class="dev-info">
                        <strong>Разработчик:</strong> ${game.dev} &nbsp;|&nbsp; 
                        <strong>Дата выхода:</strong> ${game.release}
                    </div>
                </div>

                <div class="detail-stats">
                    <div class="stat">
                        <span class="stat-label">Оценка критиков</span>
                        <span class="stat-value rating"><i class="fa-solid fa-star"></i> ${game.rating}</span>
                    </div>
                    <div class="stat" style="border-left: 1px solid var(--glass-border); padding-left: 2rem;">
                        <span class="stat-label">Оценка игроков</span>
                        <span class="stat-value rating"><i class="fa-solid fa-star"></i> ${(game.rating - 0.4).toFixed(1)}</span>
                    </div>
                    <div class="stat" style="border-left: 1px solid var(--glass-border); padding-left: 2rem;">
                        <span class="stat-label">Отзывы</span>
                        <span class="stat-value"><i class="fa-solid fa-comment-dots"></i> ${reviewsCount}</span>
                    </div>
                </div>

                <div class="hero-actions" style="margin-bottom: 3rem;">
                    <button class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.2rem;">Купить за ${game.price}</button>
                    <button class="btn btn-secondary" onclick="alert('Добавлено в вишлист! 🎮')"><i class="fa-solid fa-heart"></i> В вишлист</button>
                    <button class="btn btn-secondary"><i class="fa-solid fa-share-nodes"></i> Поделиться</button>
                </div>

                <div class="about-section">
                    <h3>Об игре</h3>
                    <p>${game.desc}</p>
                    <br>
                    <p>Здесь должно быть подробное описание игры, ее особенностей, системных требований и прочей полезной информации для покупателя. В данный момент тут используется заглушка для демонстрации дизайна.</p>
                </div>
            </div>
        </div>

        <div class="reviews-section">
            <h3 style="font-size: 2rem; margin-bottom: 2rem;">Последние отзывы</h3>
            
            ${mockReviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer">
                            <img src="${review.avatar}" alt="${review.user}">
                            <div class="reviewer-info">
                                <h4>${review.user}</h4>
                                <span>${review.date}</span>
                            </div>
                        </div>
                        <div class="review-stars">
                            ${Array(10).fill(0).map((_, i) => 
                                i < review.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star" style="color: #475569"></i>'
                            ).join('')}
                            <span style="color: white; font-weight: bold; margin-left: 5px;">${review.rating}/10</span>
                        </div>
                    </div>
                    <p class="review-body">"${review.text}"</p>
                </div>
            `).join('')}
            
            <button class="btn btn-secondary" style="width: 100%; border: 1px dashed var(--glass-border); justify-content: center; margin-top: 1rem;">
                Смотреть все отзывы (еще ${reviewsCount - 3})
            </button>
        </div>
    `;

    // Анимация звездочек при наведении в блоке оценки
    const stars = document.querySelectorAll('.hover-star');
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid');
                    s.style.color = '#fbbf24';
                } else {
                    s.classList.remove('fa-solid');
                    s.classList.add('fa-regular');
                    s.style.color = '#475569';
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            stars.forEach(s => {
                s.classList.remove('fa-solid');
                s.classList.add('fa-regular');
                s.style.color = '#475569';
            });
        });
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
