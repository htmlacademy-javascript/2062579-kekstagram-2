// форма загрузки изображения
const pictureUploadFormElement = document.querySelector('.img-upload__form');
// элемент слайдера
const effectSliderElement = pictureUploadFormElement.querySelector('.effect-level__slider');
// скрытое поле для значения
const effectLevelValueElement = pictureUploadFormElement.querySelector('.effect-level__value');
// поле предварительного просмотра изображения
const imgUploadPreviewElement = pictureUploadFormElement.querySelector('.img-upload__preview');
// блок загрузки фото с наложением эффекта
const effectLevel = pictureUploadFormElement.querySelector('.img-upload__effect-level');

// создаю слайдер
noUiSlider.create(effectSliderElement, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

effectSliderElement.noUiSlider.on('update', () => {
  effectLevelValueElement.value = effectSliderElement.noUiSlider.get();
});
// убираю слайдер по умолчанию
effectLevel.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if(effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }

  switch (effect) {
    // нет эффекта
    case 'none':
      imgUploadPreviewElement.style.filter = 'none';
      break;
    // эффект хром
    case 'chrome':
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      effectSliderElement.noUiSlider.on('update', () => {
        imgUploadPreviewElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
      });
      break;
    // эффект сепия
    case 'sepia':
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 0,
        step: 0.1,
      });
      effectSliderElement.noUiSlider.on('update', () => {
        imgUploadPreviewElement.style.filter = `sepia(${effectLevelValueElement.value})`;
      });
      break;
    // эффект марвин
    case 'marvin':
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      effectSliderElement.noUiSlider.on('update', () => {
        imgUploadPreviewElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
      });
      break;
    // эффект фобос
    case 'phobos':
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      effectSliderElement.noUiSlider.on('update', () => {
        imgUploadPreviewElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
      });
      break;
    // эффект зной
    case 'heat':
      effectSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      effectSliderElement.noUiSlider.on('update', () => {
        imgUploadPreviewElement.style.filter = `brightness(${effectLevelValueElement.value})`;
      });
  }
};

export {onEffectChange};
