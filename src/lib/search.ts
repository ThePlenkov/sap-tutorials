interface SearchResult {
  title: string;
  description: string;
  url: string;
}

export function initSearch() {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchResults = document.getElementById('search-results');
  const tutorialCards = document.querySelectorAll('[data-tutorial-card]');
  let results: SearchResult[] = [];

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#search-input') && !target.closest('#search-results')) {
      searchResults?.classList.add('hidden');
    }
  });

  searchInput?.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    results = [];

    if (searchTerm.length < 2) {
      searchResults?.classList.add('hidden');
      return;
    }

    tutorialCards.forEach((card) => {
      const title = card.getAttribute('data-title')?.toLowerCase() || '';
      const description = card.getAttribute('data-description')?.toLowerCase() || '';
      const url = (card as HTMLAnchorElement).href;
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        results.push({
          title: card.getAttribute('data-title') || '',
          description: card.getAttribute('data-description') || '',
          url
        });
      }
    });

    // Update dropdown
    if (results.length > 0) {
      searchResults?.classList.remove('hidden');
      searchResults!.innerHTML = results.map(result => `
        <a 
          href="${result.url}" 
          class="block p-4 hover:bg-accent-light dark:hover:bg-background border-b border-border dark:border-border last:border-0 transition-colors"
        >
          <h3 class="font-semibold text-text dark:text-text-inverse mb-1">${result.title}</h3>
          <p class="text-sm text-text-light dark:text-text-light">${result.description}</p>
        </a>
      `).join('');
    } else {
      searchResults!.innerHTML = `
        <div class="p-4 text-text-light dark:text-text-light">
          No tutorials found
        </div>
      `;
      searchResults?.classList.remove('hidden');
    }
  });

  // Show dropdown when focusing on search
  searchInput?.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
      searchResults?.classList.remove('hidden');
    }
  });

  // Handle keyboard navigation
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults?.classList.add('hidden');
    }
  });
}