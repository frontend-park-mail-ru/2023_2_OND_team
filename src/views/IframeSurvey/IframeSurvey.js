export function renderIframeSurvey(surveyID) {
  if (surveyID == -1) {
    const rootElement = document.querySelector('#root');

    const iframe = document.createElement('iframe');
    iframe.src = `https://pinspire.online:1446/${surveyID}`;
    iframe.classList.add('hide');
    iframe.classList.add('iframe-survey');

    rootElement.appendChild(iframe);

    return;
  }

  const iframe = document.querySelector('.iframe-survey');
  iframe.src = `https://pinspire.online:1446/${surveyID}`;
  iframe.classList.remove('hide');
}
