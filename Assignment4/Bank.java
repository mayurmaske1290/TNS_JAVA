package Assignment4;

public class Bank {

    private static int totalAccounts = 0;

    public static void incrementAccounts() {
        totalAccounts++;
    }

    public static int getTotalAccounts() {
        return totalAccounts;
    }
}