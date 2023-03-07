package at.ac.htl.leonding.demo.entity.user;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject UserRepository userRepository;
    @Inject UserMapper userMapper;
    @GET
    public List<UserDto> getUsers() {
        return userRepository.getAll().stream().map(user -> userMapper.toResource(user)).collect(Collectors.toList());
    }
    
    @GET
    @Path("/{id:[0-9]+}")
    public UserDto get(@PathParam("id") int id) {
        return userMapper.toResource(userRepository.get(id));
    }
    @POST
    @Transactional
    public Response save(UserDto user) {
        var savedUser = userRepository.insert(userMapper.fromResource(user));
        var uri = UriBuilder.fromResource(UserResource.class).path(Integer.toString(savedUser.getId()).toString()).build();
        return Response.created(uri).build();
    }
}
