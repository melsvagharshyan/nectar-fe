# NECTAR Estate UI

Кликабельный UI/UX-прототип для российского брокера, армянского брокера и администратора.

Работает только с демонстрационными данными в памяти браузера: без backend, базы данных, авторизации и CRM-интеграции.

## Стек

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Hook Form + Zod · react-icons

## Запуск

Требуется Node.js 22.12 или новее.

```bash
npm install
npm run dev
```

Приложение откроется в браузере на [http://localhost:5173](http://localhost:5173).

## Скрипты

| Команда             | Назначение                                     |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | dev-сервер с hot reload                        |
| `npm run build`     | проверка типов и production-сборка в `dist/`   |
| `npm run preview`   | локальный просмотр production-сборки           |
| `npm run typecheck` | проверка типов TypeScript                      |
| `npm test`          | unit-тесты                                     |
| `npm run test:e2e`  | e2e-тесты Playwright (сервер запускается сам)  |

Для e2e нужен браузер Playwright (`npx playwright install chromium`) либо установленный Chrome: `PW_CHANNEL=chrome npm run test:e2e`.

## Кабинеты

Роль переключается в шапке приложения или по адресу:

- `/broker/workspace` — российский брокер;
- `/partner/requests` — армянский брокер;
- `/admin/overview` — администратор.

## Структура

```text
src/
├── app/          # оболочка приложения, роутер, шапка
├── pages/        # страницы: components/ + utils/ внутри каждой
├── features/     # общие сценарии (панели, формы, редактор объекта)
├── components/   # переиспользуемые UI-компоненты и поля форм
├── demo/         # демо-данные и модель состояния
└── utils/        # общие константы, хелперы, типы, Tailwind-классы
```
