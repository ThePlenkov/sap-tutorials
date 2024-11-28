export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}