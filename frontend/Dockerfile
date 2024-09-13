FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /frontend

# Копируем файлы зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем сервер для статических файлов (например, serve)
RUN npm install -g serve

# Открываем порт для приложения
EXPOSE 3000

# Запускаем сервер для статических файлов
CMD ["serve", "-s", "build"]