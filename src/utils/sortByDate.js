

export const sortBy = (field) => {
    return function(a, b) {
      return (a[0][field] < b[0][field]) - (a[0][field] > b[0][field])
    };
  }