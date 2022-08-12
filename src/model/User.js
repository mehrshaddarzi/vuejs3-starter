export class User {

    static async all(args = {}) {
        let _default = {}
        let params = _.merge(_default, args)

        // @see https://roocket.ir/articles/asynchronous-javascript-using-async-await
        // @see https://masteringjs.io/tutorials/axios/get-query-params
        // @see https://axios-http.com/docs/handling_errors
        let data = await axios.get('users', { params: params })
            .then(function (response) {
                return { ...response, success: true };
            })
            .catch(function (error) {
                return { ...error.response, success: false };
            });

        return data;
    }

    static async get(user_id = null) {
        let data = await axios.get('users/' + parseInt(user_id))
            .then(function (response) {
                return { ...response, success: true };
            })
            .catch(function (error) {
                return { ...error.response, success: false };
            });

        return data;
    }
}