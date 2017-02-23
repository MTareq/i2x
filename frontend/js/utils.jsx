var utils = {
    handleErrors(res){
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res;
    },

    login(username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    },

    logout() {
        delete localStorage.token
    },

    loggedIn() {
        return !!localStorage.token
    },

    getToken(username, pass, cb) {
        let data = {method: 'post',  
                    headers: {  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  },  
                    body: 'username='+username+'&password='+pass 
        }

        console.log(data)
        fetch('/api/login/', data)
            .then(this.handleErrors)
            .then((res)=> res.json())
            .then((data)=>{
                cb({ authenticated: true, token: data.token }) 
            }).catch((error)=> {  console.log('Request failed', error);  });
    },
    getCurrentUser(cb){
        let data = {method: 'get',  
                    headers: {"Authorization": "Token "+localStorage.token },  
        }
        fetch('/api/users/i', data)
            .then(this.handleErrors)
            .then((res)=> res.json())
            .then((data)=> cb(data))
            .catch((error)=>{})

    }
}

export default utils;
