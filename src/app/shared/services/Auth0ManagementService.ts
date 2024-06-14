import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

interface AuthResponse {
  access_token: string;
}

@Injectable({providedIn: "root"})
export class Auth0ManagementService {



  constructor(private http: HttpClient) {}

  async getManagementToken(){
    if (null === localStorage.getItem('management_token')){
      const authTokenURL = `https://${environment.auth0Client.domain}/oauth/token`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      const body = {
        client_id: environment.auth0Client.managementId,
        client_secret: environment.auth0Client.managementSecret,
        audience: environment.auth0Client.managementAudience,
        grant_type: 'client_credentials'
      };
      const response = await this.http.post<AuthResponse>(authTokenURL, body, httpOptions).toPromise();
      localStorage.setItem('management_token', response.access_token);
    }
    return localStorage.getItem('management_token');
  }

  async getUserRole(userId: string) {
    if (null === localStorage.getItem('user_role')) {
      let managementToken = await this.getManagementToken();
      const url = `https://${environment.auth0Client.domain}/api/v2/users/${userId}/roles`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${managementToken}`,
        })
      };
      const response_get = await this.http.get<any>(url, httpOptions).toPromise();
      localStorage.setItem('user_role', response_get[0].name);
    }
    return localStorage.getItem('user_role');
  }



}
