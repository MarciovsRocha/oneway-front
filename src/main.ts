import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from "@auth0/auth0-angular";

appConfig.providers.push(
  provideAuth0(
    {
      domain: 'dev-t7gb76j6z1drza64.us.auth0.com',
      clientId: 'VXP9kXeqzxFHtf52hR7XKUbrUpD0KGxE',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }
  )
)
 bootstrapApplication(AppComponent, appConfig)
   .catch((err) => console.error(err));
