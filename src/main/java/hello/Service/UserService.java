package hello.Service;

import hello.Model.Customer;
import hello.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomerRepository UserRepository;
    public List<Customer> findAll() {
        return UserRepository.findAll();
    }
    public Optional<Customer> findById(Long id) {
        return UserRepository.findById(id);
    }
    public Customer save(Customer stock) {
        return UserRepository.save(stock);
    }
    public void deleteById(Long id) {
        UserRepository.deleteById(id);
    }
}