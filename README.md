# Приложение "Stellar Burgers"

_Проектная работа на курсе Яндекс Практикум_

---


**Stellar Burgers** - это приложение вымышленного ресторана, с помощью которого можно ознакомиться с ассортиментом, собирать и заказывать бургеры.

На главной странице находится меню с ингредиентами, которые можно добавлять в конструктор с помощью, а также менять местами в самом конструкторе. В меню есть категории ингредиентов, быстро перейти к каждому из них можно с помощью _динамических табов_ (по мере скролла _табы_ сами определяют кто из них будет активным).

Также пользователь может зайти в свой личный кабинет. Там можно изменить персональные данные, посмотреть историю заказов и выйти из своей учетной записи.

---

Маршрутизация реализована с помощью **react-router-dom**, также реализованы **защищенные маршруты** (без авторизации доступна только часть функционала приложения). При попытке перейти на маршруты, доступные только **авторизованным** пользователям произойдет перенаправление на страницу входа.

Взаимодействие с сервером происходит посредством:

-    **REST API** - получение списка ингредиентов, регистрация, авторизация, изменение данных о пользователе, отправка заказа.

Управление состоянием хранилища происходит при помощи библиотеки **Redux Toolkit**.

Тестирование написано **Test Last Development** подходом. В приложении есть 2 вида автотестов:

-    **Unit** тестирование (Jest)
-    **E2E** тестирование (Cypress)

Приложение полностью **адаптивное**, минимальная ширина экрана - 320px

---

🔨 Используемые технологии:

-    React
-    Redux Toolkit
-    TypeScript
-    SCSS
