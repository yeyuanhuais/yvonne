"use strict"
import axios from "../lib-1.50/axios";
import Axios from "./core/Axios"

//创建axios实例的方法
function createInstance(defaultConfig){
    const context=new Axios(defaultConfig);
}
export default axios;