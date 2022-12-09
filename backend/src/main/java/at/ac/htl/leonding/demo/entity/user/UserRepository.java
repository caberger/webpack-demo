package at.ac.htl.leonding.demo.entity.user;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

@ApplicationScoped
public class UserRepository {
    @Inject EntityManager em;

    public List<User> getAll() {
        return em.createQuery("from User", User.class).getResultList();
    }
}
