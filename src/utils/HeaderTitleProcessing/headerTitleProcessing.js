export function setHeaderTitle(title) {
  if (window.innerWidth < 700) return;    

  const headerSearch = document.querySelector('.header__search');
  const headerLeft = document.querySelector('.header__left');
  const headerTitle = document.querySelector('.header__title');

  headerTitle.innerHTML = title;
  

  headerSearch.classList.add('hide');
  headerLeft.classList.remove('hide');
  headerTitle.classList.remove('hide');
}

export function removeHeaderTitle() {
  if (window.innerWidth < 700) return;    
  
  const headerSearch = document.querySelector('.header__search');
  const headerLeft = document.querySelector('.header__left');
  const headerTitle = document.querySelector('.header__title');

  headerTitle.innerHTML = '';

  headerSearch.classList.remove('hide');
  headerLeft.classList.add('hide');
  headerTitle.classList.add('hide');
}
