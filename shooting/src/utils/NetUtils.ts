/**
 * Created by wuhuiran on 2018/7/25.
 */

class NetUtils {

    static ListenEvent(request:egret.HttpRequest, cb?:Function) {
        request.addEventListener(egret.Event.COMPLETE, (e:egret.Event) => {
            var request = <egret.HttpRequest>e.currentTarget;
            var response = request.response;
            // console.log("=========debug listen complete: %j", response);
            if (cb) {
                cb(JSON.parse(response));
            }

        }, null);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e:egret.IOErrorEvent) => {
            if (cb) {
                cb(e);
            }
        }, null);
    }

    static get(url, cb?:Function):any {

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;

        //设置为 POST 请求
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();

        // console.log("====debug get======: %j", url);
        NetUtils.ListenEvent(request, cb);
    }

    static post(url:string, params?:{[key:string]:any}, cb?:Function):any {

        var postData:string = utils.queryString(params);

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;

        //设置为 POST 请求
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(postData);

        NetUtils.ListenEvent(request, cb);
    }

    static put(url:string, params?:{[key:string]:any}, cb?:Function):any {

        var postData:string = JSON.stringify(params);
        // console.log("======postDAta: %j", postData);

        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;

        //设置为 POST 请求
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(postData);

        NetUtils.ListenEvent(request, cb);
    }
}
