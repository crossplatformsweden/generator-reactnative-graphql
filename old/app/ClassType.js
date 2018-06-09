
module.exports = {
  getName: function (type) {
    switch (type) {
      case 'p':
        return 'Page'
      case 's':
        return 'Service'
    };
  }
}
