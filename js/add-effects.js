/* параметры эффектов */
const NONE = { // без эффекта
  MIN: 0,
  MAX: 100,
  STEP: 1,
  EFFECT: 'none',
  PARAM: ''
};
const CHROME = { // хром
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  EFFECT: 'grayscale',
  PARAM: ''
};
const SEPIA = { // сепия
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  EFFECT: 'sepia',
  PARAM: ''
};
const MARVIN = { // марвин
  MIN: 0,
  MAX: 100,
  STEP: 1,
  EFFECT: 'invert',
  PARAM: '%'
};
const PHOBOS = { // фобос
  MIN: 0,
  MAX: 3,
  STEP: 0.1,
  EFFECT: 'blur',
  PARAM: 'px'
};
const HEAT = { // хит
  MIN: 1,
  MAX: 3,
  STEP: 0.1,
  EFFECT: 'brightness',
  PARAM: ''
};
const effectLevelSlider = document.querySelector('.effect-level__slider'); // слайдер
const effectLevelContainer = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = document.querySelector('.effect-level__value'); // значение слайдера
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

let effectName = 'none'; // имя эффекта для инлайн-стиля
let effectParameter = ''; // параметр эффекта для инлайн стиля: px, % или ничего
effectLevelContainer.classList.add('hidden'); // скрываем слайдер при загрузке

noUiSlider.create(effectLevelSlider, { // подключаем слайдер
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

const effectStyle = () => `${effectName}(${effectLevelValue.value}${effectParameter})`; // параметр для инлайн-стиля

const checkEffect = (evt) => { // функция выбора эффекта при клике по превьюшке
  const checkedEffect = evt.target.id; // id выбранного эффекта

  switch (checkedEffect) {
    case 'effect-none':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: NONE.MIN,
          max: NONE.MAX
        },
        step: NONE.STEP,
      });
      uploadImagePreview.style.filter = NONE.EFFECT;
      effectLevelContainer.classList.add('hidden');
      break;
    case 'effect-chrome':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: CHROME.MIN,
          max: CHROME.MAX
        },
        step: CHROME.STEP,
      });
      effectLevelSlider.noUiSlider.set(CHROME.MAX);
      effectName = CHROME.EFFECT;
      effectParameter = CHROME.PARAM;
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-sepia':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: SEPIA.MIN,
          max: SEPIA.MAX
        },
        step: SEPIA.STEP,
      });
      effectLevelSlider.noUiSlider.set(SEPIA.MAX);
      effectName = SEPIA.EFFECT;
      effectParameter = SEPIA.PARAM;
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: MARVIN.MIN,
          max: MARVIN.MAX
        },
        step: MARVIN.STEP,
      });
      effectLevelSlider.noUiSlider.set(MARVIN.MAX);
      effectName = MARVIN.EFFECT;
      effectParameter = MARVIN.PARAM;
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: PHOBOS.MIN,
          max: PHOBOS.MAX
        },
        step: PHOBOS.STEP,
      });
      effectLevelSlider.noUiSlider.set(PHOBOS.MAX);
      effectName = PHOBOS.EFFECT;
      effectParameter = PHOBOS.PARAM;
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: HEAT.MIN,
          max: HEAT.MAX
        },
        step: HEAT.STEP,
      });
      effectLevelSlider.noUiSlider.set(HEAT.MAX);
      effectName = HEAT.EFFECT;
      effectParameter = HEAT.PARAM;
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
  }
};

export { effectName, effectParameter, effectStyle, checkEffect };
