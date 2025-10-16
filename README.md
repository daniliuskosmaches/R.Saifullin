# Разделение большого скрипта на модули для того чтоб переписать все 

Добавлена новая модульная структура в папке `js/`:
- `js/config/constants.js` — константы (API_BASE_URL, цены).
- `js/data/data.js` — все данные (персонажи, шоу, мастер-классы, элементы галереи).
- `js/state/appState.js` — глобальное состояние и операции выбора.
- `js/features/search.js` — поиск и фильтрация персонажей.
- `js/ui/notifications.js` — уведомления.
- `js/ui/modals.js` — модальные окна и видео.
- `js/ui/navigation.js` — меню, плавный скролл, IntersectionObserver, маска телефона.
- `js/ui/sliders.js` — рендер карточек и кнопок карусели.
- `js/selection/calculator.js` — подсчет итоговой цены и превью выбранного.
- `js/selection/handlers.js` — обработчики выбора карточек.
- `js/selection/packages.js` — выбор пакета.
- `js/form/validation.js` — валидация и отправка формы.
- `js/main.js` — точка входа.

