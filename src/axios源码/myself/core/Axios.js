"use strict";
import InterceptorManager from "./InterceptorManager";

class Axios {
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
            request: new InterceptorManger(),
        };
    }
}

export default Axios;
