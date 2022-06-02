exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: knex.raw("uuid_generate_v4()"),
          username: "bjosh",
          email: "bjosh@gmail.com",
          password: "123",
          first_name: "josh",
          last_name: "smith",
        },
      ]);
    });
};
