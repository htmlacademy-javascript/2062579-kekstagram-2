export const SCALE_PARAMETERS = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};
export const scaleControlSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения масштаба
export const scaleControlBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличения масштаба
export const scaleControlValue = document.querySelector('.scale__control--value'); // поле значения масштаба
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

export const smallPhotoScale = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > SCALE_PARAMETERS.MIN) {
    scaleValue -= SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.scale = `${scaleValue}%`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

export const bigPhotoScale = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < SCALE_PARAMETERS.MAX) {
    scaleValue += SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.scale = `${scaleValue}%`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

