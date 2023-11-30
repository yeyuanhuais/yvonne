//拦截管理器
"use strict";
import utils from "../utils";
class InterceptorManger {
    constructor() {
        this.handlers = [];
    }
    /**
     * 添加拦截器，添加成功、失败回调
     * 拦截器增加两个配置参数 synchronous,runWhen
     * @description Add a new interceptor to the stack
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
        this.handlers.push({
            fulfilled,
            rejected,
            //默认情况下他们被假定为异步的，如果请求拦截器是同步的，可以通过这个参数默认配置，他将告诉axios同步运行代码并避免请求执行中的任何延迟
            synchronous: options ? options.synchronous : false,
            //如果要基于运行时检查执行特定拦截器，可以通过这个runWhen参数，类型为函数
            runWhen: options ? options.runWhen : null,
        });
        return this.handlers.length - 1;
    }
    /**
     * 注销指定拦截器
     * @description Remove an interceptor from the stack
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
        if (this.handlers[id]) {
            this.handlers[id] = null;
        }
    }
    /**
     * 清空所有拦截器
     * @description Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
        if (this.handlers) {
            this.handlers = [];
        }
    }
    /**
     * 遍历执行拦截器
     * @description Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    foEach(fn) {}
}
export default InterceptorManager;
