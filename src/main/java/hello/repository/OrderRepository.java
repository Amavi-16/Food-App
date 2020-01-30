package hello.repository;

import hello.Model.Order;
import hello.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUsersAndOrderId(User users, long id);

//    boolean findByUsersAndOrderId(Long Id);
}
