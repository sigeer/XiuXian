# Compile JS Files
FROM node AS webpack
COPY . .
RUN npm install && npm run build

FROM nginx AS publish
COPY --from=webpack "/dist" "/usr/share/nginx/html/"