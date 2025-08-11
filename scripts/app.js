// Load the sidebar content on page load
fetch('elements/sidebar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('sidebar').innerHTML = html;
  });


// Pages still under development
const developingPages = [
  // 'dashboard-page',
  //'daily-inventory',
  'receiving-page',
  'subpages/stocks-database',
  'subpages/suppliers-database',
  'subpages/create-new-purchase',
  'subpages/history-purchase',
  'subpages/users-database'
];

// Load a page by URL, optionally show "under development" message
function loadPage(pageUrl, isDeveloping = false, pageName = '') {
  const targetUrl = isDeveloping
    ? `elements/developing-page.html?page=${encodeURIComponent(pageName)}`
    : pageUrl;

  fetch(targetUrl)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load");
      return res.text();
    })
    .then(html => {
      document.getElementById('main-content').innerHTML = html;

      if (isDeveloping) {
        const pageSpan = document.getElementById('page-name');
        if (pageSpan) pageSpan.textContent = pageName;
      }

      // Call daily inventory init if loaded
      if (pageName === 'daily-inventory' && typeof window.initDailyInventory === 'function') {
        window.initDailyInventory();
      }
    })
    .catch(() => {
      document.getElementById('main-content').innerHTML =
        '<div class="p-4 text-red-500">Failed to load page.</div>';
    });
}

// Load page by name (without .html)
function loadPageByName(pageName) {
  const isDev = developingPages.includes(pageName);
  loadPage(`pages/${pageName}.html`, isDev, pageName);
}



// Listen for clicks on elements with data-page attribute (event delegation)
document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-page]');
  if (!btn) return;  // Click not on a page link

  event.preventDefault();
  const page = btn.getAttribute('data-page');
  loadPageByName(page);

  //  Add active class toggle here 
  // Remove active styling from all sidebar buttons
  document.querySelectorAll('.sidebar-link').forEach(b => {
    b.classList.remove('bg-gray-200', 'text-black');
  });

  // Add active styling to the clicked button
  btn.classList.add('bg-gray-200', 'text-black');
});

// Submenu Toggles
function toggleSubmenu(id, btn) {
  console.log('Toggle submenu called for:', id);
  const submenu = document.getElementById(id);
  if (!submenu || !btn) {
    console.warn('Missing submenu or button:', submenu, btn);
    return;
  }

  const isHidden = submenu.getAttribute('aria-hidden') === 'true';
  console.log('Currently hidden?', isHidden);

  if (isHidden) {
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    submenu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
  } else {
    submenu.style.maxHeight = '0';
    submenu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
  }

  const svg = btn.querySelector('svg');
  if (svg) {
    svg.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  }
}

// Load default page on initial load
window.addEventListener('DOMContentLoaded', () => {
  loadPageByName('dashboard-page');
});