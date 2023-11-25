export function renderStatisticsRecomendations() {
  const main = document.querySelector('#main');
  const statisticsRecomendationsTemplate = Handlebars.templates['StatisticsRecomendations.hbs'];
  const statisticsRecomendationsContext = {};
  main.innerHTML = statisticsRecomendationsTemplate(statisticsRecomendationsContext);

}
