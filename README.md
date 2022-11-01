## nces-test-task ##

#### This application is a test task from [Национальный центр электронных услуг](https://nces.by/).


There's support for the following features:

* Getting data from the API of the National Bank of the Republic of Belarus on the change in the exchange rate of a given currency for a given period of time and displaying it on a graph.

## How to run this?
```bash

$ git clone https://github.com/EvgenyLeshevich/nces-test-task.git
$ cd nces-test-task
$ chmod +x ./gradlew (for linux)
$ ./gradlew bootRun
```

## UI Docs ##

Accessible at `http://localhost:8080` once the app is running.

You can select the currency and date you need and get a chart.

![image](https://user-images.githubusercontent.com/73518823/199078736-81c18c62-5c20-485c-86f1-e98196ec8c56.png)
