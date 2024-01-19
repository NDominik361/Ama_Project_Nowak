package com.example.demo.model;

import com.example.demo.model.Base;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.jetbrains.annotations.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.management.relation.Role;
import jakarta.persistence.*;
import java.util.Set;
import java.util.TreeSet;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "user")
public class User extends Base {
    static final private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @NotNull
    @Column(name = "firstname")
    private String firstname;

    @NotNull
    @Column(name = "lastname")
    private String lastname;

    public String getFullName() {
        return firstname + " " + lastname;
    }

    @NotNull
    @Column(name = "loginname", unique = true)
    private String loginname;

    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public void setPassword(String password) {
        if (password == null) return;
        this.password = passwordEncoder.encode(password);
    }

    public void setAlreadyEncodedPassword(String password) {
        this.password = password;
    }

    @Enumerated(EnumType.STRING)
    //If not eager, throws error about not being able to lazily fetch roles, when trying to save an email template
    @ElementCollection(fetch=FetchType.EAGER)
    @Column(name = "role")
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "id_user"), foreignKey = @ForeignKey(name = "FK_User_TO_Role"))
    @OrderBy("role")
    private Set<Role> roles = new TreeSet<>();

    public void addRole(Role role) {
        roles.add(role);
    }

    public void removeRole(Role role) {
        roles.remove(role);
    }

}
