export function createIframeSurvey() {
    const rootElement = document.querySelector('#root');

    const iframe = document.createElement('iframe');
    iframe.classList.add('hide');
    iframe.classList.add('iframe-survey');

    rootElement.appendChild(iframe);
}

export function renderIframeSurvey(surveyID) {
  console.log('++');
  const iframe = document.querySelector('.iframe-survey');
  iframe.src = `https://pinspire.online:1446/${surveyID}`;
  iframe.classList.remove('hide');
}

export function closeIframeSurvey() {
  console.log('--');
  const iframe = document.querySelector('.iframe-survey');
  iframe.classList.add('hide');
}
