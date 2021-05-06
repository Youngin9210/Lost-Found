module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  capitalize: (string) => {
    return string[0].toUpperCase() + string.slice(1);
  },
};
