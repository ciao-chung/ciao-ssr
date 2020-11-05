FROM node:10

MAINTAINER Ciao Chung

EXPOSE 3000

RUN apt-get update -y \
  && apt-get install -y vim fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0&& \
    libatspi2.0-0 libgtk-3-0 libnspr4 libnss3 libx11-xcb1 && \
    libxss1 libxtst6 lsb-release xdg-utils; exit 0
RUN apt --fix-broken install -y \
  && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && dpkg -i google-chrome*.deb; exit 0
RUN rm -rf google-chrome*.deb \
  && apt-get install -f -y \
  && rm -f google-chrome*.deb \
  && google-chrome --version \
  && yarn global add ciao-ssr pm2 \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && apt-get update -y \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
     --no-install-recommends

CMD ["sh", "-c", "tail -f /dev/null"]