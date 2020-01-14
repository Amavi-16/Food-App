//package hello.Controller;
//import hello.Model.Customer;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//
//import java.util.List;
//
//import javax.validation.Valid;
//
////
//@RestController
//@RequestMapping("/api/v1/user")
//@Slf4j
//@RequiredArgsConstructor
//public class UserController {
//    private final hello.Service.UserService UserService;
//    @GetMapping
//    public ResponseEntity<List<Customer>> findAll() {
//        return ResponseEntity.ok(UserService.findAll());
//    }
//    @PostMapping
//    public ResponseEntity create(@Valid @RequestBody Customer product) {
//        return ResponseEntity.ok(UserService.save(product));
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<Customer> findById(@PathVariable Long id) {
//        Optional<Customer> stock = UserService.findById(id);
//        if (!stock.isPresent()) {
//            log.error("Id " + id + " is not existed");
//            ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(stock.get());
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Customer> update(@PathVariable Long id, @Valid @RequestBody Customer product) {
//        if (!UserService.findById(id).isPresent()) {
//            log.error("Id " + id + " is not existed");
//            ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(UserService.save(product));
//    }
//
////    @PutMapping("user")
////    public ResponseEntity<Customer> updateUser(@RequestBody Customer user) {
////        UserService.save(user);
////        return new ResponseEntity<Customer>(user, HttpStatus.OK);
////    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity delete(@PathVariable Long id) {
//        if (!UserService.findById(id).isPresent()) {
//            log.error("Id " + id + " is not existed");
//            ResponseEntity.badRequest().build();
//        }
//        UserService.deleteById(id);
//        return ResponseEntity.ok().build();
//   }}
