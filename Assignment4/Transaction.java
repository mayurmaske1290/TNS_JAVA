package Assignment4;

public class Transaction {

    private final double transactionFee = 10;

    public final void performTransaction(Account account, String type, double amount) {

        System.out.println("\n----- Transaction Started -----");

        if (type.equalsIgnoreCase("deposit")) {

            account.deposit(amount - transactionFee);

        } else if (type.equalsIgnoreCase("withdraw")) {

            account.withdraw(amount - transactionFee);

        } else {

            System.out.println("Invalid Transaction");

        }

        System.out.println("Transaction Fee: Rs" + transactionFee);
        System.out.println("Current Balance: Rs" + account.getBalance());

        System.out.println("----- Transaction Completed -----");
    }
}