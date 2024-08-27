// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

const photoBox = document.querySelector(".photo-box");
const photographerName = document.querySelector(".photographer-name");
const likeQty = document.querySelector(".like-qty");
const likeBtn = document.querySelector(".like");

// let page = Math.floor(Math.random() * 1);
let page = 1;

async function fetchPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=4BXMuA9urNy7Cpd0hWwPyVhvPDstITjkEc0hjn_nK94`
    );
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Ошибка при загрузке фото:", error);
    return [];
  }
}

async function loadContent() {
  const photos = await fetchPhotos();
  if (photos.length > 0) {
    // console.log(photos[0]);
    const randomIndex = Math.floor(Math.random() * 9);
    const photo = document.createElement("img");
    photo.src = `${photos[randomIndex].urls.small}`;
    photo.alt = photos[randomIndex].alt_description;
    photoBox.append(photo);
    photographerName.textContent =
      "photographer: " + `@${photos[randomIndex].user.instagram_username}`;

    likeQty.textContent = photos[randomIndex].likes + " likes";

    page++;
  }
}

likeBtn.addEventListener("click", () => {
  const newQty = parseInt(likeQty.textContent.split(" ")[0]) + 1;
  likeQty.textContent = newQty + " likes";
});
loadContent();
