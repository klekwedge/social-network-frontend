# vk-test-frontend

## Оглавление

- [Инструкции по развертыванию](#инструкции-по-развертыванию)
- [Обзор](#обзор)
  - [Описание](#описание)
  - [Ссылки](#ссылки)
- [Мой процесс](#мой-процесс)
  - [Стек](#стек)
  - [Что я узнал](#что-я-узнал)
- [Автор](#автор)

## Инструкции по развертыванию

**Для запуска проекта на вашем компьютере должны быть установлены [npm](https://nodejs.org/en/) и [git](https://git-scm.com/downloads)**

1. Сделайте клон этого репозитория ```git clone https://github.com/klekwedge/vk-test-fullstack.git```
2. Установите все необходимые пакеты npm с помощью ```npm i```
3. Запустите проект командой ```npm run dev```

## Обзор

### Описание

Требуется написать аналог социальной сети с ограниченным функционалом.

#### Требования

- Страница авторизации с возможностью зарегистрироваться и войти в свой аккаунт
- Страница пользователя с аватаркой, кратким описанием (возраст, город, вуз) и постами, которые он написал. Если вы открыли свою страницу, должно быть поле для написания нового поста (есть возможность прикрепить одну фотографию к посту). Если вы открыли страницу другого пользователя там должна быть кнопка "Добавить в друзья" или "Удалить из друзей" с соответствующим функционалом. Должна быть возможность перейти по url на страницу пользователя.
- (опционально) Страница поиска по людям. На странице должен быть инпут для ввода имени и список найденных по имени людей.
- Страница с лентой, где в хронологическом списке отображаются посты от всех пользователей которых вы добавили в друзья. (плюсом будет реализация бесконечного скролла с подгрузкой по мере прокрутки). Посты в ленте можно лайкнуть и на них отображается суммарное колличество лайков (можно без подробностей кто лайкнул, только число)
- Страница со списком ваших друзей, при клике на пользователя переходим на его страницу. Также должна быть возможность удалить из друзей прямо из списка
- (опционально) Страница с сообщениями, где списком отображаются все переписки. Можно зайти в переписку и отправить сообщение, после чего другой пользователь увидит это сообщение у себя.

Дизайн пользовательского интерфейса остается на усмотрение, можно взять за эталон соц сеть ВКонтакте, либо аналоги.

#### Технологии

Фронтенд и бэкенд должны общаться посредством rest api запросов. Фронтенд должен быть написан на React с использованием typescript. Запрета на использование react библиотек нет. В CSS верстке нужно показать умение пользоваться flexbox и grid. Бэкенд можно написать на nodejs, либо на любой удобной вам технологии и языке. Базу данных также можно выбрать любую.

#### Решение

Решение нужно предоставить в виде ссылок на открытые github репозитории. Также должна быть возможность воспользоваться приложением. Для этого фронтенд должен быть размещен на github pages (либо аналогах), а бэк на Google App Engine/Fly.io или другом аналогичном сервисе с возможностью бесплатного размещения тестового приложения. Базу данных можно бесплатно разместить на mongodb.com или аналогичных сервисах, если другая БД. В результате фронтенд на github pages должен общаться с бэкендом, который размещен в стороннем сервисе через rest api. Таким образом можно будет наглядно увидеть проделанную работу. Также можно разместить приложение на своем хостинге. Главное чтобы была возможность воспользоваться соц сетью.

В ответ необходимо добавить ссылки на github репозитории с решением. А также ссылки, по которым можно воспользоваться приложением.

### Ссылки

- [Ссылка на Frontend проект](https://github.com/klekwedge/social-network-frontend)
- [Frontend деплой](https://social-network-frontend.vercel.app/)

- [Ссылка на Backend проект](https://github.com/klekwedge/social-network-frontend)
- [Backend деплой](https://social-network-frontend.vercel.app/)

## Мой процесс

### Стек

- React
- TypeScript
- Node.js
- Express.js
- Mongo DB
- SCSS
- Chakra UI

### Что я узнал

Познакомился с MERN стеком: научился писать бекенд с помощью express, работать с mongodb. Улучшил понимание взаимодействия Frontend и Backend. Научился создавать контроллеры для бекенда, обрабатывать ошибки, валидировать полученные запросы, разобрался как работает JWT токены.

## Автор

- [Вебсайт](https://klekwedge-cv.vercel.app/)
- [Linkedin](https://www.linkedin.com/in/klekwedge/)
- [Facebook](https://www.facebook.com/klekwedge)
