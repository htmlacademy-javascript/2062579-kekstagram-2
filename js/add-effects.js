/* параметры эффектов */
const EFFECTS = {
  'none': { // без эффекта
    MIN: 0,
    MAX: 100,
    STEP: 1,
    EFFECT: 'none',
    PARAM: ''
  },
  'chrome': { // хром
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    EFFECT: 'grayscale',
    PARAM: ''
  },
  'sepia': { // сепия
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    EFFECT: 'sepia',
    PARAM: ''
  },
  'marvin': { // марвин
    MIN: 0,
    MAX: 100,
    STEP: 1,
    EFFECT: 'invert',
    PARAM: '%'
  },
  'phobos': { // фобос
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    EFFECT: 'blur',
    PARAM: 'px'
  },
  'heat': { // хит
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    EFFECT: 'brightness',
    PARAM: ''
  }
};
const effectLevelSlider = document.querySelector('.effect-level__slider'); // слайдер
const effectLevelContainer = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = document.querySelector('.effect-level__value'); // значение слайдера
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

let effectName = EFFECTS['none'].EFFECT; // имя эффекта для инлайн-стиля
let effectParameter = EFFECTS['none'].PARAM; // параметр эффекта для инлайе стиля: px, % или ничего
effectLevelContainer.classList.add('hidden'); // скрываем слайдер при загрузке

noUiSlider.create(effectLevelSlider, { // подключаем слайдер
  range: {
    min: EFFECTS['none'].MIN,
    max: EFFECTS['none'].MAX
  },
  start: EFFECTS['none'].MAX,
  step: EFFECTS['none'].STEP,
  connect: 'lower'
});

const effectStyle = () => effectName === 'none' ? `${effectName}` : `${effectName}(${effectLevelValue.value}${effectParameter})`; // параметр для инлайн-стиля

const setEffect = (currentEffect) => { // функция установки значений эффектов
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[currentEffect].MIN,
      max: EFFECTS[currentEffect].MAX
    },
    step: EFFECTS[currentEffect].STEP,
  });
  effectLevelSlider.noUiSlider.set(EFFECTS[currentEffect].MAX);
  effectName = EFFECTS[currentEffect].EFFECT;
  effectParameter = EFFECTS[currentEffect].PARAM;
  uploadImagePreview.style.filter = effectStyle();
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden'); // при отсутствии эффекта скрываем слайдер
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
};

const onChangeEffect = (evt) => { // функция выбора эффекта при клике по превьюшке
  const checkedEffect = evt.target.value; // значение выбранного эффекта

  switch (checkedEffect) {
    case 'none':
      setEffect(checkedEffect);
      break;
    case 'chrome':
      setEffect(checkedEffect);
      break;
    case 'sepia':
      setEffect(checkedEffect);
      break;
    case 'marvin':
      setEffect(checkedEffect);
      break;
    case 'phobos':
      setEffect(checkedEffect);
      break;
    case 'heat':
      setEffect(checkedEffect);
      break;
  }
};

const onChangeEffectStyle = () => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    uploadImagePreview.style.filter = effectStyle();
  });
};

export { onChangeEffect, onChangeEffectStyle };
