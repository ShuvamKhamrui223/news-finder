const sideMenuBtn = document.getElementById('sideMenuBtn')

const sidebarMenu = document.querySelector('aside');

const overlay = document.querySelector('.overlay')

const categoriesList = document.getElementById('categoriesList')

sideMenuBtn.addEventListener('click', () => sidebarMenu.classList.add('show'))

overlay.addEventListener('click', () => sidebarMenu.classList.remove('show'))

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

categories.forEach((category) => {
  categoriesList.innerHTML +=
    `<li><a href="" class="category text-white" title="Category- ${category}">${category}</a></li>
`;
})


// Custom dropdown for featuring various categories in sidebar
/*
const menuOpenBtns = document.querySelectorAll('menu-open-btn'),
  menuItem = document.querySelector('.menu_item');
menuOpenBtns.forEach((menuOpenBtn) => {
  menuOpenBtn.addEventListener('click', () => {
    //menuItem.classList.contains('open') ? menuItem.classList.remove('open') : menuItem.classList.add('open')
    menuItem.classList.toggle('open')
  })
})
*/

// export default sidebarMenu;