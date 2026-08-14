package Assignment4;

public class Main {

    public static void main(String[] args) {

        SavingsAccount savings = new SavingsAccount(101, "Shivraj", 5000);

        CheckingAccount checking = new CheckingAccount(201, "Rahul", 3000);

        Transaction transaction = new Transaction();

        transaction.performTransaction(savings, "deposit", 1000);

        transaction.performTransaction(savings, "withdraw", 2000);

        transaction.performTransaction(checking, "withdraw", 3500);

        System.out.println("\nTotal Accounts : " + Bank.getTotalAccounts());
    }
}