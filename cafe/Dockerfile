FROM python:3.9 

# Устанавливаем рабочую директорию 
WORKDIR /cafe 

# Копируем файлы зависимостей 
COPY cafe/requirements.txt .

# Устанавливаем зависимости 
RUN pip install --no-cache-dir -r requirements.txt 

# Копируем весь проект 
COPY . .

# Открываем порт для приложения 
EXPOSE 8000 

# Запускаем сервер Django 
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]