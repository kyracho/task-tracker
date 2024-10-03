import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Include routing
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAuth0({
      domain: 'dev-iqiho5corqu6d4zm.us.auth0.com',
      clientId: '9E8uLMc2Wt4xVSLBHfDmjtG8jVN25fpc',
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage'  // This ensures tokens are stored persistently
    })
    
    
  ]
};
