FROM python:3.10-slim
# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku requirements.txt
COPY requirements.txt .

# Instalacja zależności
RUN pip install -r requirements.txt

# Kopiowanie wszystkich plików aplikacji
COPY . .

# Ustawienie portu, na którym Flask nasłuchuje
EXPOSE 8080

# Komenda uruchamiająca aplikację
CMD ["python", "app.py"]