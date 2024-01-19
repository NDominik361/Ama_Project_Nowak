/*
package com.example.demo.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserDetail implements UserDetails {
    private String username;
    private String password;
    private String actingUser;
    @Builder.Default
    private List<String> roles = new ArrayList<>();
    @Setter(AccessLevel.NONE)
    private String rolesDisplayString = "";
    @Builder.Default
    private List<String> permissions = new ArrayList<>();

    public UserDetail(String username, String password, String actingUser, List<String> roles, List<String> permissions) {
        this.username = username;
        this.password = password;
        this.actingUser = actingUser;
        this.roles = roles;
        this.rolesDisplayString = rolesDisplayString;
        this.permissions = permissions;
    }

    public UserDetail(Authentication authentication){
        setUsername(authentication.getName());
        setRolesAsAuthorities(authentication.getAuthorities());
        setRolesDisplayString();
    }


    private void setRolesDisplayString() {
        rolesDisplayString = roles.stream()
                .map(s -> s.replace("ROLE_",""))
                .collect(Collectors.joining(", "));
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles
                .stream()
                .map(s -> new SimpleGrantedAuthority(s))
                .collect(Collectors.toList());
    }



    public void setRolesAsString(String commaSeparatedRoles) {
        if (commaSeparatedRoles != null && !commaSeparatedRoles.trim().isEmpty()) {
            roles.clear();
            roles.addAll(Arrays.asList(commaSeparatedRoles.split(",")));
        }
    }

    public void setRolesAsAuthorities(Collection<? extends GrantedAuthority> authorities){
        if (authorities!=null){
            roles = authorities.stream()
                    .map(a -> ((GrantedAuthority) a).getAuthority())
                    .collect(Collectors.toList());
        }
    }

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public String getRolesAsString(){
        return roles
                .stream()
                .collect(Collectors.joining(","));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public boolean isEnabled() {
        return true;
    }

}
*/
