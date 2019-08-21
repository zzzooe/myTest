module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get("/api/goods", function(req, res) {
          res.json({
            code: 0,
            list: [
              { id: 0, name: "web前端技术课程", price: 1000 },
              { id: 1, name: "全栈工程技术公开课", price: 300 },
              { id: 3, name: "python工程师", price: 30000 }
            ]
          });
        });
        app.get("/api/goods1", function(req, res) {
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
// module.exports = {
//   configureWebpack: {
//     devServer: {
//       before(app) {
//         app.get("/api/goods", function(req, res) {
//           res.json({
//             code: 0,
//             list: [
//               { id: 0, name: "web前端技术课程", price: 1000 },
//               { id: 1, name: "全栈工程技术公开课", price: 300 }
//             ]
//           });
//         });
//       }
//     }
//   }
// };
