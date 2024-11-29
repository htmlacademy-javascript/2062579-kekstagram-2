// шаг изменения масштаба
const SCALE_STEP = 0.25;
// начальное значение масштаба
const START_SCALE = 1;
// кнопка уменьшения масштаба
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
// кнопка увеличения масштаба
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
// поле отображения масштаба
const scaleControlValueElement = document.querySelector('.scale__control--value');
// изображение
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
// масштаб
let scale = 1;

// уменьшаем масштаб
scaleControlSmallerElement.addEventListener('click', () => {
  if (scale > 0.25 && scale <= 1) {
    imgUploadPreviewElement.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControlValueElement.value = `${scale * 100}%`;
  }
});
// увеличиваем масштаб
scaleControlBiggerElement.addEventListener('click', () => {
  if (scale >= 0.25 && scale < 1) {
    imgUploadPreviewElement.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControlValueElement.value = `${scale * 100}%`;
  }
});

// функция сброса масштаба на начальное значение
const resetScale = () => {
  scale = START_SCALE;
  imgUploadPreviewElement.style.transform = `scale(${scale})`;
};

export {resetScale};
