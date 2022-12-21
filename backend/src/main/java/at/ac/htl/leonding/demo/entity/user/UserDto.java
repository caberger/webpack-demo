package at.ac.htl.leonding.demo.entity.user;

// we cannot use java 17 currently, otherwise the jib cannot run it.
//public record UserDto(int id, String name) {
//}

public class UserDto {
    public int id;
    public String name;

    public UserDto(int id, String name) {
        this.id = id;
        this.name = name;
    }
}