document.addEventListener('DOMContentLoaded', () => {
  let UUID = location.pathname.split('/')[3];

  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {
    hover: true,
    coverTrigger: false,
    constrainWidth: 'false',
    alignment: 'right',
  });
});
