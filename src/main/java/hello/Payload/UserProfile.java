package hello.Payload;

public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private String contactno;
    private String email;
//    private Instant joinedAt;
//    private String address;
//    private Long pollCount;
//    private Long voteCount;

    public UserProfile(Long id, String username, String name, String contactno, String email) {
        this.id = id;
        this.username = username;
        this.name = name;
        //this.joinedAt = joinedAt;
        this.contactno = contactno;
        this.email = email;
//        this.address = address;
//        this.pollCount = pollCount;
//        this.voteCount = voteCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactno() {
        return contactno;
    }

    public void setContactno(String contactno) {
        this.contactno = contactno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

//    public Instant getJoinedAt() {
//        return joinedAt;
//    }
//
//    public void setJoinedAt(Instant joinedAt) {
//        this.joinedAt = joinedAt;
//    }

//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }





//    public Long getPollCount() {
//        return pollCount;
//    }
//
//    public void setPollCount(Long pollCount) {
//        this.pollCount = pollCount;
//    }
//
//    public Long getVoteCount() {
//        return voteCount;
//    }
//
//    public void setVoteCount(Long voteCount) {
//        this.voteCount = voteCount;
//    }
}
