//package hello.Service;
//
//import hello.Model.Order;
//import hello.Model.User;
//import hello.repository.OrderRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public abstract class OrderServiceImpl implements OrderService {
//    @Autowired
//    OrderRepository orderRepository;
//
//    @Override
//    public Order create(User users, long restaurantId, long foodId, long quantity, Date orderDate, long unitPrice, long totalPrice) {
//        Order order = new Order();
//        order.setUsers(users);
//        order.setRestaurantId(restaurantId);
//        order.setFoodId(foodId);
//        order.setOrderDate(orderDate);
//        order.setUnitPrice(unitPrice);
//        order.setTotalPrice(totalPrice);
//        return orderRepository.save(order);
//    }
//
//    public Order getOrderByCustomerAndId(User users, long id) {
//        return orderRepository.findByUsersAndOrderId(users, id);
//    }
//}
//
