const effectLevelSlider = document.querySelector('.effect-level__slider'); // слайдер
const effectLevelContainer = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const effectLevelValue = document.querySelector('.effect-level__value'); // значение слайдера
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка

let effectName = 'none'; // имя эффекта для инлайн-стиля
let effectParameter = ''; // параметр эффекта для инлайе стиля: px, % или ничего
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
          min: 0,
          max: 100
        },
        step: 1,
      });
      uploadImagePreview.style.filter = 'none';
      effectLevelContainer.classList.add('hidden');
      break;
    case 'effect-chrome':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(1);
      effectName = 'grayscale';
      effectParameter = '';
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-sepia':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(1);
      effectName = 'sepia';
      effectParameter = '';
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-marvin':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        step: 1,
      });
      effectLevelSlider.noUiSlider.set(100);
      effectName = 'invert';
      effectParameter = '%';
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-phobos':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(3);
      effectName = 'blur';
      effectParameter = 'px';
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
    case 'effect-heat':
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        step: 0.1,
      });
      effectLevelSlider.noUiSlider.set(3);
      effectName = 'brightness';
      effectParameter = '';
      uploadImagePreview.style.filter = effectStyle();
      effectLevelContainer.classList.remove('hidden');
      break;
  }
};

export { effectName, effectParameter, effectStyle, checkEffect };
