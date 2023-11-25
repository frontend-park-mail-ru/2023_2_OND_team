import State from '../components/State/state.js';

export class API {
  static state = new State();

  static #config = [
    {name: 'sendQuizInfo', url: '//pinspire.online:8080/api/v1/fall/answer'},
  ];
  
  static async sendQuizInfo(quizID, val_array) {
    try {
      const configItem = `//pinspire.online:8080/api/v1/fall/answer/${quizID}`;

      const response = await fetch(configItem, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': this.state.getCsrfToken(),
        },
        body: JSON.stringify({val_array}),
        credentials: 'include',
      });

      const csrfToken = response.headers.get('X-Set-CSRF-Token');
      if (csrfToken) {
        this.state.setCsrfToken(csrfToken);
      }

      const res = await response.json();

      return res;
    } catch (error) {
      console.error('Ошибка при отправке данных опросника:', error);
      throw error;
    }
  }
}
