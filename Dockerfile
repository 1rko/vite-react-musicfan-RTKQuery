# Базовый образ (Node.js + Alpine Linux)
FROM node:20-alpine

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Рабочая директория в контейнере
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN pnpm run build

# Открываем порт 4173 (Vite preview)
EXPOSE 4173

# Команда для запуска
CMD ["pnpm", "run", "preview", "--host"]