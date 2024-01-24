
export default function expressCallback(controller) {
  return (req, res) => {
    const { userIp, ip } = req;

    let finalIp = "-";
    if (ip) finalIp = ip;

    const httpRequest = {
      user: req.user,
      token: req.token,
      body: req.body,
      query: req.query,
      params: req.params,
      ip: userIp ?? finalIp,
      ips: req.ips,
      method: req.method,
      path: req.path,
      origin: req.get("origin"),
      requestHeaders: req.headers,
      headers: {
        "Content-Type": req.get("content-type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("user-agent"),
      },
      hostname: req.hostname,
      file: req.file,
      s3FileUrl: req.s3FileUrl,
      s3Filename: req.s3Filename,
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        let hasResponse = false;

        if (httpResponse.statusCode >= 100 && httpResponse.statusCode < 200) {
          // informational
          hasResponse = true;
          res.status(httpResponse.statusCode).json({
            error: false,
            msg: httpResponse.msg ? httpResponse.msg : "Informasi",
            data: httpResponse.data,
          });
        }

        if (!hasResponse) {
          if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 300) {
            hasResponse = true;
            // success
            res.status(httpResponse.statusCode).json({
              error: false,
              msg: httpResponse.msg ? httpResponse.msg : "OK",
              data: httpResponse.data,
            });
          }
        }

        if (!hasResponse) {
          if (httpResponse.statusCode >= 300 && httpResponse.statusCode < 400) {
            hasResponse = true;
            // redirect
            res.status(httpResponse.statusCode).redirect(httpResponse.msg);
          }
        }

        if (!hasResponse) {
          if (httpResponse.statusCode >= 400 && httpResponse.statusCode < 500) {
            hasResponse = true;
            // redirect
            res.status(httpResponse.statusCode).json({
              error: true,
              msg: httpResponse.msg ? httpResponse.msg : "Client Error",
            });
          }
        }

        if (!hasResponse) {
          if (httpResponse.statusCode >= 500 && httpResponse.statusCode < 600) {
            // redirect
            res.status(httpResponse.statusCode).json({
              error: true,
              msg: httpResponse.msg ? httpResponse.msg : "Server Error",
            });
          }
        }
      })
      .catch((e) => {
        res.status(500).json({
          error: true,
          msg: `${e.message}`,
        });
      });
  };
}
