FROM node:20.11.1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y wget gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt update && \
    && apt install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
      --no-install-recommends && service dbus start \
    && rm -rf /var/lib/apt/lists/*


RUN npm install -g npm@10.5.0
RUN npm update
RUN npm i --save puppeteer@22.6.1 express@4.19.2

RUN node -v && npm list  --depth=0
COPY . .

CMD ["node", "server_prerender.mjs"]




