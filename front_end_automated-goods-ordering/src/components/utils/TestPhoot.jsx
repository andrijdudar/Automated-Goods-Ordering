import { useState } from "react";
import cn from "classnames";
import './TestPhoto.css';
import { addFileServer, addTextServer, getDataServer } from "../utils/photo";
// import { SERVER_URL } from "../services/httpClient";

export const TestPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const reset = () => {
    setSelectedFile(null)
  }

  ////#region
  // useEffect(() => {
  //   fetch(SERVER_URL, {
  //     method: "get",
  //     headers: new Headers({
  //       "ngrok-skip-browser-warning": "69420",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // });



  // const hendleSubmitText = async (data) => {
  //   try {
  //     const response = await fetch('https://4d2c-46-119-118-70.ngrok-free.app/api/dishes/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log('Data successfully sent to the server');
  //     } else {
  //       console.error('Failed to send data to the server');
  //     }
  //   } catch (error) {
  //     console.error('Error while sending data:', error);
  //   }
  // };

  // const hendleSubmitFile = async (selectedFile) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);

  //     const response = await fetch('https://d088-46-119-118-70.ngrok-free.app/api/dishes/add_photo/', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image to the server');
  //     }

  //     console.log('Image uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading image to the server:', error.message);
  //   }
  // };

  // const getData = () => {
    // getDataServer()
    //   .then((data) => {
    //     setLoadingGet(true);
    //     setTimeout(() => {
    //       setLoadingGet(false);
    //       setphotoDataServer(data);
    //       console.log(data);
    //     }, 2000);
    //   })
    //   .catch(() => {
    //     console.error('Помилка отримання фотографії з сервера:');
    //     setLoadingGet(true);
    //     setTimeout(() => {
    //       setLoadingGet(false);
    //       setErrorGet(true);
    //       setTimeout(() => {
    //         setErrorGet(false);
    //       }, 3000);
    //     }, 2000);
    //   });
  // }

  // const hendleSubmit = (event) => { //!сама перша функція з сетами і таймаутами
  //   event.preventDefault();

  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', selectedFile.json());

  //     addPhotoServer(formData)
  //       .then(() => {
  //         setPostOk(true);
  //         setTimeout(() => {
  //           setPostOk(false);
  //         }, 3000);
  //         reset();
  //       })
  //       .catch(() => {
  //         console.error('Помилка завантаження фотографії на сервер:');
  //         setErrorPost(true);
  //         setTimeout(() => {
  //           setErrorPost(false);
  //           reset();
  //         }, 3000);
  //       });
  //   }
  // };


  // const hendleSubmitFile = async (e) => {
  //   e.preventDefault();
  //   // addFileServer(selectedFile);
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   try {
  //     const response = await fetch('https://9ef2-46-119-118-70.ngrok-free.app/api/dishes/add_photo/', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log(result);
  //     } else {
  //       console.error('Failed to upload image');
  //     }
  //   } catch (error) {
  //     console.error('Error during upload:', error);
  //   }
  // };

// const hendleSubmitFile = (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append('file', selectedFile);

//   fetch('https://9ef2-46-119-118-70.ngrok-free.app/api/dishes/add_photo/', {
//     method: 'POST',
//     body: formData,
//   })
//     .then((response) => {
//       if (response.ok) {
//         const result =  response.json();
//         console.log(result);
//       } else {
//         console.error('Failed to upload image');
//       }
//     })
//     .catch((error) => {
//       console.error('Error during upload:', error);
//     })
// };

  // const hendleSubmitFile = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   fetch('https://9ef2-46-119-118-70.ngrok-free.app/api/dishes/add_photo/', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         console.error('Failed to upload image');
  //       }
  //     })
  //     .then((result) => {
  //       console.log(result); // Тут виводимо результат
  //     })
  //     .catch((error) => {
  //       console.error('Error during upload:', error);
  //     });
  // };
////#endregion
  return (
    <div className="container-photo">

      {/* {errorGet &&
        <div class="alert alert-danger" role="alert">
          <p>Помилка отримання фотографії з сервера</p>
        </div>
      }
      {postOk &&
        <div class="alert alert-success" role="alert">
          <p>Фотографія успішно завантажена на сервер</p>
        </div>
      }
      {errorPost &&
        <div class="alert alert-danger" role="alert">
          <p>Помилка завантаження фотографії на сервер</p>
        </div>
      } */}
      <div className="test-photo">
        <form
          // onSubmit={hendleSubmit}
          onReset={reset}
          // action={SERVER_URL + '/dishes/add_photo'}
          // method="POST"
          encType="multipart/form-data"
        >
          <div className="file is-medium is-boxed ">
            <label className="file-label">
              <input
                className="file file-input"
                type="file"
                name="resume"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div>
                  <img className='photo' src={URL.createObjectURL(selectedFile)} alt="Картинка" />
                </div>
              )}
              {!selectedFile && (
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Фото
                  </span>
                </span>
              )}
            </label>
          </div>

          <div className="btn-container">
            <div className="control">
              <button
                type='button'
                className={
                  cn('btn_done', 'btn_add', { 'btn-disableds': !selectedFile })
                }
                onClick={() => addFileServer(selectedFile)}
              >
                Відправити файл
              </button>
            </div>

            <div className="control">
              <button
                type='reset'
                className={
                  cn('btn_cencel', 'btn_dell', { 'btn-disableds': !selectedFile })
                }
              >
                Скасувати
              </button>
            </div>
          </div>
        </form>
        <button
          type='submit'
          className='btn_done btn_add'
          onClick={() => {
            addTextServer('text')
          }}
        >
          Відправити текст
        </button>
        <div className="test-photo__result">
          <h1>Результат</h1>
          <div className="control">
            <button
              type='submit'
              className="btn_add btn_done"
              onClick={() => {
                getDataServer()
              }}
            >
              Отримати фото з сервера
            </button>
          </div>
          {/*
          {loadingGet && (
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )}
          {photoDataServer && (
            <img className='photo' src={URL.createObjectURL(photoDataServer)} alt="Картинка" />
          )} */}

        </div>
      </div>
    </div>
  );
};

