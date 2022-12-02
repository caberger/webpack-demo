package at.ac.htl.leonding.demo.entity.user;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;

import com.oracle.svm.core.annotate.Inject;

@RequestScoped
public class UserRepository {
    @Inject EntityManager em;

    public List<User> getAll() {
        return em.createQuery("from User", User.class).getResultList();
    }
}
