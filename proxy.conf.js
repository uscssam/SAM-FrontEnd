var defaultTarget = 'http://localhost:5124/';
module.exports = [
   {
      context: ['/login'],
      target: defaultTarget,
      changeOrigin: true,
   }
];