const SCALE_PARAMETERS = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};
const scaleControlValue = document.querySelector('.scale__control--value'); // поле значения масштаба
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

const smallPhotoScale = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > SCALE_PARAMETERS.MIN) {
    scaleValue -= SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.scale = `${scaleValue}%`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

const bigPhotoScale = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < SCALE_PARAMETERS.MAX) {
    scaleValue += SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.scale = `${scaleValue}%`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

export { SCALE_PARAMETERS, smallPhotoScale, bigPhotoScale };
