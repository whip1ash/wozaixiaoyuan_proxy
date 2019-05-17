const request = require('sync-request');

module.exports = {
    summary: 'wozaixiaoyuan sign proxy',
    *beforeSendRequest(requestDetail) {

      function checkin(logId,Cookie){
        var reqUrl = "https://student.wozaixiaoyuan.com/sign/doSign.json?id="+logId+"&longitude=108.907643&latitude=34.159024&type=0";
        const options = {
          url: reqUrl,
          headers: {
            'Cookie': Cookie
          },
        }
        var res = request('GET',reqUrl,options);
        return res.body.toString();
      }

      if (requestDetail.url == 'https://student.wozaixiaoyuan.com/sign/info.json'){
        console.log(requestDetail.url);

        var data = requestDetail.requestData.toString();
        data = data.split('&');
        var logId = data[1];
        logId = logId.split('=')[1];

        headers = requestDetail._req.headers;
        cookie = headers['Cookie'];
        var res_data = checkin(logId,cookie);
        if(res_data != ''){
          var json_data = JSON.parse(res_data);
          var code = json_data['code'];
          if(code == '0'){
            return {
              response:{
                statusCode: 503,
                header: {'content-type': 'text/html'},
                body: 'Sign success!'
              }
            };
          }else{
            var message = json_data['message'];
            return {
              response:{
                statusCode: 502,
                header: {'content-type': 'text/html'},
                body: message
              }
            };
          }
        }else{
          return {
            response:{
              statusCode: 501,
              header: {'content-type': 'text/html'},
              body: 'Return value is blank, sign failed!'
            }
          };
        }
      }
      return null;
    },
  };