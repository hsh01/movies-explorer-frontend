import { REACT_APP_API_BASE_PATH } from "../../config";
import { BaseApi } from "./BaseApi";
import { UserCredentialsModel, UserModel } from "../../models/UserModel";
import { CardModel } from "../../models/movies";

class Api extends BaseApi {

    public register(user: UserModel) {
        return this._request('/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    public authorize(credentials: UserCredentialsModel) {
        return this._request('/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials)
        }, true);
    }

    public logout() {
        return this._request('/signout', {
            method: 'POST',
        }, true);
    }

    public getMe() {
        return this._request('/users/me', undefined, true);
    }

    public patchUser(user: UserModel) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user)
        }, true);
    }

    public getMovies() {
        return this._request('/movies', undefined, true);
    }

    public createMovie(movie: CardModel) {
        return this._request('/movies', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(movie)
        }, true);
    }

    public deleteMovie(movieId: string) {
        return this._request('/movies/:movieId'.replace(':movieId', movieId), {
            method: 'DELETE',
        }, true);
    }


}

const api = new Api({
    baseUrl: REACT_APP_API_BASE_PATH,
});

export { api };