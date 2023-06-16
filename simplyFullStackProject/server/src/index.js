const Koa = require('koa')

const koaApp = new Koa()

const PORT = 8888

koaApp.listen(PORT,() => { 
  console.log(`PORT is listening at ${PORT}`);
 })

koaApp.use((ctx) => { 
  const {path} = ctx
  if (path==='/student') {
    const data = require('./student.json')
    ctx.response.body = data
  }
  // console.log(`ctx path:${path}`)
})

// 在应用程序停止运行后，自动关闭端口
process.on('SIGINT', () => {
  server.close(() => {
    console.log('应用程序已经停止运行，关闭端口！');
  });
});
