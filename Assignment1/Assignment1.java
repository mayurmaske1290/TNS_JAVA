package Assignment1;
import java.util.*;

public class Assignment1 {
    public void getData() {
        Scanner scn = new Scanner(System.in);

        System.out.print("Enter Student Name: ");
        String name = scn.nextLine();

        System.out.print("Enter Student Roll No: ");
        int rollNo = scn.nextInt();

        System.out.print("Enter Student Grade: ");
        String grade = scn.next();

        System.out.print("Enter Student Percentage: ");
        double per = scn.nextDouble();

        System.out.println(name);
        System.out.println(rollNo);
        System.out.println(grade);
        System.out.println(per);

    }

    public static void main(String[] args) {
        Assignment1 s1 = new Assignment1();

        s1.getData();
    }

}
