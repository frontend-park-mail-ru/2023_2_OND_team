export function renderStatisticsThemes() {
  const main = document.querySelector('#main');
  const statisticsThemesTemplate = Handlebars.templates['StatisticsThemes.hbs'];
  const statisticsThemesContext = {};
  main.innerHTML = statisticsThemesTemplate(statisticsThemesContext);
  
  let canvas = document.getElementById('canvas'); 
  
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = "black";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(30, 460);
  ctx.lineTo(700, 460);
  ctx.stroke();
  
  ctx.fillStyle = "black";
  
  for(let i = 0; i < 6; i++) { 
      ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60); 
      ctx.beginPath(); 
      ctx.moveTo(25, i * 80 + 60); 
      ctx.lineTo(30, i * 80 + 60); 
      ctx.stroke(); 
  }
  
  let labels = ["Путешествия", "Дизайн", "Музыка", "Кулинария", "Спорт", "Политика" , "Другое"]; 
  
  for(var i=0; i<labels.length; i++) { 
      ctx.fillText(labels[i], 50 + i*100, 475); 
  }

  let data = [ 10, 53, 39, 54, 34, 42, 52]; 
  
  ctx.fillStyle = "green"; 
  
  for(var i=0; i<data.length; i++) { 
      var dp = data[i]; 
      ctx.fillRect(40 + i*100, 460-dp*5 , 50, dp*5); 
  }

}
