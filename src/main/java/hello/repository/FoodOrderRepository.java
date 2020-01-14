//package hello.repository;
//
//import hello.Model.FoodOrder;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import hello.Model.Customer;
//
//public interface FoodOrderRepository extends JpaRepository<FoodOrder,Long> {
//    FoodOrder findByCustomerAndOrderId(Customer customer, long id);
//}