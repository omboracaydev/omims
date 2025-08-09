// Load the sidebar once
fetch('elements/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;
  });

// Load default page (e.g., dashboard)
window.addEventListener('DOMContentLoaded', () => {
  loadPageByName('dashboard-page');
});

// List of pages still under development (use page names without .html)
// Select Line and Ctrl + / to toggle
const developingPages = [
  // 'dashboard-page', 
  // 'daily-inventory',
  'receiving-page',
  'subpages/stocks-database',
  'subpages/suppliers-database',
  'subpages/create-new-purchase',
  'subpages/history-purchase'
];

// Function to load pages
function loadPage(pageUrl, isDeveloping = false, pageName = '') {
  const targetUrl = isDeveloping
    ? `elements/developing-page.html?page=${encodeURIComponent(pageName)}`
    : pageUrl;

  fetch(targetUrl)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
    
      if (isDeveloping) {
      const pageSpan = document.getElementById('page-name');
      if (pageSpan) {
        pageSpan.textContent = pageName;
      }
    }
    })
    .catch(() => {
      document.getElementById('main-content').innerHTML = '<div class="p-4 text-red-500">Failed to load page.</div>';
    });
}

function loadPageByName(pageName) {
  const isDev = developingPages.includes(pageName);
  loadPage(`pages/${pageName}.html`, isDev, pageName);
}

// Optional: Handle clicks in sidebar
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-page]')) {
    e.preventDefault();
    const page = e.target.getAttribute('data-page').replace('.html', '');
    loadPageByName(page);
  }
});

// Handle: Collapse Menu
function toggleSubmenu(submenuId, button) {
  const submenu = document.getElementById(submenuId);
  const svgIcon = button.querySelector("svg");

  if (submenu.classList.contains("max-h-0")) {
    submenu.classList.remove("max-h-0");
    submenu.classList.add("max-h-40"); // or adjust as needed
    svgIcon.classList.add("rotate-180");
  } else {
    submenu.classList.remove("max-h-40");
    submenu.classList.add("max-h-0");
    svgIcon.classList.remove("rotate-180");
  }
}