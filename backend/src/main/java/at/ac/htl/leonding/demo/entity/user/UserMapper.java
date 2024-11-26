package at.ac.htl.leonding.demo.entity.user;

import jakarta.enterprise.context.ApplicationScoped;

/**
 * Cannot use mapstruct yet until https://github.com/mapstruct/mapstruct/issues/1689 is done.
 */
@ApplicationScoped
public class UserMapper {
    User toResource(UserEntity user) {
        return new User(user.id, user.name);
    }
    UserEntity fromResource(User dto) {
        var user = new UserEntity();
        user.id = dto.id();
        user.name = dto.name();
        return user;
    }
}
