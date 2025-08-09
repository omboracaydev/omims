  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebaraside = document.getElementById('sidebaraside');
    const iconPath = document.getElementById('toggleIconPath');
    const systemName = document.getElementById('systemName');
    const mainContent = document.getElementById('main-content');

    sidebar.classList.toggle('w-64');
    sidebaraside.classList.toggle('w-28');
    systemName?.classList.toggle('hidden');
    mainContent?.classList.toggle('pl-32');
    // Toggle all spans
    document.querySelectorAll('.sidebar-link span').forEach(span => {
      span.classList.toggle('hidden');
    });
    const isCollapsed = sidebaraside.classList.contains('w-28');
    iconPath.setAttribute('d', isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7');

    // Optional: center icons when collapsed
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.classList.toggle('justify-center', isCollapsed);
      link.classList.toggle('justify-start', !isCollapsed);
    });

    console.log("Sidebar toggled. Collapsed:", isCollapsed);
  }
