[![Actions Status](https://github.com/ivan-nor/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/ivan-nor/frontend-project-12/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/71398afb8f0b1ebe65bc/maintainability)](https://codeclimate.com/github/ivan-nor/frontend-project-12/maintainability)


# Онлайн-чат на React с авторизацией на JWT

Этот проект представляет собой простой онлайн-чат, разработанный с использованием технологий React, Redux/Toolkit и JWT-авторизацией. В проекте также используются Formik, Yup, i18next, Bootstrap и Rollbar.

---

### Установка и запуск проекта

Для установки зависимостей выполните следующую команду:
```
make install
```

Для развертывания проекта в режиме разработки используйте команду:

```
make develop
```

Для сборки продакшн версии приложения выполните:

```
make build
```

### Описание функциональности
- **Авторизация**: Пользователи могут войти в систему с помощью `JWT`-авторизации. Для ввода данных используется форма, разработанная с использованием `Formik` и `Yup` для валидации.
- **Чат**: Зарегистрированные пользователи могут отправлять сообщения в чат, который работает в реальном времени. Для обмена сообщениями используются `WebSocket`-подключения. Нецензурные слова фильтруются с использованием библиотеки `leo-profanity`.
- **Локализация**: Используется `i18next` для поддержки локализации интерфейса на разных языках.
- **Дизайн**: Интерфейс чата разработан с использованием `Bootstrap` для быстрой и удобной стилизации. В дальнейшем мигрирован на `MDBootstrap`
- **Мониторинг ошибок**: Интегрирован сервис мониторинга ошибок `Rollbar` для быстрого обнаружения и устранения проблем в приложении.