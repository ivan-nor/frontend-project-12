export default {
  translation: {
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      title: 'Войти',
      submit: 'Войти',
      footer: {
        label: 'Нет аккаунта?',
        link: 'signup',
        title: 'Регистрация'
      }
    },
    signup: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      title: 'Регистрация',
      submit: 'Зарегистрироваться'
    },
    authButton: {
      login: 'Войти',
      logout: 'Выйти'
    },
    header: {
      logo: 'Hexlet',
      link: 'Chat',
      title: 'Hexlet chat'
    },
    modal: {
      add: {
        title: 'Создание канала',
        submit: 'Создать',
        placeholder: 'Имя канала'
      },
      rename: {
        title: 'Переименование канала',
        submit: 'Переименовать',
        placeholder: 'Введите имя канала'
      },
      remove: {
        title: 'Удаление канала',
        submit: 'Удалить'
      },
      label: 'Имя канала'
    },
    messages: {
      errors: {
        network: 'Ошибка соединения',
        signup: 'Такой пользователь уже существует',
        login: 'Неверные имя пользователя или пароль',
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        passwordMin: 'Не менее 6 символов',
        passwordMax: '',
        required: 'Обязательное поле',
        passwordLength: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        channelNameLength: 'От 3 до 20 символов',
        channelName: 'Канал уже существует',
        errorPage: 'Запрашиваемой страницы не существует'
      },
      success: {
        login: 'Вход успешно выполнен',
        signup: 'Пользоваль зарегистрирован',
        channelAdded: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён'
      },
      info: 'Ожидание ответа'
    },
    channels: {
      title: 'Каналы',
      add: '+',
      rename: 'Переименовать',
      remove: 'Удалить'
    },
    chat: {
      title: 'Канал',
      user: 'Пользователь'
    },
    message: {
      submit: 'Отправить',
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...'
    }
  }
}
