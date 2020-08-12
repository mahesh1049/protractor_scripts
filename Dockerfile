FROM node:10

#RUN mkdir -p /app/

WORKDIR /usr/src/app

RUN apt-get update; apt-get clean

RUN apt-get install -y default-jre default-jdk

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN apt-get update && apt-get -y install google-chrome-stable

EXPOSE 4444

#COPY ["conf1.js","startup.sh", "conf.js","todo-spec.js","./"]

#COPY ["startup.sh", "./"]

RUN npm install -g protractor

RUN npm install  protractor-html-reporter-2

RUN npm install  jasmine-reporters

RUN npm install fs-extra

#RUN npm install

RUN webdriver-manager update

#RUN webdriver-manager start --detach

#CMD [ "protractor", "conf.js" ]

COPY ["startup.sh", "./"]

RUN chmod +x startup.sh

#CMD ["./startup.sh"]

ENTRYPOINT ["./startup.sh"]
