document.getElementById('toggle-button').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar-container');
    
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'block';
    } else {
      sidebar.style.display = 'none';
    }
  });
  