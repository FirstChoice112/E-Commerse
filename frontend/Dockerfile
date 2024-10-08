# Steg 1: Bygg React-applikationen
FROM node:18-alpine

# Ställ in arbetskatalogen
WORKDIR /app

# Kopiera package.json och package-lock.json
COPY package.json package-lock.json* ./

# Installera beroenden
RUN npm install

# Kopiera hela projektet
COPY . .

# Bygg projektet för produktion
RUN npm run build

# Exponera port 
EXPOSE 3000


CMD ["npm", "start"]
