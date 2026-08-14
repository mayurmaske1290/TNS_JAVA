package Assignment4;

public class SavingsAccount extends Account {

    public SavingsAccount(int accountNumber, String accountHolder, double balance) {
        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited Rs" + amount);
    }

    @Override
    public void withdraw(double amount) {

        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn Rs" + amount);
        } else {
            System.out.println("Insufficient Balance");
        }

    }

    @Override
    public double getBalance() {
        return balance;
    }

}