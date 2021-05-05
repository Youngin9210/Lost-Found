module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  capitalize: (username) => {
    return username[0].toUpperCase() + username.slice(1);
  },
};
