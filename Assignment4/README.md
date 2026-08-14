# Banking Transaction System

## Assignment

### Objective

Design and implement a **Banking Transaction System** using Java, incorporating the concepts of **static**, **abstract**, and **final**.

---

## Requirements

### 1. Static

- Implement a `Bank` class with a **static** variable `totalAccounts` to keep track of the total number of bank accounts.
- Create a **static** method `getTotalAccounts()` that returns the current value of `totalAccounts`.
- Use the **static** keyword so that `totalAccounts` is shared among all instances of the `Bank` class.

---

### 2. Abstract

- Create an **abstract** class `Account` with abstract methods:
  - `deposit()`
  - `withdraw()`
  - `getBalance()`
- Implement concrete methods for common functionality in the `Account` class.
- Create two subclasses:
  - `SavingsAccount`
  - `CheckingAccount`
- Implement account-specific functionality for deposit, withdrawal, and balance retrieval in each subclass.

---

### 3. Final

- Design a `Transaction` class with **final** methods such as `performTransaction()` to ensure that the transaction process remains consistent across all instances.
- Create a **final** variable `transactionFee` representing a fixed fee for every transaction.
- Demonstrate how the **final** methods and variables help maintain the integrity of the transaction process.
