
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('Projects').insert([
        {id: 1, name: 'Take Care of Plants', description: 'Water, Prune, Rotate all Plants', completed: 'false'},
        {id: 2, name: 'Clean the House', description: 'Get the house in check', completed: 'false'},
        {id: 3, name: 'Go to Lowes', description: 'Buy more plants', completed: 'false'},
    
      ]);
    });
};
