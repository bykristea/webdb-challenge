
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('Actions').insert([
        {id: 1, description: 'prune dead leaves', notes: 'fiddleleaf fig had a few dead leaves', completed: 'true', project_id: '1'},
        {id: 2, description: 'water plants with fertilizer', notes: 'use miracle grow', completed: 'false', project_id: '1'},

        {id: 3, description: 'dust all the surfaces', notes: 'living room, bedrooms, office, laundry room, bonus room', completed: 'false', project_id: '2'},
        {id: 4, description: 'sweep', notes: '', completed: 'false', project_id: '2'},

        {id: 5, description: 'buy pink pampas grass', notes: 'pink or purple', completed: 'false', project_id: '3'},
        {id: 6, description: 'buy ant killer', notes: '', completed: 'false', project_id: '3'},
       
      ]);
    });
};
