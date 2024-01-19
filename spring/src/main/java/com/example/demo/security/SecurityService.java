/*
package com.example.demo.security;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Scope("singleton")
@Service
public class SecurityService {

    @Autowired
    private UserRepo userRepo;

    public Optional<User> getActiveUser() {
        UserDetail userDetail = getLoggedInUser();
        Optional<User> user = userRepo.findUserByLoginname(userDetail.getUsername());
        if (user.isEmpty())
            user = userRepo.findUserByLoginname("System");
        return user;

    }



    public Optional<User> getActingUser() {
        UserDetail userDetail = getLoggedInUser();
        Optional<User> user = userRepo.findUserByLoginname(userDetail.getActingUser());
        if (user.isEmpty())
            return getActiveUser();
        return user;

    }


    public UserDetail getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetail user;
        if (authentication == null) {
            user = new UserDetail("System", "", null, List.of("SYSTEM"), new ArrayList<>());
        } else {
            user = new UserDetail(authentication);
        }

        return user;
    }
    

}
*/
