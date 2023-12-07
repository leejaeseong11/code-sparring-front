<template>
    <div class="video-background">
        <video autoplay muted loop id="myVideo">
            <source src="images/login/mainBackGround.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="login">
            <div>
                <img src="images/login/join.png" alt="join" class="join" @click="signinForm()">
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <form id="joinForm">
                <table>
                    <tr>
                        <td>
                            <h2 style="margin-bottom: 5px;">ID&nbsp;</h2>
                        </td>
                        <td>
                            <span style="top: -3px;">
                                <input type="text" name="id" id="i" v-model="id">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2 style="margin-top: 5px;">PW&nbsp;&nbsp;</h2>
                        </td>
                        <td>
                            <span style="top: 3px;">
                                <input type="password" name="pwd" id="p" v-model="pwd">
                            </span>
                        </td>
                    </tr>
                </table>
           
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <img src="images/login/start.png" alt="start" class="start" @click="loginFormSubmitHandler()">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Login",
    data() {
        return {
            id: '',
            pwd: '',
        }
    },
    methods: {
        // submitForm() {
        //     document.getElementById('joinForm').submit();
        // },
        signinForm() {
            location.href = '/signup'
        },


        loginFormSubmitHandler() {
            const url = `${this.backURL}/auth/login`;
            const data = {
                id: this.id,
                pwd: this.pwd
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                   
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            alert("end loginFormSubmitHandler")

        }
    },



}

</script>
<style scoped>
body,
html {
    height: 100%;
    margin: 0;
    overflow: scroll;
}

.video-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
}

#myVideo {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.login {
    position: fixed;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
}

input {
    height: 20px;
}

.join,
.start {
    width: 100px;
    height: 100px;
    margin-top: 5px;
    cursor: pointer;
}

.join:hover,
.start:hover {
    opacity: 0.85;
}

.join:hover {
    content: url('images/login/join.gif');
}

.start:hover {
    content: url('images/login/start.gif');
}

span {
    position: relative;
}
</style>