FROM node:21.4.0
WORKDIR /app
EXPOSE 3000
COPY . .

WORKDIR /app/frontend
RUN echo "Installing npm modules..." && \ 
    npm install || exit 1 && \
    echo "npm modules installed." && \
    npm cache clean --force
# Copy files for app
RUN npm run build:prod

WORKDIR /app/backend
# Install npm modules for app
RUN echo "Installing npm modules..." && \ 
    npm install || exit 1 && \
    echo "npm modules installed." && \
    npm cache clean --force
# Copy files for app
RUN npm run build
# Start app
CMD ["npm","start"]