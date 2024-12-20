package at.ac.htl.leonding.demo.entity.user;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject UserRepository userRepository;
    @Inject UserMapper userMapper;

    @GET
    public List<User> getUsers() {
        return userRepository.listAll().stream().map(user -> userMapper.toResource(user)).collect(Collectors.toList());
    }
    
    @GET
    @Path("/{id:[0-9]+}")
    public Response get(@PathParam("id") long id) {
        final var user = userRepository.findByIdOptional(id);
        final var response = user.isPresent() ? Response.ok(user.get())  : Response.status(Response.Status.NOT_FOUND);
        return response.build();
    }
}
