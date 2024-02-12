# Layer Separation with SOLID and Clean Architecture
This project uses the business domain of finance transactions (i. e. when you have payment transactions in an ecommerce) to apply SOLID principles and some principles of Clean Arch.

## 📝 Requirements

- [Docker](https://www.docker.com/get-started/)
- [NodeJs](https://nodejs.org/en/download/current)

## ⚙️ How is this project organized?
As stated previously, this project is using principles of Clean Arch to separate the software layers, these layers we can see below:
![image](https://github.com/ByINTI/INTI_backend/assets/19143379/08d56306-c2c0-45fd-b9db-3a0a62fc6356)


### Domain Layer: Entities
In this project we have some entities, they hold Enterprise Business Rules as we can se in the diagram above, these entities are:
- Transaction: Manage and controls installments with its values;
- Installment: Holds information regarding installments, such as amount and installment number.

Of course exists a way to manage entities' data, for this we're working with Repository Patterns in the interface TransactionRepository.

### Application Layer: Use Cases 
We also have some use cases responsible for Application Business Rules, they represents a single task that a system needs do perform:
- CreateTransaction: This usecase creates the installments an the transactions, it receives an instance of TransactionRepository to do this;
- GetTransaction: This usecase simply get the transactions by using the TransactionRepository abstraction.

### I/O (Frameworks and Adapters Layer): API, Database and Repository
This layer is responsible to isolate each external interaction (and dependency) with software's core by isolating and using dependency inversion principle to communicate through Interfaces and Adapters with application layer. In this layer we have some Infra interactions with application layer:
- API: The API handles all HTTP request using the famous pattern of routes, it's also responsible to manages the Http Server of this application, where we also have an ExpressServer isolating every detail of its implementation;
- Database: In Database we have the configuration of our postgress, but not just this, it implements the Connection interface that ensures the software will never depends only on Postgres' implementation;
- Repository: In repository we have each repository implementation, where s possible to implement one repository for each Entity or specific needs.

### Tests
Exists 3 simple tests in this project:
- CreateTransaction: Tests transaction creation using CreateTransaction and GetTransaction use cases;
- Transaction: Tests the transaction and installment creation using Transaction entity;
- Main test: Is a integration testing that create HTTP requests to endpoints that creates and get transactions' data.

## 💡 Features
You can see below the endpoints available in this software:
Sure, here's a table in markdown format with the requested data:
Apologies for that oversight. Here's the corrected table with all columns included:

| HTTP Endpoint                    | Body Example                                                | Response Example                                     | HTTP Code |
|---------------------------------|-----------------------------------------------------|------------------------------------------------------|-----------|
| POST http://localhost:3000/transactions | {"code": <code>, "amount": 1000, "numberInstallments": 12, "paymentMethod": "credit_card"} | -                                                    | Status Code of the response (e.g., 200, 404) |
| GET http://localhost:3000/transactions/{code} | -                                                   | {"code": "1", "amount": 1000, "numberInstallments": 12, "paymentMethod": "credit_card", "installments": [{"number": 1, "amount": 83.33}, {"number": 2, "amount": 83.33}, {"number": 3, "amount": 83.33}, {"number": 4, "amount": 83.33}, {"number": 5, "amount": 83.33}, {"number": 6, "amount": 83.33}, {"number": 7, "amount": 83.33}, {"number": 8, "amount": 83.33}, {"number": 9, "amount": 83.33}, {"number": 10, "amount": 83.33}, {"number": 11, "amount": 83.33}, {"number": 12, "amount": 83.37}] } | Status Code of the response (e.g., 200, 404) |

## 🚀 How to Run?
For this project would be better for you to have Docker and Docker Compose on your machine.

### 🐋 Using Docker:
Simply run:
```console
foo@bar:~$ docker-compose up
```
The docker console will be attached to your terminal, starting node and PostgreSQL.

## ✅ Testing
To test you should first access the node terminal using:
```console
foo@bar:~$ docker-compose exec app bash
```

Inside the container, you should run `npm test` in order to execute the tests.

## ⚙️ Made With:

- TypeScript 5.3.3
- NodeJS 18.18.2
- PostgreSQL 14.0.0
- Express 4.18.2
- Axios 1.6.7
- Jest 29.7.0
- Docker 24.0.7
- Docker Compose 1.29.2

## 🧑🏻‍💻 Author

_Matheus Oliveira da Silva_ - [Github](https://github.com/matheusolivesilva) | [Linkedin](https://www.linkedin.com/in/matheusoliveirasilva/)



