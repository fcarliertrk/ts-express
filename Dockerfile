# NodeJS Version 20 
FROM node:20-alpine as build

# Work to Dir
WORKDIR /app

# Copy Dir
COPY . .

# Clean install node packages 
RUN npm ci

# Transpile typescript code into javascript
RUN npm run build

# Set Env
ENV NODE_ENV=production 
EXPOSE 3000

# Cmd script
CMD ["node", "dist/index.js"]
