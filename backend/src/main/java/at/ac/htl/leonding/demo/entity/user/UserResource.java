package at.ac.htl.leonding.demo.entity.user;

import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import com.oracle.svm.core.annotate.Inject;

@Path("/user")
public class UserResource {
    @Inject UserRepository userRepository;
    @Inject UserMapper userMapper;
    @GET
    public List<UserDto> getUsers() {
        return userRepository.getAll().stream().map(user -> userMapper.toResource(user)).collect(Collectors.toList());
    }
}
