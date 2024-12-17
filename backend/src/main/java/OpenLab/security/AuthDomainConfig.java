package OpenLab.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "auth0")
@Data
public class AuthDomainConfig {
    private String AUTH_DOMAIN;
}
