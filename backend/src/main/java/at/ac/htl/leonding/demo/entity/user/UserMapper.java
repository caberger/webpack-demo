package at.ac.htl.leonding.demo.entity.user;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserMapper {
    public UserDto toResource(User user) {
        return new UserDto(user.getId(), user.getName());
    }
}
