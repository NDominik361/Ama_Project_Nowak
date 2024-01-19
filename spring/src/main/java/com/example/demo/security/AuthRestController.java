/*
package com.example.demo.security;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.security.JwtUtil;
import lombok.extern.log4j.Log4j2;
import org.hibernate.type.descriptor.converter.internal.EnumHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
@Log4j2
@RestController
@ComponentScan
@CrossOrigin(origins = "*")
public class AuthRestController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private SecurityService securityService;

    @RequestMapping(value = "/auth", method = RequestMethod.GET)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest)  {
        System.out.println("AuthRestController.createAuthenticationToken");
        System.out.println(authenticationRequest);
        System.out.println(authenticationRequest.getUsername());
        System.out.println(authenticationRequest.getPassword());

        System.out.println(securityService.getLoggedInUser());

        // Perform the security

            System.out.println("l");

            final Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );

            System.out.println("lol");

            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("lol2");
            UserDetail user; // = securityService.getLoggedInUser();

            user = securityService.getLoggedInUser();

            System.out.println(securityService.getLoggedInUser());

            final String token = jwtTokenUtil.generateToken(String.valueOf(user));
            System.out.println(token);

            return ResponseEntity.ok(new JwtAuthenticationResponse(token, user));

    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        System.out.println("test");
        return "This is a test";
    }
    @PostMapping(value = "/testt")
    public String testPost() {
        System.out.println("test");
        return "This is a test";
    }
}
*/
