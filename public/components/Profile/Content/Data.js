import { API } from "../../../utils/api.js";

export function renderDataPage() {
    API.getUserInfo() 
        .then((data) => {

            const profilePage = document.querySelector('.js-profile__page');

            const profileData = Handlebars.templates['ProfileData.hbs'];
            const context = { 
                username: data.username, 
                name: data.name, 
                surname: data.surname, 
                avatar: data.avatar, 
            };
            profilePage.innerHTML = profileData(context);

            const usernameInput = document.querySelector('#username');
            const nameInput = document.querySelector('#name');
            const surnameInput = document.querySelector('#surname');

                 const inputElement = document.getElementById('input__file');
                inputElement.addEventListener('change', (event) => {
                  const file = event.target.files[0];
                
                  const reader = new FileReader();
                
                  reader.onload = (e) => {
                    const imageBytes = e.target.result;
                
                    const blob = new Blob([imageBytes]);
                API.putUserAvatar(blob);
                  //console.log(blob)
                
                    // const downloadLink = document.createElement('a');
                    // downloadLink.href = blobURL;
                    // downloadLink.download = file.name;
                
                    // document.body.appendChild(downloadLink);
                
                    // downloadLink.click();
                
                    // document.body.removeChild(downloadLink);
                  };
                
                  reader.readAsArrayBuffer(file);
                });
                
                // const inputElement = document.getElementById('input__file');
                // inputElement.addEventListener('change', (event) => {
                //   const file = event.target.files[0];
                
                //   const reader = new FileReader();
                
                //   reader.onload = (e) => {
                //     const imageBytes = e.target.result;
                
                //     const blob = new Blob([imageBytes]);
                
                //     const blobURL = URL.createObjectURL(blob);
                
                //     const downloadLink = document.createElement('a');
                //     downloadLink.href = blobURL;
                //     downloadLink.download = file.name;
                
                //     document.body.appendChild(downloadLink);
                
                //     downloadLink.click();
                
                //     document.body.removeChild(downloadLink);
                //   };
                
                //   reader.readAsArrayBuffer(file);
                // });


                
                // const p = document.getElementById('input__file')
                // p.onchange = (e) => {
                //         console.log(e.target.files[0].);
                // }

               // const p = document.getElementById('input__file');
               //  p.onchange = (e) => {
               //    const file = e.target.files[0];
               //    const reader = new FileReader();
                
               //    reader.onload = () => {
               //            API.putUserAvatar(reader.result);
               //    };
                
               //    reader.readAsText(file);
               //  };
            // const avatarInput = document.querySelector('.js-profile__img__form');
            // avatarInput.addEventListener('change', (e) => {
                   
            //     e.preventDefault();
            //     const formData = new FormData(avatarInput);
                

            //     const reader = new FileReader();
            //     reader.onload = (a) => {
            //              console.log(a);
            //         const imgAvatar = document.querySelector('.avatar-img');
            //         imgAvatar.src = reader.result;
            //             API.putUserAvatar(reader.result);
            //     };
            //     const blobUrl = formData.get('object');
            //     reader.readAsDataURL(blobUrl);
            // });
            
            const editBtn = document.querySelector('.js-profile-data__edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    usernameInput.disabled = false;
                    nameInput.disabled = false;
                    surnameInput.disabled = false;
                });
            }

            const canselBtn = document.querySelector('.js-profile-data__cansel-btn');
            if (canselBtn) {
                canselBtn.addEventListener('click', () => {
                    usernameInput.value = context.username;
                    nameInput.value = context.name;
                    surnameInput.value = context.surname;

                    usernameInput.disabled = true;
                    nameInput.disabled = true;
                    surnameInput.disabled = true;
                });
            }

            const saveBtn = document.querySelector('.js-profile-data__save-btn');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    data.username = usernameInput.value;
                    data.name = nameInput.value;
                    data.surname = surnameInput.value;

                    usernameInput.disabled = true;
                    nameInput.disabled = true;
                    surnameInput.disabled = true;

                    API.putUserInfo(data)
                        .then((status) => {
                            if (status) {
                                renderDataPage();
                            } else {
                                console.log('error saving data');
                            }
                        })
                });
            }
            
        })
        .catch((error) => {
            console.error('Ошибка при получении данных о пользователе:', error);
        });
    
}
