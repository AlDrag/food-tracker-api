
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      // Inserts seed entries
      return knex('food').insert([
        {id: 1, barcode: '34323432', name: 'Peanut Butter'},
        {id: 2, barcode: '1231231', name: 'Sugar'},
        {id: 3, barcode: '5653422', name: 'Coffee'},
      ]);
    });
};
