module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get("./api/goods", function(req, res) {
          res.json({
            code: 0,
            list: [
              { id: 0, name: "web前端技术课程", price: 1000 },
              { id: 1, name: "全栈工程技术公开课", price: 300 }
            ]
          });
        });
      }
    }
  }
};
