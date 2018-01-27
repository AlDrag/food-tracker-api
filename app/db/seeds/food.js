
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food').del()
    .then(function () {
      // Inserts seed entries
      return knex('food').insert([
        {barcode: '34323432', name: 'Peanut Butter'},
        {barcode: '1231231', name: 'Sugar'},
        {barcode: '5653422', name: 'Coffee'},
      ]);
    });
};
