// Anime Characters Showcase - Interactive JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCardAnimations();
    initializeImageLoading();
    initializeCardInteractions();
    initializeScrollEffects();
});

// ==================== Card Animations ====================
function initializeCardAnimations() {
    const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.2 + index * 0.15}s`;
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ==================== Image Loading ====================
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const originalSrc = img.src;
        
        img.addEventListener('load', function() {
            this.parentElement.style.opacity = '1';
            this.parentElement.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.parentElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            this.style.display = 'none';
        });
    });
}

// ==================== Card Interactions ====================
function initializeCardInteractions() {
    const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
    
    cards.forEach(card => {
        const paragraphs = card.querySelectorAll('p');
        
        card.addEventListener('mouseenter', function() {
            paragraphs.forEach((p, index) => {
                p.style.animationDelay = `${index * 0.1}s`;
                p.classList.add('active');
            });
        });
        
        card.addEventListener('mouseleave', function() {
            paragraphs.forEach(p => {
                p.classList.remove('active');
            });
        });
        
        // Add individual paragraph interactions
        paragraphs.forEach(p => {
            p.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(12px)';
            });
            
            p.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    });
}

// ==================== Scroll Effects ====================
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add pulse effect to images
                const img = entry.target.querySelector('img');
                if (img) {
                    img.style.animation = 'imagePulse 0.6s ease-out';
                }
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
    cards.forEach(card => observer.observe(card));
}

// ==================== Dynamic Effects ====================

// Add hover glow effect
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - cardCenterX, 2) + 
            Math.pow(e.clientY - cardCenterY, 2)
        );
        
        if (distance < 200) {
            const intensity = (200 - distance) / 200;
            card.style.filter = `drop-shadow(0 0 ${15 * intensity}px rgba(255, 107, 107, ${0.3 * intensity}))`;
        } else {
            card.style.filter = 'drop-shadow(0 0 0px transparent)';
        }
    });
});

// ==================== Keyboard Controls ====================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Reset all cards
        const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
        cards.forEach(card => {
            card.style.transform = '';
            card.style.filter = '';
        });
    }
    
    if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen for cards (experimental)
        const cards = document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
        cards.forEach(card => {
            card.style.position = 'relative';
            card.addEventListener('click', function() {
                if (!this.classList.contains('fullscreen')) {
                    this.classList.add('fullscreen');
                    document.body.style.overflow = 'hidden';
                } else {
                    this.classList.remove('fullscreen');
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
});

// ==================== Performance Optimization ====================
// Throttle mousemove events for better performance
let throttleTimeout;
document.addEventListener('mousemove', function(e) {
    if (throttleTimeout) return;
    
    throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
    }, 16); // ~60fps
});

// ==================== Utility Functions ====================

// Log initialization
console.log('🎌 Anime Characters Showcase - JavaScript Loaded');
console.log('Controls:');
console.log('• Hover over cards for interactive effects');
console.log('• Click cards for feedback');
console.log('• Move mouse near cards for dynamic glow');
console.log('• Press ESC to reset all effects');

// Version tracking
const appVersion = '1.0.0';
console.log(`Version: ${appVersion}`);

// Add custom event listeners for future extensions
window.AnimeShowcase = {
    version: appVersion,
    getCards: function() {
        return document.querySelectorAll('div:not(.container):not(.header):not(.cards-wrapper)');
    },
    highlightCard: function(index) {
        const cards = this.getCards();
        if (cards[index]) {
            cards[index].style.filter = 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.8))';
        }
    },
    resetHighlight: function() {
        const cards = this.getCards();
        cards.forEach(card => {
            card.style.filter = '';
        });
    },
    
    // ==================== Card Data Management ====================
    getAllCardData: function() {
        const cards = this.getCards();
        const cardData = [];
        
        cards.forEach((card, index) => {
            const title = card.querySelector('p:nth-child(2)')?.textContent || '';
            const name = card.querySelector('p:nth-child(3)')?.textContent || '';
            const img = card.querySelector('img')?.src || '';
            
            cardData.push({
                id: index,
                title: title,
                name: name,
                image: img,
                element: card
            });
        });
        
        return cardData;
    },
    
    getCardById: function(id) {
        const cardData = this.getAllCardData();
        return cardData.find(card => card.id === id);
    },
    
    // ==================== Search & Filter Functions ====================
    searchCards: function(keyword) {
        const cards = this.getCards();
        let matchCount = 0;
        
        keyword = keyword.toLowerCase();
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            
            if (text.includes(keyword)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                matchCount++;
            } else {
                card.style.opacity = '0.3';
                card.style.pointerEvents = 'none';
            }
        });
        
        console.log(`Found ${matchCount} matching cards for: "${keyword}"`);
        return matchCount;
    },
    
    filterByTitle: function(title) {
        const cards = this.getCards();
        return this.searchCards(title);
    },
    
    filterByCharacter: function(name) {
        const cards = this.getCards();
        return this.searchCards(name);
    },
    
    resetFilter: function() {
        const cards = this.getCards();
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
            card.style.display = 'block';
        });
        console.log('Filters reset');
    },
    
    // ==================== Animation Control Functions ====================
    pauseAllAnimations: function() {
        const style = document.createElement('style');
        style.id = 'pause-animations';
        style.textContent = '* { animation-play-state: paused !important; }';
        document.head.appendChild(style);
        console.log('✋ All animations paused');
    },
    
    resumeAllAnimations: function() {
        const style = document.getElementById('pause-animations');
        if (style) {
            style.remove();
            console.log('▶️ All animations resumed');
        }
    },
    
    toggleAnimations: function() {
        const style = document.getElementById('pause-animations');
        if (style) {
            this.resumeAllAnimations();
        } else {
            this.pauseAllAnimations();
        }
    },
    
    slowDownAnimations: function(factor = 2) {
        const style = document.createElement('style');
        style.id = 'slow-animations';
        style.textContent = `
            * { 
                animation-duration: calc(var(--animation-duration, 1s) * ${factor}) !important;
                transition-duration: calc(300ms * ${factor}) !important;
            }
        `;
        document.head.appendChild(style);
        console.log(`Animations slowed by ${factor}x`);
    },
    
    // ==================== Visual Effects Functions ====================
    changeTheme: function(theme = 'dark') {
        const container = document.querySelector('.container');
        
        if (theme === 'dark') {
            document.body.style.filter = 'brightness(0.8)';
            container.style.background = 'rgba(20, 20, 40, 0.9)';
            console.log('🌙 Dark theme applied');
        } else if (theme === 'light') {
            document.body.style.filter = 'brightness(1.2)';
            container.style.background = 'rgba(255, 255, 255, 0.15)';
            console.log('☀️ Light theme applied');
        } else if (theme === 'neon') {
            document.body.style.filter = 'saturate(1.5) brightness(1.1)';
            container.style.background = 'rgba(0, 255, 150, 0.05)';
            console.log('⚡ Neon theme applied');
        }
    },
    
    resetTheme: function() {
        document.body.style.filter = '';
        document.querySelector('.container').style.background = '';
        console.log('Theme reset to default');
    },
    
    toggleDarkMode: function() {
        const isDark = document.body.style.filter.includes('0.8');
        isDark ? this.resetTheme() : this.changeTheme('dark');
    },
    
    // ==================== Card Rating & Favorites ====================
    favorites: [],
    
    addToFavorites: function(cardId) {
        if (!this.favorites.includes(cardId)) {
            this.favorites.push(cardId);
            const card = this.getCardById(cardId);
            if (card) {
                card.element.style.borderColor = '#FFD700';
                card.element.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            }
            console.log(`⭐ Added to favorites: ${card.name}`);
        }
    },
    
    removeFromFavorites: function(cardId) {
        this.favorites = this.favorites.filter(id => id !== cardId);
        const card = this.getCardById(cardId);
        if (card) {
            card.element.style.borderColor = '';
            card.element.style.boxShadow = '';
        }
        console.log(`Removed from favorites`);
    },
    
    getFavorites: function() {
        return this.favorites.map(id => this.getCardById(id));
    },
    
    toggleFavorite: function(cardId) {
        if (this.favorites.includes(cardId)) {
            this.removeFromFavorites(cardId);
        } else {
            this.addToFavorites(cardId);
        }
    },
    
    // ==================== Sorting Functions ====================
    sortCardsByName: function(ascending = true) {
        const cardData = this.getAllCardData();
        const sorted = [...cardData].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        
        this.reorderCards(sorted);
        console.log(`Cards sorted by name (${ascending ? 'A-Z' : 'Z-A'})`);
    },
    
    sortCardsByTitle: function(ascending = true) {
        const cardData = this.getAllCardData();
        const sorted = [...cardData].sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return ascending ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });
        
        this.reorderCards(sorted);
        console.log(`Cards sorted by title (${ascending ? 'A-Z' : 'Z-A'})`);
    },
    
    reorderCards: function(sortedData) {
        const cardsWrapper = document.querySelector('.cards-wrapper table');
        const tbody = cardsWrapper.querySelector('tbody') || cardsWrapper;
        
        sortedData.forEach(cardData => {
            const row = cardData.element.closest('tr');
            if (row) {
                tbody.appendChild(row);
            }
        });
    },
    
    // ==================== Display & Information Functions ====================
    showCardInfo: function(cardId) {
        const card = this.getCardById(cardId);
        if (card) {
            console.group(`📊 Card Information - ${card.name}`);
            console.log('Title:', card.title);
            console.log('Character Name:', card.name);
            console.log('Image:', card.image);
            console.log('ID:', card.id);
            console.groupEnd();
            return card;
        }
    },
    
    showAllCardsInfo: function() {
        const allCards = this.getAllCardData();
        console.group('📚 All Cards Information');
        allCards.forEach(card => {
            console.log(`${card.name} - ${card.title}`);
        });
        console.groupEnd();
    },
    
    getCardCount: function() {
        return this.getCards().length;
    },
    
    // ==================== Animation Helpers ====================
    bounceCard: function(cardId) {
        const card = this.getCardById(cardId);
        if (card) {
            card.element.style.animation = 'bounce 0.6s ease-out';
            setTimeout(() => {
                card.element.style.animation = '';
            }, 600);
        }
    },
    
    spinCard: function(cardId) {
        const card = this.getCardById(cardId);
        if (card) {
            card.element.style.animation = 'spin 1s ease-out';
            setTimeout(() => {
                card.element.style.animation = '';
            }, 1000);
        }
    },
    
    flashCard: function(cardId) {
        const card = this.getCardById(cardId);
        if (card) {
            card.element.style.animation = 'flash 0.5s ease-out';
            setTimeout(() => {
                card.element.style.animation = '';
            }, 500);
        }
    },
    
    // ==================== Random Functions ====================
    getRandomCard: function() {
        const cards = this.getCards();
        const randomIndex = Math.floor(Math.random() * cards.length);
        return this.getCardById(randomIndex);
    },
    
    shuffleCards: function() {
        const cardData = this.getAllCardData();
        for (let i = cardData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardData[i], cardData[j]] = [cardData[j], cardData[i]];
        }
        this.reorderCards(cardData);
        console.log('🔀 Cards shuffled');
    },
    
    // ==================== Export Functions ====================
    exportCardsAsJSON: function() {
        const cardData = this.getAllCardData().map(card => ({
            id: card.id,
            title: card.title,
            name: card.name,
            image: card.image
        }));
        
        return JSON.stringify(cardData, null, 2);
    },
    
    downloadCardsData: function() {
        const data = this.exportCardsAsJSON();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'anime-cards.json';
        a.click();
        console.log('Downloaded: anime-cards.json');
    },
    
    // ==================== Utility Functions ====================
    deleteCard: function(cardId) {
        const card = this.getCardById(cardId);
        if (card) {
            card.element.closest('tr').style.display = 'none';
            console.log(`Deleted: ${card.name}`);
        }
    },
    
    showAllCards: function() {
        const cards = this.getCards();
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        console.log('All cards shown');
    },
    
    help: function() {
        console.group('🎌 Anime Showcase - Available Functions');
        console.log('Data Management:');
        console.log('  - getAllCardData()');
        console.log('  - getCardById(id)');
        console.log('  - getCardCount()');
        console.log('\nSearch & Filter:');
        console.log('  - searchCards(keyword)');
        console.log('  - filterByTitle(title)');
        console.log('  - filterByCharacter(name)');
        console.log('  - resetFilter()');
        console.log('\nAnimations:');
        console.log('  - pauseAllAnimations()');
        console.log('  - resumeAllAnimations()');
        console.log('  - slowDownAnimations(factor)');
        console.log('  - bounceCard(id)');
        console.log('  - spinCard(id)');
        console.log('  - flashCard(id)');
        console.log('\nTheme:');
        console.log('  - changeTheme(theme) - dark, light, neon');
        console.log('  - resetTheme()');
        console.log('  - toggleDarkMode()');
        console.log('\nFavorites:');
        console.log('  - addToFavorites(cardId)');
        console.log('  - removeFromFavorites(cardId)');
        console.log('  - toggleFavorite(cardId)');
        console.log('  - getFavorites()');
        console.log('\nSorting:');
        console.log('  - sortCardsByName(ascending)');
        console.log('  - sortCardsByTitle(ascending)');
        console.log('  - shuffleCards()');
        console.log('\nDisplay:');
        console.log('  - showCardInfo(cardId)');
        console.log('  - showAllCardsInfo()');
        console.log('  - highlightCard(index)');
        console.log('  - resetHighlight()');
        console.log('\nUtilities:');
        console.log('  - getRandomCard()');
        console.log('  - deleteCard(cardId)');
        console.log('  - showAllCards()');
        console.log('  - exportCardsAsJSON()');
        console.log('  - downloadCardsData()');
        console.log('\nUsage: AnimeShowcase.functionName()');
        console.groupEnd();
    }
};
