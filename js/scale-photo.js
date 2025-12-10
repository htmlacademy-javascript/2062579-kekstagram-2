const SCALE_PARAMETERS = { // параметры для масштаба
  MIN: 25,
  MAX: 100,
  STEP: 25
};
const scaleControlValue = document.querySelector('.scale__control--value'); // поле значения масштаба
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

/* обработчик кнопки уменьшения масштаба */
const onClickDownscaleButton = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > SCALE_PARAMETERS.MIN) {
    scaleValue -= SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.transform = `scale(${scaleValue}%)`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

/* обработчик кнопки увеличения масштаба */
const onClickUpscaleButton = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < SCALE_PARAMETERS.MAX) {
    scaleValue += SCALE_PARAMETERS.STEP;
    uploadImagePreview.style.transform = `scale(${scaleValue}%)`;
    scaleControlValue.value = `${scaleValue}%`;
  }
};

export { SCALE_PARAMETERS, onClickUpscaleButton, onClickDownscaleButton };
