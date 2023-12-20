import axios from "axios"
import sweetAlert from './util/modal.js'

var apiClient = null
    apiClient = axios.create({
        // baseURL: "//" + "192.168.1.116:8881/codesparring",
        baseURL: import.meta.env.VITE_BACK_URL,
        withCredentials: true
    })

apiClient.interceptors.request.use(
    function (config) {
    //   config.headers["Content-Type"] = "application/json";
    //   config.headers["Content-Type"] = "multipart/form-data";
      config.headers["Authorization"] = `Bearer ${sessionStorage.getItem('accessToken')}`
      return config
    }
)



apiClient.interceptors.response.use(res => {
        if (!(res.status === 200 || res.status === 201 || res.status === 204)) throw new Error()
        if (res.data.errors) throw new Error(res.data.errors)

        return res
    }

    ,async (error) => {
        if (error.response?.status === 401) {
            sweetAlert.warning("로그인이 필요합니다", '', '로그인창으로 가기').then(() =>{
            window.location.href='/login'
            })
        }
        if (error.response?.status === 403) {
            console.error("403 Forbidden 에러 발생 :", error.response)
            sweetAlert.error("권한이 없습니다", '', '뒤로 가기').then(() =>{
            window.history.back()
          })
        }

        /*if (error.response?.status === 500) {
            console.error("500 Internal Server Error 발생 :", error.response)
            sweetAlert.error(error.response.data.errors[0], '', '닫기').then(() =>{
            })
        }*/
        return Promise.reject(error)
    }

//     ,async (error) => {
//         const err = error;
//         console.log("==================//response================");
//         console.log(error);
//         console.log("==================response//================");
//        if (err.response?.status === 401) {
//            const data = err.response?.data;
//            console.log(err.response);
//            console.log("data====");
//            console.log(data);

//            //if (토큰 재발행) {
//            const param = {
//                'refreshToken' : '',
//                'accessToken':`Bearer ${sessionStorage.getItem('accessToken')}`
//            }

//            console.log(param);
//            // const token = await axios.get('http://127.0.0.1:8881/codesparring/auth/reissue?refreshToken='+param.refreshToken + "&accessToken="+param.accessToken, {
//            //     headers: {
//            //         "Content-Type" : "application/json"
//            //     }
//            // });
//            const token = await axios.post('http://127.0.0.1:8881/codesparring/auth/reissue', param,{
//                headers: {
//                    "Content-Type" : "application/json"
//                }
//            });
//            console.log("token=======");
//            console.log(token);
//            sessionStorage.setItem("accessToken", token);
//            err.config.headers = {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${token}`,
//            };
//            // 중단된 요청을 새로운 토큰으로 재전송
//            const originalResponse = await axios.request(err.config);
//            return originalResponse.data;
//            // }
//        }

//        return Promise.reject(error);
//    }
);

export {apiClient}