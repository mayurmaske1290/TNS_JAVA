package Assignment4;

public class CheckingAccount extends Account {

    private static final double OVERDRAFT_LIMIT = 1000;

    public CheckingAccount(int accountNumber, String accountHolder, double balance) {
        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited Rs" + amount);
    }

    @Override
    public void withdraw(double amount) {

        if (balance - amount >= OVERDRAFT_LIMIT) {
            balance -= amount;
            System.out.println("Withdrawn Rs" + amount);
        } else {
            System.out.println("Overdraft limit exceeded");
        }

    }

    @Override
    public double getBalance() {
        return balance;
    }
}