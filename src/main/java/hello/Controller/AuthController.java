package hello.Controller;

import hello.Model.Order;
import hello.Model.Role;
import hello.Model.RoleName;
import hello.Model.User;
import hello.Payload.*;
import hello.Security.JwtTokenProvider;
import hello.exception.AppException;
import hello.repository.OrderRepository;
import hello.repository.RoleRepository;
import hello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

  @Autowired
   OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), signUpRequest.getContactno());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

//    @PostMapping("/order/create")
//    public Response<Order> createOrder(
//            @RequestParam(value = "restaurant_id") long restaurant_id,
//            @RequestParam(value = "food_id") long food_id,
//            @RequestParam(value = "quantity") long quantity,
//            @RequestParam(value = "order_date") String order_date,
//            @RequestParam(value = "unit_price") long unit_price,
//            @RequestParam(value = "total_price") long total_price
//    ) {
//        User user = CustomerService.findByUser(getUser());
//        try {
//            Date orderDate = parseDate("dd/MM/yyyy", order_date);
//            return new Response<>(orderService.create(customer, restaurant_id, food_id, quantity, orderDate, unit_price, total_price), ResponseStatus.SUCCESS, "Order created successfully");
//        } catch (ParseException e) {
//            return new Response<>(null, ResponseStatus.ERROR, "Invalid date format");
//        }
//    }
//
//    private User getUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        return .findByUsername(authentication.getName());
//    }

    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder (@Valid @RequestBody PostOrder postOrder) {
//        if(orderRepository.findByUsersAndOrderId(postOrder.getUsers())) {
//            return new ResponseEntity(new ApiResponse(false, "Order is already taken!"),
//                    HttpStatus.BAD_REQUEST);
//        }
        // Creating food's
        Order newOrder = new Order(postOrder.getRestaurantId(),postOrder.getFoodId(), postOrder.getQuantity(), postOrder.getOrderDate(), postOrder.getPickupTime(),
                postOrder.getUnitPrice(),postOrder.getTotalPrice(),postOrder.getCreatedAt(),postOrder.getModifiedAt(),postOrder.getUsers());

        Order result = orderRepository.save(newOrder);
        return new ResponseEntity(new ApiResponse(true, "order registered succesfully!"),
                HttpStatus.ACCEPTED);
    }

}

