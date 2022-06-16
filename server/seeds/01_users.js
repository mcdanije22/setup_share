exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: "de0d9207-f7fe-4b70-a28d-cba8da7a798a",
          username: "real_john",
          email: "f@f",
          password:
            "$2b$10$5xuzW5BAfe4TPHFhZrWzdeymLLQMhzimBQOg8in3UZewi8lzC8LxC",
          first_name: "josh",
          last_name: "smith",
          user_created_date: "2022-06-02 17:48:04.987 -0400",
          subscription_exp_date: "2022-06-02 17:48:04.987 -0400",
        },
      ]);
    });
};
