import { API } from "../../utils/api.js";

export function renderStatisticsHowFind() {
  const main = document.querySelector('#main');
  const statisticsHowFindTemplate = Handlebars.templates['StatisticsHowFind.hbs'];
  const statisticsHowFindContext = {};
  main.innerHTML = statisticsHowFindTemplate(statisticsHowFindContext);


  let canvas = document.getElementById('canvas'); 
  
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = "black";
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(30, 460);
  ctx.lineTo(400, 460);
  ctx.stroke();


  ctx.fillStyle = "black";

  for(let i = 0; i < 6; i++) { 
      ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60); 
      ctx.beginPath(); 
      ctx.moveTo(25, i * 80 + 60); 
      ctx.lineTo(30, i * 80 + 60); 
      ctx.stroke(); 
  }

  let labels = ["Друзья", "Соц сети", "реклама", "другое"]; 

  for(var i=0; i<4; i++) { 
      ctx.fillText(labels[i], 50 + i*100, 475); 
  }

  API.getStatisticsHowFindResults();

  let data = [ 10, 53, 39, 54]; 

  ctx.fillStyle = "green"; 

  for(var i=0; i<data.length; i++) { 
      var dp = data[i]; 
      ctx.fillRect(40 + i*100, 460-dp*5 , 50, dp*5); 
  }

}
