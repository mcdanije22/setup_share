exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("setups")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("setups").insert([
        {
          setup_id: "7a0fa791-4975-4ed0-9516-dc933d4b0ea2",
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          setup_title: "Man Cave",
          setup_description: "My personal setup for a Man cave gaming room!",
          setup_type: "Gaming Setup",
          setup_created_date: "2022-06-07 21:22:47.987 -0400",
          created_screen_type: "Laptop",
          number_of_visits: 491,
        },
      ]);
    });
};
