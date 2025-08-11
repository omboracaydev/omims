const sidebar = document.getElementById('sidebar');
const contentWrapper = document.getElementById('content-wrapper');
const toggleBtn = document.getElementById('sidebarToggleBtn');

let expanded = true;

// Load sidebar HTML from file and inject
async function loadSidebar(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}: ${response.statusText}`);
    const html = await response.text();
    sidebar.innerHTML = html;
  } catch (err) {
    console.error(err);
    sidebar.innerHTML = `<p class="p-4 text-red-600">Error loading sidebar.</p>`;
  }
}

// Initial load (expanded)
loadSidebar('elements/sidebar.html');

toggleBtn.addEventListener('click', () => {
  if (expanded) {
    // Collapse sidebar
    loadSidebar('elements/sidebar-collapsed.html');
    sidebar.style.width = '6rem';   // collapsed width (w-24)
    contentWrapper.style.marginLeft = '6rem';
    toggleBtn.innerHTML = '&raquo;'; // >>
    toggleBtn.setAttribute('aria-pressed', 'true');
    expanded = false;
  } else {
    // Expand sidebar
    loadSidebar('elements/sidebar.html');
    sidebar.style.width = '16rem';  // expanded width (w-64)
    contentWrapper.style.marginLeft = '16rem';
    toggleBtn.innerHTML = '&laquo;'; // <<
    toggleBtn.setAttribute('aria-pressed', 'false');
    expanded = true;
  }
});
