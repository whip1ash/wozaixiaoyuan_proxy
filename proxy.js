const AnyProxy = require('anyproxy');
const options = {
  port: 8001,
  //加载规则
  rule: require('./myRule'),
  webInterface: {
    enable: false,
    webPort: 8002
  },
  throttle: 10000,
  forceProxyHttps: true, //使用https代理
  wsIntercept: false, 
  silent: false
};
const proxyServer = new AnyProxy.ProxyServer(options);

proxyServer.on('ready', () => { /* */ 
});
// 错误
proxyServer.on('error', (e) => { 
    console.log(e);
});

proxyServer.start()

//Ctrl+C 结束
process.on('SIGINT', function () {
    proxyServer.close();
    process.exit();
});
